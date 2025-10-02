<?php

namespace Database\Seeders;

use App\Models\FundingPage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FundingPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            $user = User::firstWhere('email', 'test@example.com');

            if (! $user) {
                $user = User::factory()->create([
                    'email' => 'test@example.com',
                    'password' => bcrypt('password'),
                    'email_verified_at' => now(),
                ]);
            }

            FundingPage::factory()
                ->count(5)
                ->hasDonations(10) // Create 10 donations for each funding page
                ->hasUpdates(5) // Create 5 updates for each funding page
                ->for($user)
                ->create();
        });
    }
}
