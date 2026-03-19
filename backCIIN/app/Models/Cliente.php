<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = "clientes";

    protected $fillable = [
        "nom_cliente",
        "apellidos_cliente",
        "correo_cliente",
        "nom_empresa",
        "peticion_cliente"
    ];
    
}
