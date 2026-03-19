<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    public function peticionGemini($empresa,$peticion){

        $apiKey = config("services.gemini.key");

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        $prompt = "Eres un Consultor Senior de Negocios con 30 años de experiencia y de trayectoria en diagnosticos empresariales,
        automatizacion de procesos y posicionamiento de marca:
        
        CONTEXTO:
        La empresa de nombre '{$empresa}' solicita un diagnostico en base a la siguiente situacion: '{$peticion}'
        
        INSTRUCCIONES:
        Basado exclusivamente en la información anterior, genera una respuesta de máximo 4 párrafos que incluya:
        1. DIAGNÓSTICO INICIAL: Identifica la causa raíz del problema.
        2. ESTRATEGIA RECOMENDADA: Pasos lógicos para solucionar la situación.
        3. AUTOMATIZACIÓN: Sugiere una herramienta o proceso digital (software) que resolvería el problema de raíz.

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
            return $respuesta-> json("candidates.0.content.parts.0.text");
        }

        return $respuesta->json();    
    }
}
