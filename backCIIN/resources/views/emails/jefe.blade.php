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
        }

        .tarjeta-contacto {
            background-color: #f8f9fa;
            border-left: 5px solid #0d8476;
            padding: 15px;
            border-radius: 0 5px 5px 0;
            margin-bottom: 25px;
        }

        .tarjeta-contacto p {
            margin: 5px 0;
            font-size: 15px;
        }

        .peticion {
            font-style: italic;
            color: #555555;
            background-color: #f0f9f8;
            padding: 15px;
            border-radius: 8px;
            font-size: 15px;
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
                        <p>El sistema ha captado a un nuevo cliente que acaba de solicitar un diagnóstico empresarial. A continuación, sus datos de contacto:</p>
                        
                        <div class="tarjeta-contacto">
                            <p><strong>Nombre:</strong> {{ $cliente->nom_cliente }} {{ $cliente->apellidos_cliente }}</p>
                            <p><strong>Empresa:</strong> {{ $cliente->nom_empresa }}</p>
                            <p><strong>Correo:</strong> <a href="mailto:{{ $cliente->correo_cliente }}" style="color: #0d8476; font-weight: bold;">{{ $cliente->correo_cliente }}</a></p>
                        </div>

                        <h3>Situación actual de la empresa:</h3>
                        <div class="peticion">
                            "{{ $cliente->peticion_cliente }}"
                        </div>

                        <div class="contacto">
                            <p><strong>Siguiente paso:</strong> El cliente ya recibió su análisis generado por IA. Es el momento ideal para contactarlo y ofrecerle una solución a medida para su empresa.</p>
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