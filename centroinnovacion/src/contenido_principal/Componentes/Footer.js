import { Container,Row,Col } from "react-bootstrap";
import { FaFacebook, FaInstagram} from 'react-icons/fa';
import { Link } from "react-router-dom";
import './footer.css';

function Footer(){
const footerStyle = {
        background: "linear-gradient(to right, #0d8476, #72c8c1, #000e14, #f2f2f2)", // El mismo verde de tu Navbar
        color: "white",
        marginTop: "auto" // Ayuda a que se vaya al fondo si hay poco contenido
    };

    return (
        <footer style={footerStyle}>
            <Container className="py-5"> 
                <Row className="gy-4"> 
                    <Col xs={12} md={4} className="text-center text-md-start">
                        <h4 className="fw-bold mb-3">Centro de Innovación Integral</h4>
                        <p className="mb-0">
                            Impulsando el futuro a través de la tecnología <br/>
                            y el emprendimiento social.
                        </p>
                    </Col>

                    <Col xs={12} md={4} className="d-flex flex-column justify-content-center gap-2">
                        <span className="fw-bold fs-4 text-center mb-4">Redes Sociales</span>
                        <div className="d-flex justify-content-center gap-5">
                        <Link target="_blank" to={"https://www.facebook.com/profile.php?id=61562026836949"}>
                            <FaFacebook className="navText" size={30}/>
                        </Link>
                        <Link target='_blank' to={"https://www.instagram.com/centrodeinnovacionintegral?igsh=Mm13azN2eHVzNDZz"}>
                            <FaInstagram className="navText" size={30}/>
                        </Link>
                        </div>
                    </Col>

                    <Col xs={12} md={4} className="text-center text-md-end">
                        <h4 className="fw-bold mb-3">Contáctanos</h4>
                        
                        <div className="d-flex flex-column align-items-center align-items-md-end gap-2">
                            
                            <div className="d-flex align-items-center gap-2">
                                <span>cosmegarcia@centrodeinnovacionintegral.com.mx</span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <span>33 1224 9018 / 33 5305 2772</span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <span>Guadalajara, Jalisco</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} className="py-3">
                <Container className="text-center">
                    <small className="mb-0">
                        © 2026 Centro de Innovación Integral | Todos los derechos reservados
                    </small>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;