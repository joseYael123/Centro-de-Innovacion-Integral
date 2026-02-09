import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaChalkboardTeacher, FaHandshake, FaLightbulb } from 'react-icons/fa';
import videoInicio from '../img/videoInicio.mp4';
import './Inicio.css';

function Inicio() {
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
                <div className='video-fixed' style={{opacity: opacidad < 0 ? 0 : opacidad, translate: `translateY(${translateY}px)`}}>
                    <video
                        src={videoInicio}    
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
            </div>  
                <div className="contenido-principal pt-5">
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
                        <Col xs={12} md={8} className='mt-4 text-center'>
                            <h2 className='fw-bold fs-4'>Donde nos ubicamos</h2>
                            <div className='rounded p-1 d-flex justify-content-center'>
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2678.9607984812355!2d-103.37482912658018!3d20.62827290141696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ad2191129e85%3A0x899eba2576a94742!2sCENTRO%20DE%20INNOVACION%20INTEGRAL!5e1!3m2!1ses-419!2smx!4v1769456974210!5m2!1ses-419!2smx" 
                                    width="600" 
                                    height="450" 
                                    style={{ borderRadius: 5 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}

export default Inicio;