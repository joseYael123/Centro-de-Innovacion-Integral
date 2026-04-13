<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::all();
        if($blogs->isEmpty()) return response()->json(["msg" => "No hay blogs disponibles"], 404);
        return response()->json($blogs,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
            "titulo_blog" => "required|string|max: 255", 
            "fecha_publicacion" => "required|string|max: 300",
            "subtitulo" => "required|string|max: 200",
            "cont_blog" => "required|string|max: 10000",
            "img_blog_ruta" => "string|max: 500",
            "esDestacado" => "required|boolean|"
            ]);
        
            $blog_creado = Blog::firstOrCreate(
                ["titulo_blog" => $request->titulo_blog,
                 "subtitulo" => $request->subtitulo],
                $validated
            );

            return response()->json([
                "Msg" => "Blog creado con exito",
                "Blog" => $blog_creado,
            ],201);

        }catch(Exception $e){   
            printf("Errores en el run", $e);
            return response() -> json(["msg" => "Errores en el run", "Error" => $e],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog_especifico = Blog::find($id);
        if(!$blog_especifico) return response()->json(["msg" => "No se encuentra el recurso a buscar"],404);
        return response()->json($blog_especifico,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blogs)
    {
        try{
            $validated = $request->validate([
            "titulo_blog" => "string|max:255", 
            "fecha_publicacion" => "date",
            "subtitulo" => "string|max:200",
            "cont_blog" => "string|max:10000",
            "img_blog_ruta" => "string|max:500",
            "esDestacado" => "boolean|"
            ]);

            $blog_actualizado = Blog::update($validated);

            return response()->json([
                "Msg" => "Blog Actualizado con exito",
                "Campos actualizados" => $blog_actualizado
            ]);

        }catch(Exception $e){
            prinf("Errores en el run: $e");
            return response()->json([
                "Msg" => "Errores en el run",
                "Erorr" => $e
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $buscar_blog = Blog::find($id);
        if(!$buscar_blog) return response()->json(["msg" => "No esta ese blog para borrar"],404);
        $buscar_blog->destroy();
        return response()->json([
            "Msg" => "Blog borrado con exito"
        ],200);
    }
}
