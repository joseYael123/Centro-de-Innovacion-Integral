import {Container, Row, Col} from 'react-bootstrap';
import { FaBullseye, FaRoute } from "react-icons/fa";
import './Nosotros.css';

function Nosotros(){

    return(
        <Container fluid className='d-flex flex-column flex-grow-1 p-0'>
            <Row className='w-100 m-0 flex-fill align-items-center'>
                <Col xs={12} md={6} className='d-flex align-items-center justify-content-center p-4 p-lg-5'>
                    <div className='tituloCarta'>
                        <FaBullseye className='icono-carta' />
                        <h2 className='fw-bold display-5 text-center m-0 mt-3'>Nuestro Propósito</h2>
                        <div className='decoracion-borde'></div>
                    </div>
                </Col>
                <Col xs={12} md={6} className='d-flex align-items-center p-4 p-lg-5 bg-light'>
                    <div className='texto-contenido'>
                        <p className='fs-5 lh-lg text-secondary m-0'>
                            El centro de Innovación Integral es una marca visionaria, cercana y estratégica. 
                            Se caracteriza por su capacidad de observar, cuestionar y proponer mejoras reales 
                            actuando como un facilitador del cambio. <br/><br/>
                            Es una marca comprometida con el desarrollo del talento, abierta a nuevas ideas 
                            y con una actitud colaborativa que impulsa la innovación desde las personas.
                        </p>   
                    </div>
                </Col>
            </Row>

            <Row className='w-100 m-0 flex-fill align-items-center'>
                <Col xs={12} md={6} className='d-flex flex-column justify-content-center p-4 p-lg-5 order-2 order-md-1 bg-light'>
                   <div className='texto-contenido'>
                        <h3 className='fw-bold text-dark mb-3'>Misión</h3>
                        <p className='fs-5 lh-lg text-secondary mb-4'>
                            Brindar servicios de innovación, capacitación y consultoría que fortalezcan las habilidades,
                            conocimientos y estrategias de personas, emprendedores y organizaciones.
                        </p>
                        
                        <h3 className='fw-bold text-dark mb-3'>Visión</h3>
                        <p className='fs-5 lh-lg text-secondary m-0'>
                            Consolidarse en tres años como referente regional y nacional,
                            reconocida por su enfoque humano, creativo y profesional, generando impacto positivo 
                            en el desarrollo personal, empresarial y social.
                        </p>
                   </div>
                </Col>
                <Col xs={12} md={6} className='d-flex align-items-center justify-content-center p-4 p-lg-5 order-1 order-md-2'>
                    <div className='tituloCarta'>
                        <FaRoute className='icono-carta' />
                        <h2 className='fw-bold display-5 text-center m-0 mt-3'>Nuestro Camino</h2>
                        <div className='decoracion-borde'></div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Nosotros;