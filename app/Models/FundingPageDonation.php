<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $uuid
 * @property int $funding_page_id
 * @property int|null $user_id
 * @property string $amount
 * @property string|null $message
 * @property string|null $donor_name
 * @property string $donor_email
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Database\Factories\FundingPageDonationFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereDonorEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereDonorName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereFundingPageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation whereUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageDonation withoutTrashed()
 *
 * @mixin \Eloquent
 */
class FundingPageDonation extends Model
{
    /** @use HasFactory<\Database\Factories\FundingPageDonationFactory> */
    use HasFactory, SoftDeletes;

    protected static function booted()
    {
        // Add a UUID when creating a new FundingPage
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }
}
