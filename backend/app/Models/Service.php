<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'icon', 'features'];

    /**
     * Cast JSON features to array
     */
    protected $casts = [
        'features' => 'array',
    ];
}
