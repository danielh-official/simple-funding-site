<?php

namespace Tests\Unit\Models;

use App\Models\FundingPage;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function PHPUnit\Framework\assertTrue;

it('can create a FundingPage using factory', function () {
    FundingPage::factory()->create();

    assertDatabaseCount('funding_pages', 1);
});

it('can create FundingPage', function () {
    // Create a user with factory
    $user = \App\Models\User::factory()->create();

    // Create a FundingPage
    $fundingPage = FundingPage::create([
        'title' => 'Support My Work',
        'description' => 'Help me continue creating content by supporting me.',
        'goal_amount' => 1000,
        'currency' => 'USD',
        'start_date' => now(),
        'end_date' => now()->addMonth(),
        'user_id' => $user->id,
    ]);

    // Assert the FundingPage exists in the database with the correct data
    assertDatabaseHas('funding_pages', [
        'id' => $fundingPage->id,
        'title' => 'Support My Work',
        'description' => 'Help me continue creating content by supporting me.',
        'goal_amount' => 1000,
        'currency' => 'USD',
        'user_id' => $user->id,
    ]);

    // Assert the relationship
    assertTrue($fundingPage->user->is($user));
});

it('can update Funding Page', function () {
    $fundingPage = FundingPage::factory()->create([
        'title' => 'Support My Work',
        'goal_amount' => 100,
    ]);

    assertDatabaseHas('funding_pages', [
        'id' => $fundingPage->id,
        'title' => 'Support My Work',
        'goal_amount' => 100,
    ]);

    $fundingPage->update([
        'title' => 'Help Me Out',
        'goal_amount' => 200,
    ]);

    assertDatabaseHas('funding_pages', [
        'id' => $fundingPage->id,
        'title' => 'Help Me Out',
        'goal_amount' => 200,
    ]);
});
