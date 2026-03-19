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
            background-color: #0d8476; /* Fallback para Outlook */
            padding: 25px 20px; 
        }
        
        .imgLogo {
            width: 80px; /* Lo hice un poco más sutil para que no opaque el título */
            height: auto;
            border-radius: 12px;
            display: block; /* Evita márgenes raros debajo de la imagen */
        }

        .titulo { 
            color: #ffffff; 
            margin: 0; 
            font-size: 24px; 
            font-weight: 700;
            letter-spacing: 0.5px;
            text-align: left; /* Alineado a la izquierda junto al logo se ve más pro */
            padding-left: 20px; /* Separación entre el logo y el texto */
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
        
        .caja-ia { 
            background-color: #f0f9f8; 
            border-left: 5px solid #0d8476; 
            padding: 20px; 
            margin: 25px 0; 
            border-radius: 0 8px 8px 0; 
            font-size: 15px; 
            color: #333333; 
            white-space: pre-wrap; 
        }

        .marca-ia {
            font-size: 12px;
            font-weight: bold;
            color: #0d8476;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
            display: block;
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
                                    <h1 class="titulo">Diagnóstico Empresarial</h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="cuerpo">
                        <h2>¡Hola, {{ $cliente->nom_cliente }} {{ $cliente->apellidos_cliente }}!</h2>
                        <p>Muchas gracias por confiar en nuestros servicios. Hemos procesado la información de <strong>{{ $cliente->nom_empresa }}</strong> y a continuación te presentamos el resultado del análisis estratégico.</p>
                        
                        <div class="caja-ia">
                            <span class="marca-ia">✦ Análisis generado por IA Corporativa</span>
                            {!! nl2br(e($diagnostico)) !!}
                        </div>

                        <div class="contacto">
                            <p>En breve, uno de nuestros consultores se pondrá en contacto contigo al correo <strong>{{ $cliente->correo_cliente }}</strong> para platicar sobre cómo podemos implementar estas soluciones y llevar tu negocio al siguiente nivel.</p>
                        </div>
                    </div>

                    <div class="footer">
                        <p>Este es un reporte automático generado por Inteligencia Artificial.</p>
                        <p>&copy; 2026 CENTRO DE INNOVACIÓN DIGITAL®. Todos los derechos reservados.</p>
                    </div>

                </div>
            </td>
        </tr>
    </table>

</body>
</html>