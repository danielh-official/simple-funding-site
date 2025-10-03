<?php

namespace App\Http\Controllers\Dashboard\FundingPage;

use App\Http\Controllers\Controller;
use App\Models\FundingPage;
use App\Models\FundingPageUpdate;
use Illuminate\Http\Request;

class FundingPageUpdateController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fundingPage = FundingPage::whereUuid($request->input('funding_page_id'))->firstOrFail();

        if ($request->user()->cannot('create', [FundingPageUpdate::class, $fundingPage])) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:5000',
            'funding_page_id' => 'required|exists:funding_pages,uuid',
        ]);

        $fundingPage->updates()->create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        return to_route('dashboard.my-funding-pages.show', $fundingPage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, FundingPageUpdate $fundingPageUpdate)
    {
        if ($request->user()->cannot('delete', $fundingPageUpdate)) {
            abort(403, 'Unauthorized action.');
        }

        $fundingPageUpdate->delete();

        return back();
    }
}
