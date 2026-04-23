import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useMemo, useRef, useEffect, useState } from "react";
import { Link} from 'react-router-dom';
import './blog.css';
import blogImagenes from '../../img/blog/blogImg';
import conceptos from '../../img/blog/videos_Juan/BLOG-Conceptos.mp4';
import practicas from '../../img/blog/videos_Juan/BLOG-Prácticas.mp4';
import tips from '../../img/blog/videos_Juan/BLOG-Tips.mp4';
import { FaBookOpen, FaVideo, FaNewspaper } from "react-icons/fa"; 
import placeholder from '../../img/placeholder.jpg';


function Blog() {

    const [contBlog, setContBlog] = useState([]);
    const [isLoading, setLoading] = useState(true);   
    
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
    }, [contBlog]);

    useEffect(() => {
        const obtenerBlogs = async() => {
        try{
            const obtener = await fetch("https://centrodeinnovacionintegral.com.mx/core/public/index.php/api/blog",{
                headers:{ 
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${process.env.REACT_APP_TOKEN_API}`
                }
            });

            if(!obtener.ok){
                setLoading(false);
                const erroJson = await obtener.json();
                console.log("Json de error", erroJson);
                throw new Error(erroJson.msg || erroJson.message || "No se pudieron cargar los blogs");
            }

            const contenido_blog = await obtener.json();

            const crearArray = Array.isArray(contenido_blog)
            ? contenido_blog
            : Object.values(contenido_blog);

            setContBlog(crearArray);
            console.log(contenido_blog);

        }catch(error){
            console.error("Error: ", error);
        } finally{
            setLoading(false);
       };
    }
        obtenerBlogs();  
    }, [])

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

            {isLoading && (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" style={{color: colorMarca}} role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}
            
            {!isLoading && Array.isArray(contBlog) && contBlog.length === 0 && (
            <div 
                className="w-100 rounded bg-white p-5 d-flex flex-column align-items-center justify-content-center shadow-sm"
                style={{ border: "2px dashed #dee2e6", minHeight: "300px" }}
                >
                    <FaNewspaper
                        style={{ fontSize: "4rem", color: "#ced4da", marginBottom: "1rem" }} 
                    />
        
                    <h3 className="fw-bold fs-4 text-center mb-2" style={{ color: colorMarca }}>
                        Aún no hay artículos publicados
                    </h3>
                
                    <p className="text-muted text-center mb-0">
                        Estamos preparando contenido increíble. Vuelve pronto para leer nuestros nuevos artículos.
                    </p>
                </div>
            )}

            {!isLoading && contBlog.length > 0 && (
            contBlog.map((contenido, ind) => (
                <Row key={contenido.id || ind} className="image-card bg-white shadow rounded-4 overflow-hidden mb-5 g-0 border" ref={(el) => { if (el && !elemList.current.includes(el)) elemList.current.push(el) }}>
                    
                    <Col xs={12} md={6} className="overflow-hidden">
                        <Link to={"/blog-detalle"} className="d-block h-100">
                            <Image 
                                src={contenido.img_blog_ruta ? contenido.img_blog_ruta : placeholder}  
                                className="w-100 h-100 object-fit-fill img-zoom"
                                alt="Tendencias Marketing Digital"
                            />
                        </Link>
                    </Col>

                    <Col xs={12} md={6} className="p-4 p-lg-5 d-flex flex-column justify-content-center">
                        {contenido.esDestacado === 1 &&
                            <div className="d-flex align-items-center mb-3 text-muted small">
                                <FaBookOpen className="me-2" style={{color: colorMarca}}/>
                                <span>CONTENIDO DESTACADO</span>
                            </div>
                        }   
                        <h1 className="fw-bold mb-3" style={{ color: colorMarca, fontSize: '2.5rem', lineHeight: '1.2' }}>
                            {contenido.titulo_blog}
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
                    ))
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