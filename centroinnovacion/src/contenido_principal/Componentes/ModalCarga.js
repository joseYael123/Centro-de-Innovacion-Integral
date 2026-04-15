import { useEffect, useState } from "react";
import './modalStyles.css';
import { FaCheck, FaTimesCircle } from "react-icons/fa";

function ModalCarga({esVisible, tipoCarga, esDiagnostico, errorMsg}){

    const [puntos,setPuntos] = useState("");
    const [indiceTexto, setIndice] = useState(0);
    const [render,setRender] = useState(esVisible);
    const [animFinal, setAnimFinal] = useState(true);

    const arrayTextos = [
        "Analizando solicitud", 
        "Generando respuesta", 
        "Ajustando parámetros", 
        "Preparando resultado"
    ];

    useEffect(() =>{
        if(tipoCarga === "carga"){
            const puntosAnim = setInterval(() =>{
                setPuntos((puntosAnt) => {
                    if(puntosAnt === "...") return "";
                    return puntosAnt + ".";
                })
            }, 200);
            return () => clearInterval(puntosAnim);
        }
    },[esVisible, tipoCarga]);

    useEffect(() =>{
        if(tipoCarga === "carga" && esDiagnostico){
            const cambioTexto = setInterval(() =>{
                setIndice((indiceAnterior) => {
                    return (indiceAnterior + 1) % arrayTextos.length;
                })
            }, 2500);
            return () => clearInterval(cambioTexto);
        }
    },[esVisible, esDiagnostico, tipoCarga]);

    useEffect(() =>{

        if(esVisible){
            setRender(true);
            setAnimFinal(false);
        }else if(render){
            setAnimFinal(true);

            setTimeout(() =>{
                setRender(false);
            },300)
        }

    }, [esVisible,render])

    if(!esVisible){
        return null;
    }

    return(
        <div className={`taparVista ${animFinal ? "cerrar" : ""}`}>  
            <div className={`vistaPrin ${animFinal ? "cerrar" : ""}`} key={tipoCarga}>
            {tipoCarga === "carga" ? (
                <>
                    <div className="animacion-carga mb-3"></div> 
                    <h2 className="texto-carga" style={{ display: "flex", justifyContent: "center", width: "100%", margin: "0 auto" }}>
    
                        <span style={{ width: "280px", textAlign: "right", whiteSpace: "nowrap" }}>
                            {esDiagnostico ? arrayTextos[indiceTexto] : "Subiendo petición, espere"}
                        </span>
    
                        <span style={{ width: "40px", textAlign: "left", whiteSpace: "nowrap" }}>
                            {puntos}
                        </span>

                    </h2>
                    <p className="texto-secundario">Por favor, no cierre esta ventana.</p>
                </>
            ): tipoCarga === "error" ? (
                <>
                    <FaTimesCircle size={80} color="#dc3545" className="mb-2"/>
                    <h2 className="texto-carga">¡Uy! Algo salió mal</h2>
                    <p className="texto-secundario">{errorMsg || "Hubo un error al procesar su petición. Intente más tarde."}</p>
                </>
            ):(
                <>
                    <FaCheck size={80} color="#198754" className="icon mb-2"/>
                    <h2 className="texto-carga">¡Petición Exitosa!</h2>
                    {esDiagnostico ? (
                     <p className="texto-secundario">Hemos enviado los resultados a su correo electrónico.</p>
                    ): (
                     <p className="texto-secundario">Se ha recibido su sugerencia, muchas gracias por su opinion</p>
                    )}
                </>        
            )}
            </div>
        </div>
    )
}

export default ModalCarga;