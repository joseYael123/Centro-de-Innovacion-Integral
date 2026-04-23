<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GeminiService;
use App\Mail\CorreoDiagnostico;
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoJefe;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lista_clientes = Cliente::all();
        if($lista_clientes->isEmpty()) return response() -> json(["msg" => "No hay registros en la BD"],404);
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
        "correo_cliente" => "required|email:rfc,dns|max:255",
        "nom_empresa"  => "required|string|max:100",  
        "rubro_empresa" => "required|string|max: 150",
        "tamanio_equipo" => "required|string|max: 150",
        "tiempo_marca" => "required|string|max: 100",
        "area_problema" => "required|string|max: 150",
        "problematica" => "required|string|max:2000",
        "resultados" => "required|string|max:2000",
        "turnstile_token" => "required|string"
        ]);

        $cloudFlareResponse = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => env('SECRET_KEY'),
            'response' => $request->turnstile_token,
            'remoteip' => $request->ip()
        ]);

        if(!$cloudFlareResponse->json("success")){
            return response() ->json([
                'error' => 'No pudimos verificar tu conexión. Intenta de nuevo.',
                'detalles' => $cloudFlareResponse->json()
            ],403);
        }

    try{
        $cliente_creado = Cliente::firstOrCreate(
            ["correo_cliente" => $request->correo_cliente,
             "nom_empresa" => $request->nom_empresa],
            $validated 
        );

        $diagnosticoIa = null;
        $exito = false;
        $intentos = 0;
        $max_intentos = 5;

        while($intentos <= $max_intentos && !$exito){
        $diagnosticoIa = $gemini->peticionGemini($cliente_creado);
            if(is_array($diagnosticoIa)){
                $intentos++;
                sleep(2);        
            } else {
                $exito = true;
            }
        }

        if(!$exito){
            return response()->json([
                "Msg" => "Error al general el diagnostico de la ia",
                "Error" => $diagnosticoIa
            ],503);
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
        }catch(\Exception $e){

            Log::error('Error generando diagnóstico: ' . $e->getMessage());

            return response()->json(
                ["msg" => "Hubo un problema al general el diagnostico",
                "error_real" => $e->getMessage(),
                "linea_del_error" => $e->getLine()],
                 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $cliente_encontrado = Cliente::find($id);
        if(!$cliente_encontrado) return response() -> json(["msg" => "User no encontrado"], 404);
        return response() -> json($cliente_encontrado, 200);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Cliente $cliente)
    {
        try {
            $validacion_basica = $request->validate([
                "nom_cliente"       => "sometimes|required|string|max:100",
                "apellidos_cliente" => "sometimes|required|string|max:100",
                "correo_cliente"    => "sometimes|required|email:rfc,dns|max:255",
                "nom_empresa"       => "sometimes|required|string|max:100",  
                "rubro_empresa"     => "sometimes|required|string|max:150",
                "tamanio_equipo"    => "sometimes|required|string|max:150",
                "tiempo_marca"      => "sometimes|required|string|max:100",
                "area_problema"     => "sometimes|required|string|max:150",
                "problematica"      => "sometimes|required|string|max:2000",
                "resultados"        => "sometimes|required|string|max:2000"
            ]);

            $cliente->update($validacion_basica);

            return response()->json([
                "msg" => "Cliente actualizado correctamente",
                "Data" => $cliente
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "msg" => "Error en los datos enviados",
                "errores" => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            Log::error('Error actualizando cliente (ID: ' . $cliente->id . '): ' . $e->getMessage());

            return response()->json([
                "msg" => "Hubo un problema al actualizar el cliente",
                "error_real" => $e->getMessage(), 
                "linea_del_error" => $e->getLine()
            ], 500);
        }
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    }
}
