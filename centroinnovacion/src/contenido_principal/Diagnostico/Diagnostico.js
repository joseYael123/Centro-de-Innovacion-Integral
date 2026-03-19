import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useMemo, useState} from 'react';
import './diagnostico.css';
import ModalCarga from '../Componentes/ModalCarga';
import {useNavigate} from 'react-router-dom';

function Diagnostico() {
    const particulas = useMemo(() => {
        return Array.from({ length: 100 }).map((_, ind) => ({
            id: ind,
            dim: `${3 + Math.random() * 6}px`,
            posX: `${Math.random() * 100}%`,
            dur: `${3 + Math.random() * 3}s`,
            delay: `${-1 * Math.random() * 12}s`
        }))
    }, []);

    const navegar = useNavigate();

    const [datosForm, setDatosForm] = useState({
        nom_cliente: "",
        apellidos_cliente: "",
        correo_cliente: "",
        nom_empresa: "",
        peticion_cliente: ""
    });

    const [cargando, setCargando] = useState(false);
    const [carga, tipoCarga] = useState("carga");

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(datosForm.nom_cliente == "" || datosForm.apellidos_cliente == "" || 
           datosForm.correo_cliente == "" || datosForm.nom_empresa == "" || datosForm.peticion_cliente == ""){
            alert("Todos los campos deben de estar llenos para hacer un diagnostico correcto");
            return;
        }

        setCargando(true);
        tipoCarga("carga");

        try{
        const subirPeticion = 
        await fetch("http://127.0.0.1:8000/api/clientes",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosForm),
        });

        if(!subirPeticion.ok){
            setCargando(false);
            const errorBack = await subirPeticion.json();
            console.log("Error del backend", errorBack);
            alert(`Hubo un error desde el backend revisa la consola`);
            return;
        }

        tipoCarga("subido");

        if(subirPeticion.ok){
            setTimeout(() => {
            setCargando(false);    

            setDatosForm({
                nom_cliente: "",
                apellidos_cliente: "",
                correo_cliente: "",
                nom_empresa: "",
                peticion_cliente: ""
            })
            }, 2500)}
            
            setTimeout(() =>{
                navegar('/');
            },4000);

        }catch(error){
            setCargando(false);
            console.log("Errores papus");
            console.error("Error: ", error);
        }
    }

    return (
        <Container fluid className='diagnostico-container d-flex justify-content-center align-items-center w-100 min-vh-100 position-relative overflow-hidden py-5'>
            
            {cargando &&
                <ModalCarga esVisible={cargando} tipoCarga={carga}/>
            }

            {particulas.map((part) => {
                return (
                    <span
                        key={part.id}
                        className='animacionFondo'
                        style={{
                            '--dim': part.dim,
                            '--posX': part.posX,
                            '--dur': part.dur,
                            '--delay': part.delay
                        }}
                    ></span>
                );
            })}

            <Row className='z-2 w-100 justify-content-center px-3'>
                <Col xs={12} md={10} lg={8} xl={7}>
                    {/* Formulario en modo claro (Light Glassmorphism) */}
                    <div className='light-glass-form p-4 p-md-5 my-5 rounded-4 shadow-lg w-100'>
                        
                        <div className="text-center mb-5 brand-header">
                            <h2 className='form-title fw-bold display-5 mb-2'>Innovación Integral</h2>
                            <p className="form-subtitle fs-6">
                                Descubre el potencial oculto de tu negocio. Completa este diagnóstico rápido y nuestro equipo diseñará una estrategia exclusiva para ti.
                            </p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-4">
                                <Form.Group as={Col} md={6} controlId="formNombre" className="mb-4 mb-md-0">
                                    <Form.Label className='light-label'>Nombre(s)</Form.Label>
                                    <Form.Control 
                                    type='text' className='light-input' placeholder='Ej. Ana' required name="nom_cliente"
                                    value={datosForm.nom_cliente} 
                                    onChange={(e) => setDatosForm({
                                        ...datosForm,
                                        [e.target.name]: e.target.value
                                    })
                                    }
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md={6} controlId="formApellidos">
                                    <Form.Label className='light-label'>Apellidos</Form.Label>
                                    <Form.Control 
                                    type='text' className='light-input' placeholder='Ej. Martínez' required name="apellidos_cliente" 
                                    value={datosForm.apellidos_cliente} onChange={(e) =>
                                    setDatosForm({
                                        ...datosForm,
                                        [e.target.name]: e.target.value
                                    })}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-4">
                                <Form.Group as={Col} md={6} controlId="formCorreo" className="mb-4 mb-md-0">
                                    <Form.Label className='light-label'>Correo Corporativo</Form.Label>
                                    <Form.Control type="email" className='light-input' placeholder='ana@tuempresa.com' required name="correo_cliente"
                                        value={datosForm.correo_cliente} onChange={(e) =>
                                            setDatosForm({
                                                ...datosForm,
                                                [e.target.name]: e.target.value
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md={6} controlId="formEmpresa">
                                    <Form.Label className='light-label'>Nombre de la Empresa</Form.Label>
                                    <Form.Control type="text" className='light-input' placeholder='Ej. InnovaTech S.A.' required name="nom_empresa"
                                        value={datosForm.nom_empresa} onChange={(e) => 
                                            setDatosForm({
                                                ...datosForm,
                                                [e.target.name] : e.target.value
                                            })
                                        }
                                    />
                                </Form.Group>
                            </Row>

                            <hr className="border-secondary opacity-10 my-4" />

                            <Form.Group className="mb-5" controlId="formDesafios">
                                <Form.Label className='light-label fs-5'>Cuéntanos sobre tu empresa y sus desafíos actuales</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    className='light-input' 
                                    rows={8} 
                                    placeholder='¿A qué se dedican? ¿Qué procesos te gustaría mejorar o automatizar? Escribe todo lo que consideres importante...' 
                                    value={datosForm.peticion_cliente}
                                    onChange={(e) => 
                                        setDatosForm({
                                            ...datosForm,
                                            [e.target.name]: e.target.value
                                        })
                                    }
                                    name='peticion_cliente'
                                    required 
                                />
                            </Form.Group>

                            <div className='d-flex justify-content-center mt-4'>
                                <Button type="submit" className='btn-verde-innovacion px-5 py-3 fs-5 fw-bold w-100 rounded-pill'>
                                    Iniciar Diagnóstico
                                </Button>            
                            </div>
                        </Form>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Diagnostico;