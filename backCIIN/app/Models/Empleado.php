<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleados extends Model
{
    protected $table = "empleados";

    protected $fillable = [
        "nom_empleado",
        "app_empleado",
        "apm_empleado",
        "correo_empleado",
        "contra_emplead"  
    ];
}
