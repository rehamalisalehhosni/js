<?php

namespace Custom\Pages\Models;

use Illuminate\Database\Eloquent\Model;

class TranslationsData extends Model
{
    protected $table = 'translations_data';


    public $translatedAttributes = [];

    protected $fillable = [ 'locale', 'text', 'locale_id','package'];

}
