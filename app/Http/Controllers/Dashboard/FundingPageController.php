<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\FundingPage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class FundingPageController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $fundingPages = FundingPage::where('user_id', $request->user()->id)
            ->where(function (Builder $query) use ($search) {
                if ($search) {
                    $query->where('title', 'like', "%$search%")
                        ->orWhere('description', 'like', "%$search%");
                }
            })
            ->latest()
            ->paginate(
                perPage: $request->input('per_page', 5),
                page: $request->input('page', 1)
            );

        return Inertia::render('dashboard/funding-pages/index', compact('fundingPages', 'search'));
    }

    public function show(Request $request, FundingPage $fundingPage)
    {
        if ($request->user()->cannot('view', $fundingPage)) {
            abort(404, 'Funding page not found.');
        }
        
        $updates = $fundingPage->updates()->latest()->paginate(
            perPage: $request->input('updates_per_page', 5), 
            page: $request->input('updates_page', 1), 
            pageName: 'updates_page'
        );

        $donations = $fundingPage->donations()->latest()->paginate(
            perPage: $request->input('donations_per_page', 5), 
            page: $request->input('donations_page', 1),
            pageName: 'donations_page'
        );

        return Inertia::render('dashboard/funding-pages/show', compact('fundingPage', 'updates', 'donations'));
    }

    public function create()
    {
        return Inertia::render('dashboard/funding-pages/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'goal_amount' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'published' => 'sometimes|boolean',
            'timezone' => 'required|string',
        ]);

        $start_date = Carbon::parse(
            $request->input('start_date'),
            $request->input('timezone')
        )->setTime(0, 0, 0)->setTimezone('UTC');

        $end_date = $request->input('end_date')
            ? Carbon::parse(
                $request->input('end_date'),
                $request->input('timezone')
            )
                ->setTime(0, 0, 0)->setTimezone('UTC')
            : null;

        FundingPage::create([
            'user_id' => $request->user()->id,
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'goal_amount' => $request->input('goal_amount'),
            'currency' => strtoupper($request->input('currency')),
            'published_at' => $request->boolean('published') ? now() : null,
            ...compact('start_date', 'end_date'),
        ]);

        return to_route('dashboard.my-funding-pages.index')
            ->with('success', 'Funding page created successfully.');
    }

    public function edit(Request $request, FundingPage $fundingPage)
    {
        if ($fundingPage->user_id !== $request->user()->id) {
            abort(404, 'Funding page not found.');
        }

        return Inertia::render('dashboard/funding-pages/edit', compact('fundingPage'));
    }

    public function update(Request $request, FundingPage $fundingPage)
    {
        if ($fundingPage->user_id !== $request->user()->id) {
            abort(404, 'Funding page not found.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|min:10',
            'goal_amount' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'published' => 'sometimes|boolean',
            'timezone' => 'required|string',
        ]);

        $start_date = Carbon::parse(
            $request->input('start_date'),
            $request->input('timezone')
        )->setTime(0, 0, 0)->setTimezone('UTC');

        $end_date = $request->input('end_date')
            ? Carbon::parse(
                $request->input('end_date'),
                $request->input('timezone')
            )
                ->setTime(0, 0, 0)->setTimezone('UTC')
            : null;

        $fundingPage->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'goal_amount' => $request->input('goal_amount'),
            'currency' => strtoupper($request->input('currency')),
            'published_at' => $request->boolean('published') ? now() : null,
            ...compact('start_date', 'end_date'),
        ]);

        return to_route('dashboard.my-funding-pages.index')->with('success', 'Funding page updated successfully.');
    }
}
