import {Container, Row, Col, Carousel,Image,Card} from 'react-bootstrap';
import { FaBullseye, FaLightbulb, FaEye } from "react-icons/fa";
import './Nosotros.css';
import videoIntroduccion from '../../img/videoChido.mp4';
import imgEarly from '../../img/placeholder.jpg';
import imagenesTodos from '../../img/imagenesEquipo';

function Nosotros(){

    const brandColor = "linear-gradient(to right, #095757, #0b6a64, #34baae";

    const listaLideres = [
        {nombre:"Cosme Garcia", Area: "Liderazgo" ,puesto:"Lider y fundador del CIIN", imagen: imagenesTodos.Cosme},
        {nombre:"Carol Solano", Area: "Liderazgo" ,puesto:"Lider del equipo innovador de CIIN", imagen: imagenesTodos.Carol},
    ];

        const listaEquipo = [
            {nombre: "Amanda Rojo", Area: "Gestión y Estrategia Corporativa", puesto: "Líderes de Operaciones Administrativas", imagen: imagenesTodos.Amanda},
            {nombre: "Nahomi Rico", Area: "Gestión y Estrategia Corporativa",  puesto: "Líderes de Operaciones Administrativas", imagen: imagenesTodos.Nahomi},
            {nombre: "Diego", Area: "Gestión y Estrategia Corporativa",  puesto: "Líderes de Operaciones Administrativas", imagen: imagenesTodos.Diego},

            {nombre: "Yael Gomez", Area: "Ingeniería e Innovación", puesto: "Desarrolladores de Soluciones Tecnológicas", imagen: imagenesTodos.Yael},
            {nombre: "Alexis", Area: "Ingeniería e Innovación", puesto: "Desarrolladores de Soluciones Tecnológicas", imagen: imagenesTodos.Alexis},

            {nombre: "Juan Pablo", Area: "Crecimiento y Posicionamiento de Marca", puesto: "Estrategas de Comunicación y Mercado", imagen: imagenesTodos.Juan},
            {nombre: "Atai Contreras", Area: "Crecimiento y Posicionamiento de Marca", puesto: "Estrategas de Comunicación y Mercado", imagen: imagenesTodos.Atai},
            {nombre: "Kitzia Martinez", Area: "Crecimiento y Posicionamiento de Marca", puesto: "Estrategas de Comunicación y Mercado", imagen: imagenesTodos.Kitzia}
        ];

        
    return(
        <Container fluid className='d-flex flex-column flex-grow-1 p-0'>   
            <Row className='d-flex w-100 m-0 flex-fill align-items-center flex-row position-relative'>
                <Col xs={12} md={6} className='animar d-flex flex-column justify-content-center p-4 p-lg-5 order-2 order-md-1 bg-light'>
                   <div className='texto-contenido'>
                    <FaLightbulb size={80} className='icono-tarjeta'/>
                        <h3 className='fw-bold text-dark mb-3'>Misión</h3>
                        <p className='fs-5 lh-lg text-secondary mb-4'>
                            Brindar servicios de innovación, capacitación y consultoría que fortalezcan las habilidades,
                            conocimientos y estrategias de personas, emprendedores y organizaciones.
                        </p>
                   </div>
                </Col>
                <div
                className="d-none d-md-block" 
                    style={{
                        position: "absolute", 
                        left: "50%", 
                        top: "50%",
                        transform: "translate(-50%, -50%)", 
                        zIndex: 10,
                        width: "6px",         
                        height: "90%",
                        background: "linear-gradient(to bottom, #0c5c58, #0d6d66, #31a89f)",
                        borderRadius: "10px"
                    }}
            
                ></div>
                <Col xs={12} md={6} className='animar d-flex align-items-center justify-content-center p-4 p-lg-5 order-1 order-md-2'>
                    <div className='texto-contenido'>
                     <FaEye size={80} className='icono-tarjeta'/>                    
                     <h3 className='fw-bold text-dark mb-3'>Visión</h3>
                        <p className='fs-5 lh-lg text-secondary m-0'>
                            Consolidarse en tres años como referente regional y nacional,
                            reconocida por su enfoque humano, creativo y profesional, generando impacto positivo 
                            en el desarrollo personal, empresarial y social.
                        </p>
                    </div>
                </Col>
            </Row>
            <Row 
                className='w-100 m-0 py-5 align-items-center' 
                style={{ background: "linear-gradient(to right, #095757, #0b6a64, #34baae)" }}
            >
                <Col xs={12} md={5} lg={4} className='d-flex flex-column align-items-center justify-content-center mb-4 mb-md-0'>
                    
                    <FaBullseye size={90} className='text-white mb-3 icono-animado' />
                    
                    <h2 className='fw-bold display-5 text-white text-center m-0'>
                        Nuestro Propósito
                    </h2>
                    <div className='mt-3' style={{ width: '60px', height: '4px', backgroundColor: 'white', borderRadius: '2px' }}></div>
                </Col>

                <Col xs={12} md={7} lg={8} className='px-4 px-lg-5'>
                    <p className='fs-5 lh-lg text-white m-0 text-center text-md-start'>
                        El centro de Innovación Integral es una marca visionaria, cercana y estratégica. 
                        Se caracteriza por su capacidad de observar, cuestionar y proponer mejoras reales 
                        actuando como un facilitador del cambio. 
                        <br/><br/>
                        Es una marca comprometida con el desarrollo del talento, abierta a nuevas ideas 
                        y con una actitud colaborativa que impulsa la innovación desde las personas.
                    </p>   
                </Col>
            </Row>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='text-center'>
                    <h2 className='fw-bold fs-3'>Introduccion al CIIN</h2>
                    <video
                        style={{backgroundColor:"black", width:"100%", height:550, objectFit:"fill"}}
                        src={videoIntroduccion}
                        controls
                        playsInline
                    />
                </Col>
            </Row>
          <Row className='d-flex align-items-center justify-content-center py-5 bg-light m-0 w-100'>
                <Col xs={12} className='text-center mb-4'>
                    <h2 className='fw-bold fs-2'>Conoce al equipo</h2>
                    <div className='mx-auto mt-2' style={{ width: '50px', height: '3px', background: brandColor }}></div>
                </Col>

                <Col xs={12} md={6} lg={5} className='text-center mb-5 mb-md-0'> 
                    <Carousel indicators={false} controls={false} className="pb-4">
                        {listaLideres.map((lider, index) => (
                            <Carousel.Item interval={3500} key={index}>
                                <Card className='border-0 shadow-lg rounded-4 overflow-hidden mx-auto' style={{ maxWidth: '320px' }}>
                                    <div style={{ height: '420px', backgroundColor: '#f8f9fa' }}>

                                        <Card.Header className='bg-white border-0 py-3 shadow-sm z-1'>
                                        <h6 className='fw-bold mb-0 text-uppercase' style={{ color: '#095757', letterSpacing: '1px' }}>
                                            {lider.Area}
                                        </h6>
                                        </Card.Header>

                                        <Card.Img 
                                            src={lider.imagen} 
                                            style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'top' }}
                                            alt={lider.nombre}
                                        />
                                    </div>
                                    <Card.Body className='p-4 text-center' style={{ background: brandColor }}>
                                        <h5 className='fw-bold text-white mb-1'>{lider.nombre}</h5>
                                        <small className='text-light opacity-75'>{lider.puesto}</small>
                                    </Card.Body>
                                </Card>                       
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>

                <Col xs={12} md={6} lg={5} className='text-center'>  
                    <Carousel indicators={false} controls={false} className="pb-4">
                        {listaEquipo.map((miembro, index) => (
                            <Carousel.Item interval={3500} key={index}>
                                <Card className='border-0 shadow-lg rounded-4 overflow-hidden mx-auto' style={{ maxWidth: '320px' }}>
                                    <div style={{ height: '420px', backgroundColor: '#f8f9fa' }}>

                                    <Card.Header className='bg-white border-0 py-3 shadow-sm z-1'>
                                        <h6 className='fw-bold mb-0 text-uppercase' style={{ color: '#095757', letterSpacing: '1px' }}>
                                            {miembro.Area}
                                        </h6>
                                    </Card.Header>
                                    
                                        <Card.Img 
                                            src={miembro.imagen} 
                                            style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'top' }}
                                            alt={miembro.nombre}
                                        />
                                    </div>
                                    <Card.Body className='p-4 text-center' style={{ background: brandColor }}>
                                        <h5 className='fw-bold text-white mb-0'>{miembro.nombre}</h5>
                                        <small className='text-light opacity-75'>{miembro.puesto}</small>
                                    </Card.Body>
                                </Card>                       
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default Nosotros;