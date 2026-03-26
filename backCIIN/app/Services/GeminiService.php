<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    public function peticionGemini($cliente){

        $apiKey = config("services.gemini.key");

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        $prompt = "Eres un Consultor Senior de Negocios con 30 años de experiencia y de trayectoria en diagnosticos empresariales,
        automatizacion de procesos y posicionamiento de marca:
        
        CONTEXTO:
        El cliente de nombre '$cliente->nom_cliente' y cuya empresa tiene de nombre '$cliente->nom_empresa',esta solicitando un diagnostico empresarial,
        Estos son los datos generales necesarios para un diagnostico preciso del cliente:

        -Rubro de la empresa: '$cliente->rubro_empresa'
        -Tamaño de su equipo: '$cliente->tamanio_equipo'
        -Tiempo de su empresa en el mercado: '$cliente->tiempo_marca'
        -El area que mas problemas les genera: '$cliente->area_problema'
        -Descripcion breve de la problematica a abordar: '$cliente->problematica'
        -Los resultados que esperan conseguir en 3 meses al trabajar con CIIN: '$cliente->resultados'


        INSTRUCCIONES:
        Basado exclusivamente en la información anterior, genera una respuesta de máximo 4 párrafos que incluya:
        1.DIAGNOSTICO INICIAL: Tienes que identificar la causa raiz del problema basandote principalmente en el area problematica y la descripcion del problema de esa area
        2.AJUSTAR SOLUCIONES: Da una solucion adecuada basandote en la cantidad de empleados que tienen y el tiempo de la marca en el mercado
        ya que dependiendo de el tamanio de la empresa y los empleados que tengan disponibles en ese momento dispondran de mas o menos mano de obra y mas o menos presupuesto.
        3.GENERAR RECOMENDACIONES Y ESTRATEGIAS: Da una estrategia recomendada a seguir basandote en el rubro de la empresa, ya que abra empresas las cuales
        les viene mejor un ajuste en la logistica empresarial o en la dinamica de los empleados o alguna solucion tecnologica, sea sencilla o una automatizacion compleja,
        ajustate a lo que pide el cliente para asegurar los mejores resultado en 3 meses como maximo

        RESTRICCIONES:
        - Usa un lenguaje ejecutivo, sobrio y profesional.
        - No uses formato Markdown (sin asteriscos ni negritas), usa saltos de línea claros.
        - Si la información es insuficiente, solicita los puntos clave que faltan con cortesía empresarial.";

        $payload = [
            "contents" =>[
                [
                    "parts" =>[
                        ["text" => $prompt]
                    ]
                ]
            ]
        ];

        $respuesta = Http::withHeaders([
            'Content-type' => 'application/json',
        ])-> post($url, $payload);

        if($respuesta-> successful()){
           $texto = $respuesta->json("candidates.0.content.parts.0.text");
                
            if (!empty($texto) && is_string($texto)) {
                return $texto;
            }

        }

        return $respuesta->json();    
    }
}
