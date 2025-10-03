<?php

use App\Http\Controllers\Dashboard\FundingPage\FundingPageUpdateController as FundingPageShowFundingPageUpdateController;
use App\Http\Controllers\Dashboard\FundingPageController;
use App\Http\Controllers\Dashboard\FundingPageDonationController;
use App\Http\Controllers\Dashboard\FundingPageUpdateController;
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

        Route::prefix('/my-funding-pages')->name('my-funding-pages.')->group(function () {
            Route::resource('my-updates', FundingPageShowFundingPageUpdateController::class)->parameters([
                'my-updates' => 'fundingPageUpdate:uuid',
            ])->only(['store', 'destroy']);
        });

        Route::resource('my-updates', FundingPageUpdateController::class)
            ->parameters([
                'my-updates' => 'fundingPageUpdate',
            ])->only(['index', 'destroy']);

        Route::resource('my-donations', controller: FundingPageDonationController::class)
            ->parameters([
                'my-donations' => 'donation',
            ])
            ->only(['index']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
