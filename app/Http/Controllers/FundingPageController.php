<?php

namespace App\Http\Controllers;

use App\Models\FundingPage;
use Illuminate\Contracts\Auth\Factory;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
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

        return redirect()->route('dashboard.my-funding-pages.index')
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
            'description' => 'nullable|string',
            'goal_amount' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'published' => 'sometimes|boolean',
        ]);

        $fundingPage->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'goal_amount' => $request->input('goal_amount'),
            'currency' => strtoupper($request->input('currency')),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'published_at' => $request->boolean('published') ? now() : null,
        ]);

        return redirect()->route('dashboard.my-funding-pages.index')->with('success', 'Funding page updated successfully.');
    }
}
