import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Detalle() {
    const location = useLocation();
    const contenido = location.state;

    if (!contenido) {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
                <h2 className="fw-bold mb-4 text-secondary">No se encontró el artículo</h2>
                <Link to="/blog">
                    <Button className="px-4 py-2 rounded-pill fw-bold border-0" style={{ backgroundColor: "#0f5132" }}>
                        <FaArrowLeft className="me-2" />
                        Volver al blog
                    </Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="py-5" style={{ minHeight: '100vh', maxWidth: '1000px' }}>
            
            <Row className="mb-4">
                <Col>
                    <Link to="/blog" className="text-secondary text-decoration-none d-inline-flex align-items-center transition-all hover-opacity">
                        <FaArrowLeft size={20} className="me-2" />
                        <span className="fw-semibold">Volver al blog</span>
                    </Link>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12}>
                    <h1 className="fw-bolder display-4 mb-4" style={{ color: "#0f5132", letterSpacing: '-1px' }}>
                        {contenido.titulo}
                    </h1>
                    <hr style={{ opacity: 0.15, backgroundColor: "#0f5132", height: "2px", margin: 0 }} />
                </Col>
            </Row>

            <Row className="g-5 mt-2">
                <Col xs={12} lg={6} className="d-flex flex-column">
                    {contenido.subtitulo && (
                        <h3 className="fw-bold mb-4" style={{ color: "#198754", lineHeight: '1.4' }}>
                            {contenido.subtitulo}
                        </h3>
                    )}
                    <p className="fs-5 text-dark" style={{ lineHeight: '1.9', textAlign: 'justify' }}>
                        {contenido.contenido}
                    </p>
                </Col>

                <Col xs={12} lg={6}>
                    <Image 
                        src={contenido.imagen} 
                        alt={contenido.titulo}
                        className="w-100 rounded-4 shadow-lg object-fit-cover"
                        style={{ maxHeight: '600px' }}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Detalle;