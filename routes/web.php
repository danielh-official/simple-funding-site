<?php

use App\Http\Controllers\FundingPageController;
use App\Models\FundingPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/pricing', function () {
    return Inertia::render('pricing');
})->name('pricing');

Route::redirect('/dashboard', '/dashboard/my-funding-pages');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('my-funding-pages', FundingPageController::class)->except('destroy')->parameters([
            'my-funding-pages' => 'fundingPage:uuid',
        ]);

        Route::prefix('my-funding-pages')->name('my-funding-pages.')->group(function () {
            Route::post('/{fundingPage}/donate', function () {
                // TODO: Logic to handle donation
            })->name('donate');

            Route::post('/{fundingPage}/updates/post', function (FundingPage $fundingPage, Request $request) {
                // TODO: Logic to post a new update
                $request->validate([
                    'title' => 'required|string|max:255',
                    'content' => 'required|string',
                ]);

            })->name('updates.post');
        });

        Route::prefix('my-updates')->name('my-updates.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('dashboard/updates/index');
            })->name('index');

            Route::get('/create', function () {
                return Inertia::render('dashboard/updates/create');
            })->name('create');

            Route::post('/create', function () {
                // TODO: Logic to store the new funding page update
            })->name('store');

            Route::delete('/{fundingPageUpdate}', function () {
                // TODO: Logic to delete the funding page update
            })->name('delete');
        });

        Route::prefix('/my-donations')->name('my-donations.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('dashboard/donations/index');
            })->name('index');
        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
