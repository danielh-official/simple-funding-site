<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $uuid
 * @property int $user_id
 * @property string $title
 * @property string|null $description
 * @property numeric $goal_amount
 * @property numeric $current_amount This amount must be updated as donation events occur
 * @property \Illuminate\Support\Carbon|null $start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property string $currency
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\FundingPageDonation> $donations
 * @property-read int|null $donations_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\FundingPageUpdate> $updates
 * @property-read int|null $updates_count
 * @property-read \App\Models\User $user
 *
 * @method static \Database\Factories\FundingPageFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereCurrentAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereGoalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage whereUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPage withoutTrashed()
 *
 * @mixin \Eloquent
 */
class FundingPage extends Model
{
    /** @use HasFactory<\Database\Factories\FundingPageFactory> */
    use HasFactory, SoftDeletes;

    // Hide the id attribute when serializing the model
    protected $hidden = ['id'];

    // Set the attributes that can be mass assigned
    protected $fillable = [
        'title',
        'description',
        'goal_amount',
        'current_amount',
        'start_date',
        'end_date',
        'currency',
        'user_id',
        'published_at',
    ];

    // Set the attributes that should be cast to native types
    protected $casts = [
        'published_at' => 'datetime',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'goal_amount' => 'decimal:2',
        'current_amount' => 'decimal:2',
    ];

    public function getRouteKeyName()
    {
        return 'uuid'; // Specify 'uuid' as the route key
    }

    protected static function booted()
    {
        // Add a UUID when creating a new FundingPage
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    // Add a relationship from FundingPage to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Add a relationship from FundingPage to Update
    public function updates(): HasMany
    {
        return $this->hasMany(FundingPageUpdate::class);
    }

    // Add a relationship from FundingPage to Donation
    public function donations(): HasMany
    {
        return $this->hasMany(FundingPageDonation::class);
    }
}
