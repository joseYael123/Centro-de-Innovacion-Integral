import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './modalStyles.css';
import { FaCheck } from "react-icons/fa";

function ModalCarga({esVisible, tipoCarga}){

    if(!esVisible){
        return;
    }

    return(
        <Container className="taparVista">  
            <div className="vistaPrin">
            {tipoCarga === "carga" ? (
            <>
                <div className="animacion-carga"></div>
                <h2 className="texto-carga">Subiendo su peticion por favor espere...</h2>
            </>
            ): (
            <>
                <FaCheck size={70} color="green"/>
                <h2 className="texto-carga">Peticion subida correctamente</h2>
            </>
            )}
            </div>
        </Container>
    )
}

export default ModalCarga;