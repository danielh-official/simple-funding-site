<?php

namespace App\Policies;

use App\Models\FundingPage;
use App\Models\FundingPageUpdate;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class FundingPageUpdatePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return FundingPageUpdate::whereHas('fundingPage', function (Builder $query) use ($user) {
            $query->where('user_id', $user->id);
        })->exists();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, FundingPageUpdate $fundingPageUpdate): bool
    {
        return $user->id == $fundingPageUpdate->fundingPage->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, FundingPage $fundingPage): bool
    {
        return $user->id == $fundingPage->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, FundingPageUpdate $fundingPageUpdate): bool
    {
        return $user->id == $fundingPageUpdate->fundingPage->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, FundingPageUpdate $fundingPageUpdate): bool
    {
        return $user->id == $fundingPageUpdate->fundingPage->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, FundingPageUpdate $fundingPageUpdate): bool
    {
        return $user->id == $fundingPageUpdate->fundingPage->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, FundingPageUpdate $fundingPageUpdate): bool
    {
        return $user->id == $fundingPageUpdate->fundingPage->user_id;
    }
}
