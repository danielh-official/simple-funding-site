<?php

namespace App\Http\Controllers;

use App\Models\FundingPage;
use Illuminate\Contracts\Auth\Factory;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class FundingPageController extends Controller
{
    protected Factory|Guard|null $auth;

    public function __construct()
    {
        if (auth() === null) {
            abort(500, 'Must be authenticated to access.');
        }

        $this->auth = auth();
    }

    public function index()
    {
        $fundingPages = FundingPage::where('user_id', $this->auth->id())->with('updates')->paginate();

        return Inertia::render('dashboard/funding-pages/index', compact('fundingPages'));
    }

    public function show(FundingPage $fundingPage)
    {
        if ($fundingPage->user_id !== $this->auth->id()) {
            abort(404, 'Funding page not found.');
        }

        $fundingPage->load('donations', 'updates');

        return Inertia::render('dashboard/funding-pages/show', compact('fundingPage'));
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
        ]);

        FundingPage::create([
            'user_id' => $this->auth->id(),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'goal_amount' => $request->input('goal_amount'),
            'currency' => strtoupper($request->input('currency')),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'published_at' => $request->boolean('published') ? now() : null,
        ]);

        return to_route('dashboard.my-funding-pages.index')
            ->with('success', 'Funding page created successfully.');
    }

    public function edit(FundingPage $fundingPage)
    {
        if ($fundingPage->user_id !== $this->auth->id()) {
            abort(404, 'Funding page not found.');
        }

        return Inertia::render('dashboard/funding-pages/edit', compact('fundingPage'));
    }

    public function update(FundingPage $fundingPage, Request $request)
    {
        if ($fundingPage->user_id !== $this->auth->id()) {
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

        // TODO: Make sure that start date and end date are saved correctly with timezone consideration
        // Right now, if I save the start date with 2025-10-01, it saves as 2025-10-01 00:00:00 in the database, which is incorrect, because it should consider the timezone offset.
        // For example, if I'm in New York (UTC-4), and I set the start date to 2025-10-01, it should save as 2025-10-01 04:00:00 in the database.

        $start_date = Carbon::parse($request->input('start_date'), $request->input('timezone'));

        $end_date = $request->input('end_date')
            ? Carbon::parse($request->input('end_date'), $request->input('timezone'))
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
