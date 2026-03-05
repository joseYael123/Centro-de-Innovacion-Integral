import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useMemo, useRef, useEffect } from "react";
import { Link} from 'react-router-dom';
import './blog.css';
import blogImagenes from '../../img/blog/blogImg';
import conceptos from '../../img/blog/videos_Juan/BLOG-Conceptos.mp4';
import practicas from '../../img/blog/videos_Juan/BLOG-Prácticas.mp4';
import tips from '../../img/blog/videos_Juan/BLOG-Tips.mp4';
import { FaBookOpen, FaVideo } from "react-icons/fa"; 

function Blog() {
        
    const particle = useMemo(() => {
        return Array.from({ length: 100 }).map((_, ind) => ({
            id: ind,
            dim: `${5 + Math.random() * 6}px`,
            posX: `${Math.random() * 100}%`,
            dur: `${3 + Math.random() * 3}s`,
            delay: `${-1 * (Math.random() * 10)}s`
        }));
    }, []);

    const elemList = useRef([]);
    useEffect(() => {
        const observer = new IntersectionObserver((entradas) => {
            entradas.forEach((ent) => {
                if (ent.isIntersecting) {
                    ent.target.classList.add('show')
                } else {
                    ent.target.classList.remove('show')
                }
            });
        }, { threshold: 0.15 }); 

        elemList.current.forEach((elem) => {
            if (elem) observer.observe(elem);
        });
        return () => observer.disconnect();
    }, []);

    const contBlog = [
        {titulo: "La hiperpersonalización y el dominio del video corto en el consumo digital", subtitulo: "La hiperpersonalización ya es una exigencia del consumidor",
        esDestacado: true, fecha_publicacion: "21/02/2026", imagen: blogImagenes.img2, 
        contenido: "El marketing más escta perdiéndo efectividad. Actualmente, los consumidores esperan experiencias adaptadas a sus intereses, necesidades y comportamiento digital."},

        {titulo: "Innovación y tendencias en marketing digital:el camino hacia un posicionamiento moderno", subtitulo: "",
        esDestacado: false, fecha_publicacion: "25/02/2026", imagen: blogImagenes.img10,  contenido: "El marketing más escta perdiéndo efectividad. Actualmente, los consumidores esperan experiencias adaptadas a sus intereses, necesidades y comportamiento digital."},
    ]

    const colorMarca = "#0f5132";

    return (
        <Container fluid className="d-flex min-vh-100 w-100 justify-content-center align-items-center position-relative overflow-hidden flex-column p-0">
    
            {particle.map((p) => (
                <span
                    key={p.id}
                    className="animacionFondo"
                    style={{
                        '--dim': p.dim,
                        '--posX': p.posX,
                        '--dur': p.dur,
                        '--delay': p.delay
                    }}
                >
                </span>
            ))}

            <Container className="z-2 py-5">

             {contBlog.map((contenido, ind) =>   
                <Row key={ind} className="image-card bg-white shadow rounded-4 overflow-hidden mb-5 g-0 border" ref={(el) => { if (el && !elemList.current.includes(el)) elemList.current.push(el) }}>
                    
                    <Col xs={12} md={6} className="overflow-hidden">
                        <Link to={"/blog-detalle"} className="d-block h-100">
                            <Image 
                                src={contenido.imagen}  
                                className="w-100 h-100 object-fit-fill img-zoom"
                                alt="Tendencias Marketing Digital"
                            />
                        </Link>
                    </Col>

                    <Col xs={12} md={6} className="p-4 p-lg-5 d-flex flex-column justify-content-center">
                        {contenido.esDestacado &&
                            <div className="d-flex align-items-center mb-3 text-muted small">
                                <FaBookOpen className="me-2" style={{color: colorMarca}}/>
                                <span>CONTENIDO DESTACADO</span>
                            </div>
                        }   
                        <h1 className="fw-bold mb-3" style={{ color: colorMarca, fontSize: '2.5rem', lineHeight: '1.2' }}>
                            {contenido.titulo}
                        </h1>
                        
                        <p className="text-secondary mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Articulo escrito por el equipo de CIIN <br/>
                            Fecha de publicacion {contenido.fecha_publicacion}
                        </p>
                        
                        <Link to={"/blog-detalle"} state={contenido} style={{textDecoration:'none'}}>
                            <Button 
                                className="fw-bold px-4 py-2 rounded-pill shadow-sm border-0"
                                style={{ background: `linear-gradient(45deg, ${colorMarca}, #20c997)`, color: 'white' }}
                            >
                                Leer artículo completo
                            </Button>
                        </Link>
                    </Col>
                </Row>
                )}
                <div className="text-center mb-4 mt-5 text-card" ref={(el) => { if (el && !elemList.current.includes(el)) elemList.current.push(el) }}>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                        <FaVideo className="me-2 h4 mb-0" style={{color: colorMarca}}/>
                        <h2 className="fw-bold m-0" style={{color: colorMarca}}>Cápsulas de Aprendizaje CIIN</h2>
                    </div>
                    <p className="text-muted">Contenido exclusivo en video para potenciar tus conocimientos.</p>
                </div>

                <Row className="g-4 mb-5">
                    
                    <Col md={4} xs={12} className="text-card" ref={(el) => { if (el && !elemList.current.includes(el)) elemList.current.push(el) }}>
                            <h5 className="fw-bold mb-3 text-center text-truncate" style={{color: colorMarca}}>
                                1. Conceptos Clave
                            </h5>
                        <div className="cel-container">
                            <div className="cel-notch"><div className="cam-notch"></div></div>
                                <video 
                                    src={conceptos} 
                                    controls 
                                    playsInline 
                                    className="w-100 h-100 rounded" 
                                    style={{objectFit: 'contain'}}
                                />
                            <p className="text-white small text-center mt-3 mb-0">Introducción teórica fundamental.</p>
                        </div>   
                    </Col>

                     <Col md={4} xs={12} className="text-card" ref={(el) => { if (el && !elemList.current.includes(el)) elemList.current.push(el) }}>
                            <h5 className="fw-bold mb-3 text-center text-truncate" style={{color: colorMarca}}>
                                2. Estadias CIIN
                            </h5>
                         <div className="cel-container">
                            <div className="cel-notch"><div className="cam-notch"></div></div>
                                <video 
                                    src={practicas} 
                                    controls 
                                    playsInline 
                                    className="w-100 h-100 rounded" 
                                    style={{ objectFit: 'contain' }}
                                />
                            <p className="text-white small text-center mt-3 mb-0">Experiencia en estadias CIIN.</p>
                        </div>   
                    </Col>

                    
                     <Col md={4} xs={12} className="text-card" ref={(el) => { if (el && !elemList.current.includes(el)) elemList.current.push(el) }}>
                            <h5 className="fw-bold mb-3 text-center text-truncate" style={{color: colorMarca}}>
                                3. Tips Rápidos
                            </h5>
                        <div className="cel-container">
                             <div className="cel-notch"><div className="cam-notch"></div></div>
                                <video 
                                    src={tips} 
                                    controls 
                                    playsInline 
                                    className="w-100 h-100 rounded" 
                                    style={{ objectFit: 'contain' }}
                                />
                            <p className="text-white small text-center mt-3 mb-0">Consejos directos para tu estrategia.</p>
                        </div>   
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Blog;