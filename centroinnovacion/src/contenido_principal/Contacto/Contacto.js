import { Form, Container, Button } from 'react-bootstrap';
import { use, useState } from 'react';
import './Contacto.css';

function Contacto() {
    
    const brandColor = "#0b6a64";

    const initalState = {email: '', nom_admin: '', apellidos: '', peticion: ''};
    const [datos, setDatos] = useState(initalState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDatos({...datos, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Datos Subidos Correctamente.");
        setDatos(initalState);
    }



    return (
        <Container fluid className='contCont d-flex justify-content-center align-items-center my-5'>
            <Form className='rounded shadow-lg p-5 w-75 bg-white' onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
                
                <h2 className='fw-bold text-center mb-2' style={{ color: brandColor }}>Contáctanos</h2>
                <p className="text-center text-muted mb-4">Estamos aquí para escucharte. Envíanos tus dudas o comentarios.</p>

                <Form.Group className='mb-4'>
                    <Form.Label className="fw-bold small text-secondary">Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder='ejemplo@gmail.com' 
                    className="p-3 bg-light border-0 shadow-sm input-verde" 
                    name='email'
                    value={datos.email}
                    onChange={handleChange}
                    />
                </Form.Group>

                <div className='d-flex flex-column flex-md-row w-100 gap-3 mb-4'>
                    <Form.Group className='w-100'>
                        <Form.Label className="fw-bold small text-secondary">Nombre(s)</Form.Label>
                        <Form.Control type="text" placeholder='Tu nombre' 
                        className="p-3 bg-light border-0 shadow-sm input-verde" 
                        value={datos.nom_admin}
                        name='nom_admin'
                        onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className='w-100'>
                        <Form.Label className="fw-bold small text-secondary">Apellidos</Form.Label>
                        <Form.Control type="text" placeholder='Tus apellidos' 
                        className="p-3 bg-light border-0 shadow-sm input-verde" 
                        value={datos.apellidos}
                        name='apellidos'
                        onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <Form.Group className='mb-4'>
                    <Form.Label className="fw-bold small text-secondary">Mensaje / Sugerencia</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        placeholder='Escribe aquí tu mensaje...' 
                        className="p-3 bg-light border-0 shadow-sm input-verde"
                        style={{ resize: "none" }}
                        value={datos.peticion}
                        name='peticion'
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className="d-grid">
                    <Button 
                        type='submit' 
                        size="lg" 
                        className="fw-bold border-0"
                        style={{ backgroundColor: brandColor }}
                    >
                        Enviar Mensaje
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Contacto;