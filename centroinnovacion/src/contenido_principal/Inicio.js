import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaChalkboardTeacher, FaHandshake, FaLightbulb } from 'react-icons/fa';
//import videoInicio from '../img/videoInicio.mp4';
import cosmeVideo from '../img/Img 6333.mp4';
import Carrusel from './Componentes/Carrusel';
import './Inicio.css';

function Inicio() {
    // Tu color de marca original
    const brandColor = "linear-gradient(to right, #095757, #0b6a64, #34baae";
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffset(window.pageYOffset);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const alturaVideo = 500;
    const opacidad = 1.5 - (offset / alturaVideo);
    const translateY = offset * 0.5;

    const servicios = [
        {
            titulo: "Capacitación",
            texto: "Cursos, talleres y formación profesional orientada al desarrollo de competencias actuales.",
            icono: <FaChalkboardTeacher size={50} color={brandColor} />
        },
        {
            titulo: "Asesoría",
            texto: "Acompañamiento estratégico personalizado para empresas y emprendedores en sus etapas clave.",
            icono: <FaHandshake size={50} color={brandColor} />
        },
        {
            titulo: "Innovación",
            texto: "Desarrollo e impulso de proyectos creativos y soluciones tecnológicas de alto impacto.",
            icono: <FaLightbulb size={50} color={brandColor} />
        }
    ];

    return (
        <>
            <Container fluid className='p-0 m-0'>
            <div className='contVideo'>  
                <div className='carrusel-fixed' style={{opacity: opacidad < 0 ? 0 : opacidad, translate: `translateY(${translateY}px)`}}>
                    <Carrusel/>
                </div>
            </div>  
                <div className="contenido-principal pt-5">
                    
                    {/* ... (SECCIÓN DE SERVICIOS - SIN CAMBIOS) ... */}
                    <Row className='flex-column align-items-center my-5'>
                        <Col xs={12} md={8} lg={6} className="mb-5">
                            <Card className="h-100 shadow border-0 text-center p-4 intro-card">
                                <Card.Body>
                                    <h2 className='fw-bold mb-4'>¿Qué Hacemos?</h2>
                                    <Card.Text className="fs-5 text-muted">
                                        El CIIN es un espacio dedicado a la innovación, el emprendimiento y la formación integral, promoviendo el desarrollo tecnológico y social.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} md={10}>
                            <h2 className='fw-bold text-center mb-5'>Servicios</h2>
                            <Row className='justify-content-center g-4'>
                                {servicios.map((servicio, index) => (
                                    <Col xs="auto" key={index}>
                                        <Card className="h-100 shadow-sm border-0 service-card" style={{ width: "18rem" }}>
                                            <div className="card-accent-line"></div>
                                            <Card.Body className="d-flex flex-column align-items-center p-4">
                                                <div className="mb-3 icon-wrapper">
                                                    {servicio.icono}
                                                </div>
                                                <Card.Title className='text-center fw-bold mb-3'>
                                                    {servicio.titulo}
                                                </Card.Title>
                                                <Card.Text className="text-center text-muted">
                                                    {servicio.texto}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>

                    {/* SECCIÓN VIDEO + MAPA */}
                    <Container className="mb-5">
                        <Row className='align-items-start justify-content-center g-5'>
                            
                            {/* COLUMNA VIDEO */}
                            <Col xs={12} lg={6} className="d-flex flex-column">
                                <h2 className='fw-bold fs-4 text-center mb-4'>¿Qué es el CIIN?</h2>
                                
                                {/* AQUÍ ESTÁ EL TRUCO:
                                   1. Usamos 'background: brandColor' en el contenedor en lugar de negro.
                                   2. Añadimos un padding (p-3) para crear un marco interno.
                                   3. Usamos Flexbox para centrar perfectamente el video.
                                */}
                                <div 
                                    className="video-wrapper shadow rounded overflow-hidden border d-flex align-items-center justify-content-center p-3" 
                                    style={{ 
                                        height: "450px", 
                                        background: brandColor, // ¡Fondo de tu marca!
                                    }}
                                >
                                    {/* Contenedor interno para darle sombra al video sobre el fondo de color */}
                                    <div className="shadow-lg" style={{ height: "100%", width: "auto" }}>
                                        <video
                                            controls
                                            playsInline
                                            src={cosmeVideo}
                                            style={{ 
                                                height: "100%", // Llena la altura disponible
                                                width: "auto",  // El ancho se ajusta solo (proporcional)
                                                maxWidth: "100%", 
                                                display: "block",
                                                borderRadius: "4px"
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>

                            {/* COLUMNA MAPA */}
                            <Col xs={12} lg={6} className="d-flex flex-column">
                                <h2 className='fw-bold fs-4 text-center mb-4'>Dónde nos ubicamos</h2>
                                <div className='shadow-sm rounded overflow-hidden border'>
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2678.9607984812355!2d-103.37482912658018!3d20.62827290141696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ad2191129e85%3A0x899eba2576a94742!2sCENTRO%20DE%20INNOVACION%20INTEGRAL!5e1!3m2!1ses-419!2smx!4v1769456974210!5m2!1ses-419!2smx" 
                                        width="100%" 
                                        height="450" 
                                        style={{ border: 0, display: "block" }} 
                                        allowFullScreen="" 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Ubicación CIIN"
                                    ></iframe>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </Container>
        </>
    );
}

export default Inicio;