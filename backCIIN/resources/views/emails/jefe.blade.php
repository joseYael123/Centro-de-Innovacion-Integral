<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Segoe UI', Arial, sans-serif; }
        
        .contenedor { 
            max-width: 600px; 
            margin: 30px auto; 
            background-color: #ffffff; 
            border-radius: 10px; 
            overflow: hidden; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
        }
        
        .header { 
            background: linear-gradient(135deg, #0d8476, #72c8c1); 
            background-color: #0d8476; 
            padding: 25px 20px; 
        }
        
        .imgLogo {
            width: 80px; 
            height: auto;
            border-radius: 12px;
            display: block; 
        }

        .titulo { 
            color: #ffffff; 
            margin: 0; 
            font-size: 24px; 
            font-weight: 700;
            letter-spacing: 0.5px;
            text-align: left; 
            padding-left: 20px; 
        }

        .cuerpo { 
            padding: 30px 40px; 
            color: #444444; 
            line-height: 1.7; 
            text-align: left; 
        }

        .cuerpo h2 {
            font-size: 20px;
            color: #222222;
            margin-top: 0;
            margin-bottom: 20px;
        }

        .tarjeta-contacto {
            background-color: #f8f9fa;
            border-left: 5px solid #0d8476;
            padding: 15px;
            border-radius: 0 5px 5px 0;
            margin-bottom: 25px;
        }

        .tarjeta-contacto p {
            margin: 8px 0; /* Un poco más de margen para que respiren los datos */
            font-size: 15px;
        }

        .peticion-caja {
            background-color: #f0f9f8;
            border: 1px solid #e0f0ef;
            padding: 15px;
            border-radius: 8px;
            font-size: 15px;
            margin-bottom: 15px;
        }

        .peticion-titulo {
            font-weight: bold;
            color: #0d8476;
            margin-top: 0;
            margin-bottom: 5px;
        }

        .peticion-texto {
            font-style: italic;
            color: #555555;
            margin: 0;
        }

        .contacto { 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #eeeeee; 
            font-size: 15px; 
        }

        .footer { 
            background-color: #f4f7f6; 
            padding: 20px; 
            text-align: center; 
            color: #888888; 
            font-size: 12px; 
        }
    </style>
</head>
<body>

    <table width="100%" bgcolor="#f4f7f6" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td>
                <div class="contenedor">
                    
                    <div class="header">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td width="80" valign="middle">
                                    <img src="{{ $message->embed(public_path('LogoCIIN2.jpeg')) }}" alt="Logo CIIN" class="imgLogo"/>
                                </td>
                                <td valign="middle">
                                    <h1 class="titulo">Alerta de Ventas CIIN</h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="cuerpo">
                        <h2>¡Hola Cosme García! Tienes un nuevo prospecto.</h2>
                        <p>El sistema ha captado a un nuevo lead completamente perfilado. A continuación, su radiografía empresarial:</p>
                        
                        <div class="tarjeta-contacto">
                            <p><strong>Contacto:</strong> {{ $cliente->nom_cliente }} {{ $cliente->apellidos_cliente }}</p>
                            <p><strong>Correo:</strong> <a href="mailto:{{ $cliente->correo_cliente }}" style="color: #0d8476; font-weight: bold;">{{ $cliente->correo_cliente }}</a></p>
                            <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 10px 0;">
                            <p><strong>Empresa:</strong> {{ $cliente->nom_empresa }}</p>
                            <p><strong>Rubro:</strong> {{ $cliente->rubro_empresa }}</p>
                            <p><strong>Tamaño del equipo:</strong> {{ $cliente->tamanio_equipo }}</p>
                            <p><strong>Tiempo operando:</strong> {{ $cliente->tiempo_operacion }}</p>
                            <p><strong>Área crítica:</strong> {{ $cliente->area_problema }}</p>
                        </div>

                        <h3>Contexto Estratégico:</h3>
                        
                        <div class="peticion-caja">
                            <p class="peticion-titulo">Situación actual (Obstáculo principal):</p>
                            <p class="peticion-texto">"{{ $cliente->problematica }}"</p>
                        </div>

                        <div class="peticion-caja">
                            <p class="peticion-titulo">Objetivo a lograr (Expectativa):</p>
                            <p class="peticion-texto">"{{ $cliente->resultados }}"</p>
                        </div>

                        <div class="contacto">
                            <p><strong>Siguiente paso:</strong> El prospecto ya recibió el diagnóstico inicial generado por la Inteligencia Artificial. Con este perfil detallado, tienes todo el contexto para contactarlo y proponerle una estrategia comercial a la medida.</p>
                        </div>
                    </div>

                    <div class="footer">
                        <p>Este es un reporte automático de captación de leads.</p>
                        <p>&copy; 2026 CENTRO DE INNOVACIÓN DIGITAL®. Todos los derechos reservados.</p>
                    </div>

                </div>
            </td>
        </tr>
    </table>

</body>
</html>