<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ContactoController;

Route::apiResource("clientes", ClienteController::class)
->middleware("throttle:3,1");

Route::apiResource("contactos", ContactoController::class)
->middleware("throttle:3,1");







