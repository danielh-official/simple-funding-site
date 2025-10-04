<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserDonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $donations = $request->user()
            ->donations()
            ->with('fundingPage')
            ->latest()
            ->paginate(
                perPage: $request->input('per_page', 5),
                page: $request->input('page', 1)
            );

        return Inertia::render('dashboard/donations/index', compact('donations'));
    }
}
