<?php
init_set('max_execution_time', 300);
init_set('memory_limit', '512M');

echo "Iniciando la descompresion... <br>";


$zip = new ZipArchive;
$archive = $zip->open('vendor.zip');

if($archive === TRUE){
    $zip->extractTo('./');
    $zip->close();
    echo '<h2 style="color:green;">¡VICTORIA! La carpeta vendor fue extraída con éxito.</h2>';
} else {
   echo '<h2 style="color:red;">Fallo al abrir el ZIP. Código de error: ' . $res . '</h2>';
}

