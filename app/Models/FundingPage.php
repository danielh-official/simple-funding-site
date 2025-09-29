<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class FundingPage extends Model
{
    /** @use HasFactory<\Database\Factories\FundingPageFactory> */
    use HasFactory, SoftDeletes;

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
    ];

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
}
