<?php

use App\Models\FundingPage;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Carbon;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

describe('show', function () {
    it('can show a funding page', function () {
        $fundingPage = FundingPage::factory()->create();

        actingAs($fundingPage->user)
            ->get(route('dashboard.my-funding-pages.show', $fundingPage))
            ->assertOk();
    });

    it('cannot show a funding page owned by another user', function () {
        $fundingPage = FundingPage::factory()->create();

        actingAs(FundingPage::factory()->create()->user)
            ->get(route('dashboard.my-funding-pages.show', $fundingPage))
            ->assertNotFound();
    });

    it('cannot show a funding page when not authenticated', function () {
        $fundingPage = FundingPage::factory()->create();

        get(route('dashboard.my-funding-pages.show', $fundingPage))
            ->assertRedirect(route('login'));
    });
});

describe('edit', function () {
    it('can edit a funding page', function () {
        $fundingPage = FundingPage::factory()->create();

        actingAs($fundingPage->user)
            ->get(route('dashboard.my-funding-pages.edit', $fundingPage))
            ->assertOk();
    });

    it('cannot edit a funding page owned by another user', function () {
        $fundingPage = FundingPage::factory()->create();

        actingAs(FundingPage::factory()->create()->user)
            ->get(route('dashboard.my-funding-pages.edit', $fundingPage))
            ->assertNotFound();
    });

    it('cannot edit a funding page when not authenticated', function () {
        $fundingPage = FundingPage::factory()->create();

        get(route('dashboard.my-funding-pages.edit', $fundingPage))
            ->assertRedirect(route('login'));
    });
});

describe('update', function () {
    it('can update a funding page', function () {
        $fundingPage = FundingPage::factory()->create();

        actingAs($fundingPage->user)
            ->put(route('dashboard.my-funding-pages.update', $fundingPage), [
                'title' => 'Updated Title',
                'description' => 'Updated Description',
                'goal_amount' => 2000,
                'currency' => 'USD',
                'start_date' => now()->toDateString(),
                'end_date' => now()->addMonth()->toDateString(),
                'published' => true,
                'timezone' => 'UTC',
            ])
            ->assertRedirect(route('dashboard.my-funding-pages.index'))
            ->assertSessionHas('success', 'Funding page updated successfully.');

        assertDatabaseHas('funding_pages', [
            'id' => $fundingPage->id,
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'goal_amount' => 2000,
            'currency' => 'USD',
            'published_at' => now(), // Assuming published sets published_at to now
        ]);
    });

    it('cannot update a funding page owned by another user', function () {
        $fundingPage = FundingPage::factory()->create();

        actingAs(FundingPage::factory()->create()->user)
            ->put(route('dashboard.my-funding-pages.update', $fundingPage), [
                'title' => 'Updated Title',
                'description' => 'Updated Description',
                'goal_amount' => 2000,
                'currency' => 'USD',
                'start_date' => now()->toDateString(),
                'end_date' => now()->addMonth()->toDateString(),
                'published' => true,
                'timezone' => 'UTC',
            ])
            ->assertNotFound();
    });

    it('cannot update a funding page when not authenticated', function () {
        $fundingPage = FundingPage::factory()->create();

        put(route('dashboard.my-funding-pages.update', $fundingPage), [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'goal_amount' => 2000,
            'currency' => 'USD',
            'start_date' => now()->toDateString(),
            'end_date' => now()->addMonth()->toDateString(),
            'published' => true,
            'timezone' => 'UTC',
        ])
            ->assertRedirect(route('login'));
    });
});

describe('create', function () {
    it('can access creation form', function () {
        /**
         * @var \App\Models\User|Authenticatable
         */
        $user = User::factory()->create();

        actingAs($user)
            ->get(route('dashboard.my-funding-pages.create'))
            ->assertOk();
    });

    it('cannot access creation form when not authenticated', function () {
        get(route('dashboard.my-funding-pages.create'))
            ->assertRedirect(route('login'));
    });
});

describe('store', function () {
    it('can store a new funding page', function () {
        /**
         * @var \App\Models\User|Authenticatable
         */
        $user = User::factory()->create();

        $now = now();

        Carbon::setTestNow($now);

        actingAs($user)
            ->post(route('dashboard.my-funding-pages.store'), [
                'title' => 'New Funding Page',
                'description' => 'This is a new funding page.',
                'goal_amount' => 1500,
                'currency' => 'USD',
                'start_date' => now()->toDateString(),
                'end_date' => now()->addMonth()->toDateString(),
                'published' => true,
            ])
            ->assertRedirect(route('dashboard.my-funding-pages.index'))
            ->assertSessionHas('success', 'Funding page created successfully.');

        assertDatabaseHas('funding_pages', [
            'user_id' => $user->id,
            'title' => 'New Funding Page',
            'description' => 'This is a new funding page.',
            'goal_amount' => 1500,
            'currency' => 'USD',
            'published_at' => $now, // Assuming published sets published_at to now
        ]);
    });

    it('cannot store a new funding page when not authenticated', function () {
        post(route('dashboard.my-funding-pages.store'), [
            'title' => 'New Funding Page',
            'description' => 'This is a new funding page.',
            'goal_amount' => 1500,
            'currency' => 'USD',
            'start_date' => now()->toDateString(),
            'end_date' => now()->addMonth()->toDateString(),
            'published' => true,
        ])
            ->assertRedirect(route('login'));
    });
});
