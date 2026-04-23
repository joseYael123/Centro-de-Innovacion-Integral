<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\BlogsController;

Route::middleware(['auth:sanctum'])->group(function(){

Route::post("clientes", [ClienteController::class, 'store'])->
middleware(['throttle:limitar-gemini'],['throttle:limite-global']);

Route::apiResource("clientes", ClienteController::class)->except(['store']);

Route::apiResource("blog", BlogsController::class);

Route::apiResource("contactos", ContactoController::class);
});

