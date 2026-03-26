<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GeminiService;
use App\Mail\CorreoDiagnostico;
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoJefe;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lista_clientes = Cliente::all();
        if($lista_clientes == []) return response() -> json(["msg" => "No hay registros en la BD"]);
        return response() -> json($lista_clientes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, GeminiService $gemini)
    {
        $validated = $request->validate([
        "nom_cliente" => "required|string|max:100",
        "apellidos_cliente" => "required|string|max:100",
        "correo_cliente" => "required|string|max:200" ,
        "nom_empresa"  => "required|string|max:100",  
        "rubro_empresa" => "required|string|max: 150",
        "tamanio_equipo" => "required|string|max: 150",
        "tiempo_marca" => "required|string|max: 100",
        "area_problema" => "required|string|max: 150",
        "problematica" => "required|string|max:2000",
        "resultados" => "required|string|max:2000"
        ]);

        $cliente_creado = Cliente::firstOrCreate(
            ["correo_cliente" => $request->correo_cliente],
            $validated 
        );

        $diagnosticoIa = $gemini->peticionGemini(
            $cliente_creado
        );

        if(is_array($diagnosticoIa)){
            return response() ->json([
                "msg" => "Error en la peticion a la ia",
                "Error" => $diagnosticoIa
            ], 400);
        }

        Mail::to($request->correo_cliente)
        ->send(new CorreoDiagnostico($cliente_creado, $diagnosticoIa));

        Mail::to("cosmegarcia@centrodeinnovacionintegral.com")
        ->send(new CorreoJefe($cliente_creado));

        return response() -> json([
            "msg" => "Peticion del cliente recibida con exito",
            "Data" => $cliente_creado,
            "Mensaje de gemini" => $diagnosticoIa
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        $cliente_encontrado = Cliente::find($cliente);
        if(!$cliente_encontrado) return response() -> json(["msg" => "User no encontrado"], 404);
        return response() -> json($cliente_encontrado, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        $validacion_basica = $request -> validate([
        "nom_cliente" => "string|max:100",
        "apellidos_cliente" => "string|max:100",
        "correo_cliente" => "string|max:200" ,
        "nom_empresa"  => "string|max:100",  
        "peticion_cliente" => "string|max:4500"
        ]);

        $cliente->update($validacion_basica);

        return response() -> json([
            "msg" => "Cliente actualizado correctamente",
            "Data" => $cliente
        ]);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        $cliente_a_destruir = Cliente::find($cliente);
        if(!$cliente_a_destruir)return response() -> json(["msg" => "cliente no encontrado para borrar"], 404);
        return Cliente::destroy($cliente);
    }
}
