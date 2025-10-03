<?php

namespace App\Policies;

use App\Models\FundingPage;
use App\Models\User;

class FundingPagePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return FundingPage::where('user_id', $user->id)->exists();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, FundingPage $fundingPage): bool
    {
        return FundingPage::where('user_id', $user->id)->where('id', $fundingPage->id)->exists();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, FundingPage $fundingPage): bool
    {
        return $fundingPage->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, FundingPage $fundingPage): bool
    {
        return $fundingPage->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, FundingPage $fundingPage): bool
    {
        return $fundingPage->user_id === $user->id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, FundingPage $fundingPage): bool
    {
        return $fundingPage->user_id === $user->id;
    }
}
