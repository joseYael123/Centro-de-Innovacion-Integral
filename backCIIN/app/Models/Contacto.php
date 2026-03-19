<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    protected $table = "contactos";

    protected $fillable = [
        "correo_contacto",
        "nombre_contacto",
        "apellidos_contacto",
        "sugerencia",
    ];
}
