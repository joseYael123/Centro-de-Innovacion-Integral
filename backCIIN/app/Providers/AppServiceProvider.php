<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('limitar-gemini', function(Request $req){
            $huella = sha1($req->ip() . $req->userAgent());

            return Limit::perMinute(2) ->by($huella)->response(function(){
                return response()->json([
                    "msg" => 'Demasiadas peticiones. Por favor, espera un minuto.'
                ],429); 
            });
        });

        RateLimiter::for('limite-global', function(Request $req){
            Limit::perMinute(13)->response()->json([
                "msg" => "Demasiadas peticiones en un solo minuto, espera"
            ],429);
        });
    }
}
