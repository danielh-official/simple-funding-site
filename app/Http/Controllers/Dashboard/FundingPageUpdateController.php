<?php

namespace App\Http\Controllers\Dashboard;

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
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:5000',
            'funding_page_id' => 'required|exists:funding_pages,id',
        ]);

        $fundingPage = FundingPage::whereUuid($request->input('funding_page_id'))->firstOrFail();

        $fundingPage->updates()->create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        return to_route('dashboard.my-updates.index', $fundingPage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FundingPageUpdate $fundingPageUpdate)
    {
        $fundingPageUpdate->delete();

        return back();
    }
}
