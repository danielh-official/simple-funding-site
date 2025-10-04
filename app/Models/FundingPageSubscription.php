<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundingPageSubscription extends Model
{
    /** @use HasFactory<\Database\Factories\FundingPageSubscriptionFactory> */
    use HasFactory;

    protected $fillable = [
        'uuid',
        'funding_page_id',
        'user_id',
        'notification_cadence',
        'last_notified_at',
        'next_notification_at',
    ];

    protected $casts = [
        'last_notified_at' => 'datetime',
        'next_notification_at' => 'datetime',
    ];

    public function fundingPage()
    {
        return $this->belongsTo(FundingPage::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
