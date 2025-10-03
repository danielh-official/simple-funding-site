<?php

use App\Models\FundingPage;
use App\Models\FundingPageUpdate;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\post;

/**
 * @see\App\Http\Controllers\FundingPage\FundingPageUpdateController
 */
describe('store', function () {
    it('can store a new update for a funding page', function () {
        // Create a user and a funding page
        /**
         * @var \App\Models\User|Authenticatable $user
         */
        $user = User::factory()->create();
        $fundingPage = FundingPage::factory()->for($user)->create();

        // Simulate a POST request to the controller
        $response = actingAs($user)->post(route('dashboard.my-funding-pages.my-updates.store'), [
            'title' => 'New Update Title',
            'content' => 'This is the content of the new update.',
            'funding_page_id' => $fundingPage->uuid,
        ]);

        // Assert that the update was created in the database
        assertDatabaseHas('funding_page_updates', [
            'funding_page_id' => $fundingPage->id,
            'title' => 'New Update Title',
            'content' => 'This is the content of the new update.',
        ]);

        // Assert that the user is redirected back to the funding page show route
        $response->assertRedirect(route('dashboard.my-funding-pages.show', $fundingPage));
    });

    it('cannot store an update for a funding page that does not belong to the user', function () {
        // Create two users and a funding page for the first user
        /**
         * @var \App\Models\User|Authenticatable $user1
         */
        $user1 = User::factory()->create();
        /**
         * @var \App\Models\User|Authenticatable $user2
         */
        $user2 = User::factory()->create();
        $fundingPage = FundingPage::factory()->for($user1)->create();

        // Simulate a POST request to the controller as the second user
        $response = actingAs($user2)->post(route('dashboard.my-funding-pages.my-updates.store'), [
            'title' => 'New Update Title',
            'content' => 'This is the content of the new update.',
            'funding_page_id' => $fundingPage->uuid,
        ]);

        // Assert that the update was not created in the database
        assertDatabaseMissing('funding_page_updates', [
            'funding_page_id' => $fundingPage->id,
            'title' => 'New Update Title',
            'content' => 'This is the content of the new update.',
        ]);

        // Assert that the user receives a 403 Forbidden response
        $response->assertStatus(403);
    });

    it('cannot store an update when not authenticated', function () {
        $fundingPage = FundingPage::factory()->create();

        $response = post(route('dashboard.my-funding-pages.my-updates.store'), [
            'title' => 'New Update Title',
            'content' => 'This is the content of the new update.',
            'funding_page_id' => $fundingPage->uuid,
        ]);

        $response->assertRedirect(route('login'));
    });
});

describe('destroy', function () {
    it('can soft delete an existing update for a funding page', function () {
        // Create a user, a funding page, and an update
        /**
         * @var \App\Models\User|Authenticatable $user
         */
        $user = User::factory()->create();
        $fundingPage = FundingPage::factory()->for($user)->create();
        $update = $fundingPage->updates()->create([
            'title' => 'Update to be deleted',
            'content' => 'This update will be deleted in the test.',
        ]);

        // Simulate a DELETE request to the controller
        $response = actingAs($user)->delete(route('dashboard.my-funding-pages.my-updates.destroy', $update));

        // Assert that the update is still in the database
        assertDatabaseHas('funding_page_updates', [
            'id' => $update->id,
            'funding_page_id' => $fundingPage->id,
            'title' => 'Update to be deleted',
            'content' => 'This update will be deleted in the test.',
        ]);

        expect(FundingPageUpdate::find($update->id))->toBeNull();

        // Assert that the user is redirected back
        $response->assertRedirect();
    });

    it('cannot soft delete an update for a funding page that does not belong to the user', function () {
        // Create two users, a funding page for the first user, and an update
        /**
         * @var \App\Models\User|Authenticatable $user1
         */
        $user1 = User::factory()->create();
        /**
         * @var \App\Models\User|Authenticatable $user2
         */
        $user2 = User::factory()->create();
        $fundingPage = FundingPage::factory()->for($user1)->create();
        $update = $fundingPage->updates()->create([
            'title' => 'Update to be deleted',
            'content' => 'This update will be deleted in the test.',
        ]);

        // Simulate a DELETE request to the controller as the second user
        $response = actingAs($user2)->delete(route('dashboard.my-funding-pages.my-updates.destroy', $update));

        // Assert that the update was not deleted from the database
        assertDatabaseHas('funding_page_updates', [
            'id' => $update->id,
        ]);

        // Assert that the user receives a 403 Forbidden response
        $response->assertStatus(403);
    });

    it('cannot soft delete an update when not authenticated', function () {
        $fundingPage = FundingPage::factory()->create();
        $update = $fundingPage->updates()->create([
            'title' => 'Update to be deleted',
            'content' => 'This update will be deleted in the test.',
        ]);

        $response = delete(route('dashboard.my-funding-pages.my-updates.destroy', $update));

        $response->assertRedirect(route('login'));
    });
});
