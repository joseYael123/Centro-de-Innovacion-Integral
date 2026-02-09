import { Container } from "react-bootstrap";
import videoLogo from '../../img/LogoCIIN.mp4';
import {Link} from 'react-router-dom';
import {Image} from 'react';
import './navbar.css'
import { useState, useRef } from "react";

function NavBar(){
    const [focus, setFocus] = useState(false);
    const timer = useRef(null);

    const handleMouseIn = () =>{
        if(timer.current){
            clearTimeout(timer.current);
        }
        setFocus(true);
    };

    const handleMouseOut = () => {
        timer.current = setTimeout(() => {
            setFocus(false);
        }, 300);
    };

    const degradadoMarca = {
        background: "linear-gradient(to right, #0d8476, #72c8c1, #000e14, #f2f2f2)",
        width: "100%"
    }

    return(
        <>
         <Container fluid className="navbar d-flex align-items-center justify-content-between w-100"  style={degradadoMarca}>
            <div className="d-flex align-items-center logo-container" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut}>
                <Link to='/' className="p-2">
                    <video 
                        src={videoLogo}
                        width={100}
                        height={100}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="imgen rounded"
                        style={{pointerEvents: "none"}}
                    />    
                </Link>
                <div className={`text-container ${focus ? 'visible' : ''}`}>
                    <span className="navText ms-2 texto-animado">
                        !Bienvenido al Centro De Innovacion Integral!
                    </span>
                </div>
            </div>
            <Container className="d-flex align-items-center justify-content-end flex-wrap gap-3">
             <div className="links-nav">
                <Link to='/' className="text-decoration-none"> 
                    <span className="navText">Inicio</span> 
                </Link>
             </div>
             <div className="links-nav">
                <Link to='en-construccion' className="text-decoration-none"> 
                    <span className="navText">Diagnostico empresarial</span> 
                </Link>
             </div>
             <div className="links-nav">
                <Link to='nosotros' className="text-decoration-none"> 
                    <span className="navText">Nosotros</span> 
                </Link>
             </div>
             <div className="links-nav">
                <Link to='contacto' className="text-decoration-none"> 
                    <span className="navText">Contacto</span> 
                </Link>
             </div>
             <div className="links-nav">
                <Link to='en-construccion' className="text-decoration-none"> 
                    <span className="navText">Blog</span> 
                </Link>
             </div>
             </Container>
            </Container>
        </>
    );
}

export default NavBar;