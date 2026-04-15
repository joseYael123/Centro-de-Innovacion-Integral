<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\MensajeSugerencia;
use Illuminate\Support\Facades\Mail;
class ContactoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $traer_contactos = Contacto::all();
        if($traer_contactos->isEmpty()) return response() -> json(["msg" => "No hay registros en la bd"]);
        return response() -> json($traer_contactos, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        "correo_contacto" => "required|string|max:100",
        "nombre_contacto" => "required|string|max:200",
        "apellidos_contacto" => "required|string|max:100" ,
        "sugerencia" => "required|string|max:1228",
        ]);

        $contacto_creado = Contacto::firstOrCreate(
            ["correo_contacto" => $request->correo_contacto],
            $validated
        );

        Mail::to("cosmegarcia@centrodeinnovacionintegral.com")
        ->send(new MensajeSugerencia($request->nombre_contacto, $request->sugerencia));
        
        return response() -> json([
            "msg" => "Sugerencia recibida correctamente",
            "Data" => $contacto_creado 
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {  
        $encontrar_sugerencia = Contacto::find($id);
        if(!$encontrar_sugerencia) return response() -> json(["msg" => "No hay una sugerencia con ese id"]);
        return response() -> json($encontrar_sugerencia, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contacto $contacto)
    {
        $validated = $request->validate([
        "correo_contacto" => "required|string|max:100",
        "nombre_contacto" => "required|string|max:200",
        "apellidos_contacto" => "required|string|max:100" ,
        "sugerencia" => "required|string|max:1228",
        ]);

        $contacto->update($validated);

        return response() -> json([
            "msg" => "Sugerencia Actualizada correctamente",
            "Data Actualizada" => $contacto
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    }
}
