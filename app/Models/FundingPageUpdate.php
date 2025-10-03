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
 * @property string $title
 * @property string $content
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Database\Factories\FundingPageUpdateFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate whereFundingPageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate whereUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FundingPageUpdate withoutTrashed()
 *
 * @mixin \Eloquent
 */
class FundingPageUpdate extends Model
{
    /** @use HasFactory<\Database\Factories\FundingPageUpdateFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'funding_page_id',
        'title',
        'content',
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

    // Relationship to funding page
    public function fundingPage()
    {
        return $this->belongsTo(FundingPage::class);
    }
}
