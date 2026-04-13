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
            margin: 8px 0; 
            font-size: 15px;
        }

        .peticion-caja {
            background-color: #f0f9f8;
            border: 1px solid #e0f0ef;
            padding: 20px;
            border-radius: 8px;
            font-size: 15px;
            margin-bottom: 15px;
        }

        .peticion-texto {
            font-style: italic;
            color: #444444;
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
                                    <h1 class="titulo">Buzón de Sugerencias CIIN</h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="cuerpo">
                        <h2>¡Hola Cosme García!</h2>
                        <p>El sistema ha recibido un nuevo mensaje a través del formulario de contacto general.</p>
                        
                        <div class="tarjeta-contacto">
                            <p><strong>Nombre del remitente:</strong> {{ $nombre_cliente }}</p>
                        </div>

                        <h3>Detalle del Mensaje:</h3>
                        
                        <div class="peticion-caja">
                            <p class="peticion-texto">"{{ $sugerencia }}"</p>
                        </div>

                        <div class="contacto">
                            <p><strong>Siguiente paso:</strong> Revisa este comentario para tomar las acciones pertinentes dentro de la organización.</p>
                        </div>
                    </div>

                    <div class="footer">
                        <p>Este es un reporte automático del formulario de sugerencias.</p>
                        <p>&copy; 2026 CENTRO DE INNOVACIÓN INTEGRAL®. Todos los derechos reservados.</p>
                    </div>

                </div>
            </td>
        </tr>
    </table>

</body>
</html>