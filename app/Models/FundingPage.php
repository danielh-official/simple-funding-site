<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

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
