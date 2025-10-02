<?php

namespace Database\Factories;

use App\Models\FundingPage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FundingPageDonation>
 */
class FundingPageDonationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid,
            'funding_page_id' => FundingPage::factory(),
            'amount' => $this->faker->numberBetween(10, 500),
            'donor_name' => $this->faker->name,
            'donor_email' => $this->faker->safeEmail,
            'message' => $this->faker->optional()->sentence,
        ];
    }
}
