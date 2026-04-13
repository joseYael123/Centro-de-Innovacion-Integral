<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string("titulo_blog", 255);
            $table->string("fecha_publicacion", 255);
            $table->string("subtitulo", 200);
            $table->string("cont_blog",10000);
            $table->string("img_blog_ruta", 500)->default("");
            $table->boolean("esDestacado");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
