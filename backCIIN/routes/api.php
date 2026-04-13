<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\BlogsController;

Route::apiResource("clientes", ClienteController::class)
->middleware("throttle:50,1");

Route::apiResource("contactos", ContactoController::class)
->middleware("throttle:50,1");

Route::apiResource("blog", BlogsController::class)
->middleware("throttle:50,1");






