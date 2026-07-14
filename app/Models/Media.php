<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';

    protected $fillable = [
        'filename',
        'original_name',
        'mime_type',
        'size',
        'path',
        'storage',
        'width',
        'height',
        'thumbnail_path',
        'alt_text',
        'category',
    ];
}
