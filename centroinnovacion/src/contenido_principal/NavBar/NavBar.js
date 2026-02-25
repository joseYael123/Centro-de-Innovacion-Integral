import { Container, Navbar, Nav } from "react-bootstrap";
import videoLogo from '../../img/LogoCIIN1.2.mp4';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useState, useRef } from "react";

function NavBar() {
    const [focus, setFocus] = useState(false);
    const timer = useRef(null);

    const handleMouseIn = () => {
        if (timer.current) clearTimeout(timer.current);
        setFocus(true);
    };

    const handleMouseOut = () => {
        timer.current = setTimeout(() => setFocus(false), 300);
    };

    const degradadoMarca = {
        background: "linear-gradient(to left, #0d8476, #72c8c1,#72c8c1,#f2f2f2)",
        width: "100%"
    }

    return (
        <>
         <Navbar expand="sm" className="p-0 w-100 border-0" style={degradadoMarca} variant="dark">
            <Container fluid className="d-flex align-items-center justify-content-between">
                
                <Navbar.Brand className="d-flex align-items-center logo-container m-0 p-0" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut}>
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
                            style={{ pointerEvents: "none" }}
                        />    
                    </Link>
                    <div className={`text-container ${focus ? 'visible' : ''} d-none d-lg-flex`}>
                        <span className="navText ms-2 texto-animado">
                            !Bienvenido al Centro De Innovacion Integral!
                        </span>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="menu-navegacion" className="border-0 shadow-none me-2" />

                <Navbar.Collapse id="menu-navegacion">
                    <Nav className="menu-enlaces ms-auto d-flex align-items-center py-3 py-sm-0">
                        <div className="links-nav">
                            <Link to='/' className="text-decoration-none"> 
                                <span className="navText">Inicio</span> 
                            </Link>
                        </div>
                        <div className="links-nav">
                            <Link to='en-construccion' className="text-decoration-none text-nowrap"> 
                                <span className="navText">Diagnostico</span> 
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
                    </Nav>
                </Navbar.Collapse>

            </Container>
         </Navbar>
        </>
    );
}

export default NavBar;