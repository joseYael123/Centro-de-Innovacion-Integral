import { Form, Container, Button } from 'react-bootstrap';
import { use, useState } from 'react';
import './Contacto.css';
import ModalCarga from '../Componentes/ModalCarga';
import {useNavigate} from 'react-router-dom';

function Contacto() {
    
    const brandColor = "#0b6a64";

    const initalState = {correo_contacto: '', nombre_contacto: '', apellidos_contacto: '', sugerencia: ''};
    const [datos, setDatos] = useState(initalState);
    const [cargando, setCargando] = useState(false);
    const [tipo, setTipo] = useState("");
    const navegar = useNavigate();

    const handleSubmit = async(e) => {
    try{
        e.preventDefault();

        if(datos.nombre_contacto == "" || datos.apellidos_contacto == "" || datos.correo_contacto == "" || datos.sugerencia == ""){
            alert("Todos los campos deben de estar llenos para subir la sugerencia");
            return;
        }

        setTipo("carga")
        setCargando(true);

        const sugerenciaSubida = 
        await fetch("http://127.0.0.1:8000/api/contactos",{
            method: "POST",
            headers: {"Accept" :  "application/json",
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        })

        if(!sugerenciaSubida.ok){
            setCargando(false);
            const mensaje_error = sugerenciaSubida.json();
            console.log("Hubo un error al subir los datos checa la consola");
            alert("Hubo un error al subir los datos checa la consola");
            console.error(mensaje_error);
        }

        if(sugerenciaSubida.ok){
            setTipo("subido");
            setTimeout(() =>{
                setCargando(false);
                setDatos(initalState);
            },3000)
        }

        setTimeout(() =>{
                navegar('/');
        },4500);
        }catch(error){
            console.error("error: ", error);
        }   
    }

    return (
        <Container fluid className='contCont d-flex justify-content-center align-items-center my-5'>
            {cargando &&
                <ModalCarga esVisible={cargando} tipoCarga={tipo} />
            }
            <Form className='rounded shadow-lg p-5 w-75 bg-white' onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
                
                <h2 className='fw-bold text-center mb-2' style={{ color: brandColor }}>Contáctanos</h2>
                <p className="text-center text-muted mb-4">Estamos aquí para escucharte. Envíanos tus dudas o comentarios.</p>

                <Form.Group className='mb-4'>
                    <Form.Label className="fw-bold small text-secondary">Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder='ejemplo@gmail.com' 
                    className="p-3 bg-light border-0 shadow-sm input-verde" 
                    name='correo_contacto'
                    value={datos.correo_contacto}
                    onChange={(e) => setDatos({
                        ...datos,
                        [e.target.name]:e.target.value
                    })}
                    />
                </Form.Group>

                <div className='d-flex flex-column flex-md-row w-100 gap-3 mb-4'>
                    <Form.Group className='w-100'>
                        <Form.Label className="fw-bold small text-secondary">Nombre(s)</Form.Label>
                        <Form.Control type="text" placeholder='Tu nombre' 
                        className="p-3 bg-light border-0 shadow-sm input-verde" 
                        value={datos.nombre_contacto}
                        name='nombre_contacto'
                        onChange={(e) => setDatos({
                            ...datos,
                            [e.target.name]: e.target.value
                        })}
                        />
                    </Form.Group>

                    <Form.Group className='w-100'>
                        <Form.Label className="fw-bold small text-secondary">Apellidos</Form.Label>
                        <Form.Control type="text" placeholder='Tus apellidos' 
                        className="p-3 bg-light border-0 shadow-sm input-verde" 
                        value={datos.apellidos_contacto}
                        name='apellidos_contacto'
                        onChange={(e) => setDatos({
                            ...datos,
                            [e.target.name]: e.target.value
                        })}
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
                        value={datos.sugerencia}
                        name='sugerencia'
                        onChange={(e) => setDatos({
                            ...datos,
                            [e.target.name]:e.target.value
                        })}
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