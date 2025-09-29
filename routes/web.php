<?php

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('dashboard/funding-page')->name('dashboard.')->group(function () {
        Route::get('/create', function () {
            return Inertia::render('dashboard/create');
        })->name('create');

        Route::get('/{fundingPage}/edit', function () {
            return Inertia::render('dashboard/edit');
        })->name('edit');

        Route::post('/{fundingPage}/donate', function () {
            // Logic to handle donation
        })->name('donate');

        Route::post('/{fundingPage}/updates/post', function () {
            // Logic to post a new update
        })->name('updates.post');

        Route::get('/{fundingPage}', function () {
            return Inertia::render('dashboard/show');
        })->name('show');
    });

    Route::name('my-updates.')->get('/my-updates', function () {
        Route::get('/', function () {
            return Inertia::render('updates/index');
        })->name('index');

        Route::get('/create', function () {
            return Inertia::render('updates/create');
        })->name('create');

        Route::post('/create', function () {
            // Logic to store the new funding page update
        })->name('store');

        Route::delete('/{fundingPageUpdate}', function () {
            // Logic to delete the funding page update
        })->name('delete');
    });

    Route::name('my-donations.')->get('/my-donations', function () {
        Route::get('/', function () {
            return Inertia::render('donations/index');
        })->name('index');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
