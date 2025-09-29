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

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/create', function () {
            return Inertia::render('dashboard/create');
        })->name('create');

        Route::get('/edit/{fundingPage}', function () {
            return Inertia::render('dashboard/edit');
        })->name('edit');

        Route::get('/detail/{fundingPage}', function () {
            return Inertia::render('dashboard/detail');
        })->name('detail');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
