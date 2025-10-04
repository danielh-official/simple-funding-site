<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\FundingPageUpdate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FundingPageUpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->cannot('viewAny', FundingPageUpdate::class)) {
            abort(404, 'Funding page updates not found.');
        }

        $fundingPageUpdates = $request->user()
            ->fundingPageUpdates()
            ->with('fundingPage')
            ->latest()
            ->paginate(
                perPage: $request->input('per_page', 5),
                page: $request->input('page', 1)
            );

        return Inertia::render('dashboard/updates/index', compact('fundingPageUpdates'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FundingPageUpdate $fundingPageUpdate)
    {
        if (request()->user()->cannot('delete', $fundingPageUpdate)) {
            abort(404, 'Funding page update not found.');
        }

        $fundingPageUpdate->delete();

        return back();
    }
}
