<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = "blogs";

    protected $fillable = [
        "titulo_blog",
        "fecha_publicacion",
        "subtitulo",
        "cont_blog",
        "img_blog_ruta",
        "esDestacado"
    ];
}
