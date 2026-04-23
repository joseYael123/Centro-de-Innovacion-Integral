import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useMemo, useState, useRef} from 'react';
import './diagnostico.css';
import ModalCarga from '../Componentes/ModalCarga';
import {useNavigate} from 'react-router-dom';
import { FaGlasses } from 'react-icons/fa';
import { Turnstile } from '@marsidev/react-turnstile';

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
    const [confirmarCorreo, setConfirmarCorreo] = useState("");
    const turnRef = useRef();

    const [datosForm, setDatosForm] = useState({
        nom_cliente: "",
        apellidos_cliente: "",
        correo_cliente: "",
        nom_empresa: "",
        rubro_empresa: "",
        tamanio_equipo: "",
        tiempo_marca: "",
        area_problema: "",
        problematica: "",
        resultados: "",        
    });

    const cantidadEmpleados = [
        {value: "Solo Yo", texto: "Solo Yo"},
        {value: "2-10", texto: "2-10"},
        {value: "11-50", texto: "11-50"},
        {value: "51-100", texto: "51-100"},
        {value: "101-200", texto: "101-200"},
        {value: "Mas De 200", texto: "Mas de 200"},
        {value: "Otro", texto: "Otro"}
    ];

    const Rubros = [
        {value: "Servicios Profesionales/Consultoria", texto: "Servicios Profesionales y Consultoria"},
        {value: "Comercio Minorista/E-commerce", texto: "Comercio Minorista y/o E-commerce"},
        {value: "Salud/Bienestar", texto: "Salud y Bienestar"},
        {value: "Sector Grastonomico", texto: "Sector Gastronomico"},
        {value: "Tecnologia Y Telecomunicaciones", texto: "Tecnologia y telecomunicaciones"},
        {value: "Sector Educacion/Capacitacion", texto: "Educacion y/y Capacitacion"},
        {value: "Construccion y Bienes Raices", texto: "Construccion y Bienes raices"},
        {value: "Manufuctura y Produccion", texto: "Manufuctura y Produccion"},
        {value: "Logistica Y Transporte", texto: "Logistica y Transporte"},
        {value: "Otro", texto: "Otro"}
    ];

    const Areas = [
        { value: "Ventas y Comercial", texto: "Ventas y Comercial" },
        { value: "Marketing y Publicidad", texto: "Marketing y Publicidad" },
        { value: "Operaciones y Procesos", texto: "Operaciones y Procesos Internos" },
        { value: "Tecnología y Sistemas", texto: "Tecnología, Software y Sistemas" },
        { value: "Administración y Finanzas", texto: "Administración y Finanzas" },
        { value: "Recursos Humanos", texto: "Recursos Humanos y Gestión de Talento" },
        { value: "Atención al Cliente", texto: "Atención al Cliente y Retención" },
        { value: "Estrategia y Dirección", texto: "Estrategia General y Modelo de Negocio" }
    ];

    const tiempoOperacion = [
    { value: "Idea", texto: "Apenas es una idea / Por lanzar" },
    { value: "Menos de 1 año", texto: "Menos de 1 año" },
    { value: "1 a 3 años", texto: "De 1 a 3 años" },
    { value: "3 a 5 años", texto: "De 3 a 5 años" },
    { value: "Más de 5 años", texto: "Más de 5 años" }
    ];

    const [cargando, setCargando] = useState(false);
    const [carga, tipoCarga] = useState("carga");
    const [diagnostico, setDiagnostico] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [tokenTung, setTokenTung] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setCargando(true);
        tipoCarga("carga");
        setDiagnostico(true);

        if(!tokenTung){
            console.error("Por favor, espera a que se complete la verificación de seguridad.");
            return;
        }

        if(datosForm.nom_cliente === "" || datosForm.apellidos_cliente === "" || 
           datosForm.correo_cliente === "" || datosForm.nom_empresa === "" || datosForm.rubro_empresa === "" ||
           datosForm.tamanio_equipo === "" || datosForm.area_problema === "" || datosForm.nom_empresa === "" || datosForm.problematica === "" ||
           datosForm.resultados === ""
        ){
            setErrorMsg("Todos los campos deben de estar llenos para hacer un diagnostico correcto");
            tipoCarga("error");
            setDiagnostico(false);
            setTimeout(() =>{
                setCargando(false);
            },2000)
            return;
        }

        if(datosForm.correo_cliente !== confirmarCorreo){
            setErrorMsg("Los correos deben coincidir para poder continuar");
            tipoCarga("error");
            setDiagnostico(false);
            setTimeout(() =>{
                setCargando(false)
            },2500);
            return;
        }

        try{
        const subirPeticion = 
        await fetch("https://centrodeinnovacionintegral.com.mx/core/public/index.php/api/clientes",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_TOKEN_API}`
            },
            body: JSON.stringify({
                ...datosForm,
                turnstile_token: tokenTung
            }),
        });

      if(!subirPeticion.ok){
        tipoCarga("error");
        setTimeout(() =>{
        setCargando(false);
        },5000);

        if(turnRef.current){
            turnRef.current.reset();
        }
        
        setTokenTung(null);

        const errorBack = await subirPeticion.json();
        console.log("RESPUESTA REAL DEL SERVIDOR:", errorBack); 

        if(subirPeticion.status === 429){
            setErrorMsg("Haz alcanzado el limite de tus 3 diagnosticos diarios...");
            return;
        }   

        if(subirPeticion.status === 422){
            const primerErrorMsg = Object.values(errorBack.errors)[0][0];
            setErrorMsg(primerErrorMsg);
            return;
        }
    
        if (errorBack.error || errorBack.magia_cloudflare) {
            setErrorMsg(errorBack.error || "Error de seguridad");
            return;
        }   

        setErrorMsg("Hubo un error al procesar su petición. Intente más tarde.");
        return;
    }

        tipoCarga("subido");

        if(subirPeticion.ok){
            setTimeout(() => {
            setDiagnostico(false);
            setCargando(false);    

            setDatosForm({
                 nom_cliente: "",
                apellidos_cliente: "",
                correo_cliente: "",
                nom_empresa: "",
                rubro_empresa: "",
                tamanio_equipo: "",
                tiempo_marca: "",
                area_problema: "",
                problematica: "",
                resultados: "",   
            })
            }, 3500)
            setTimeout(() =>{
                navegar('/');
            },4000);
            }
            

        }catch(error){
            setCargando(false);
            console.log("Errores papus");
            console.error("Error: ", error);
        }
    }

    return (
        <Container fluid className='diagnostico-container d-flex justify-content-center align-items-center w-100 min-vh-100 position-relative overflow-hidden py-5'>
            
            {cargando &&
                <ModalCarga esVisible={cargando} tipoCarga={carga} esDiagnostico={diagnostico} errorMsg={errorMsg}/>
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
                    <div className='light-glass-form p-4 p-md-5 my-5 rounded-4 shadow-lg w-100'>
                        
                        <div className="text-center mb-5 brand-header">
                            <h2 className='form-title fw-bold display-5 mb-2'>Innovación Integral</h2>
                            <p className="form-subtitle fs-6">
                                Descubre el potencial oculto de tu negocio. Completa este diagnóstico rápido y nuestro equipo diseñará una estrategia exclusiva para ti.
                            </p>
                            <small className='form-subtitle fw-bold'>SOLO SON PERMITIDOS 3 DIAGNOSTICOS POR DIA</small>
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
                                
                                 <Form.Group as={Col} md={6} controlId="formCorreo" className="mb-4 mb-md-0">
                                    <Form.Label className='light-label'>Confirmar Correo</Form.Label>
                                    <Form.Control type="email" className='light-input' required 
                                        value={confirmarCorreo} onChange={(e) =>
                                            setConfirmarCorreo(e.target.value)
                                        } onPaste={(e) => e.preventDefault()}
                                    />
                                </Form.Group>
                                <Row className='w-100 mb-4'>
                                    <Form.Group as={Col} md={12} controlId="formEmpresa">
                                        <Form.Label style={{fontWeight: "600", fontSize: 16, marginTop: 12, alignSelf: "center"}}>Nombre de la Empresa</Form.Label>
                                        <Form.Control type="text" className='light-input' style={{alignSelf: "center"}} placeholder='Ej. InnovaTech S.A.' required name="nom_empresa"
                                            value={datosForm.nom_empresa} onChange={(e) => 
                                                setDatosForm({
                                                    ...datosForm,
                                                    [e.target.name] : e.target.value
                                                })
                                            }
                                        />
                                    </Form.Group>
                                </Row>
                            </Row>

                        <hr className="border-secondary opacity-10 my-4" />
                        <Row className='flex-row mb-4 align-items-end'>
                            <Form.Group as={Col} md={6} controlId='formRubro' className="mb-4 mb-md-0">
                                <Form.Label className='light-label'>¿Cual es el rubro de tu empresa?</Form.Label>
                                <Form.Select name='rubro_empresa' value={datosForm.rubro_empresa} onChange={(e) => setDatosForm({
                                    ...datosForm, [e.target.name]: e.target.value
                                })} className='light-input'>
                                    <option value="" selected disabled hidden>Selecciona una opcion...</option>
                                    {Rubros.map((item) => 
                                        <option key={item.id} value={item.value}>{item.texto}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md={6} controlId='formPersonas' className="mb-4 mb-md-0">
                                <Form.Label className='light-label text-center'>¿Cuantas personas conforman tu empresa?</Form.Label>
                                <Form.Select name="tamanio_equipo" value={datosForm.tamanio_equipo} onChange={(e) => setDatosForm({
                                    ...datosForm, [e.target.name]: e.target.value
                                })} className='light-input'>
                                    <option value="" disabled selected hidden>Seleciona una opcion...</option>
                                    {cantidadEmpleados.map((item) =>
                                        <option key={item.id} value={item.value}>{item.texto}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className='flex-row mb-4 align-items-end'>
                            <Form.Group as={Col} xs={6} controlId='formArea' className="mb-4 mb-md-0">
                                <Form.Label className='light-label'>¿Cual es el area critica a tratar?</Form.Label>
                                <Form.Select className='light-input' name="area_problema" value={datosForm.area_problema} onChange={(e) => setDatosForm({
                                    ...datosForm, [e.target.name]: e.target.value
                                })}>
                                    <option value="" selected disabled hidden>Selecciona una opcion</option>
                                    {Areas.map((item) => 
                                    <option key={item.id} value={item.value}>{item.texto}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} xs={6} controlId='formTiempo' className="mb-4 mb-md-0">
                                <Form.Label className='light-label text-center'>¿Cuanto tiempo lleva tu marca en el mercado?</Form.Label>
                                <Form.Select className='light-input' name="tiempo_marca" value={datosForm.tiempo_marca} onChange={(e) => setDatosForm({
                                    ...datosForm, [e.target.name]: e.target.value
                                })}>
                                    <option value="" selected disabled hidden>Selecciona una opcion</option>
                                    {tiempoOperacion.map((item) => 
                                    <option key={item.id} value={item.value}>{item.texto}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className='d-flex flex-column'>
                            <Form.Group as={Col} md={12} controlId='formProblema' className="mb-4 mb-md-0">
                                <Form.Label className='light-label text-center'>¿Describe brevemente el mayor obstaculo o problema que enfrenta tu empresa hoy dia?</Form.Label>
                                <Form.Control className='light-input' name='problematica' as={"textarea"} value={datosForm.problematica}  
                                    onChange={(e) => setDatosForm({...datosForm, [e.target.name]: e.target.value})} rows={5}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12} controlId='formResultado' className="mb-4 mb-md-0">
                                <Form.Label className='light-label text-center'>¿Qué resultado específico te gustaría obtener al trabajar con nosotros en los próximos 3 meses?</Form.Label>
                                <Form.Control className='light-input' name='resultados' as={"textarea"} value={datosForm.resultados} rows={5}
                                    onChange={(e) => setDatosForm({
                                        ...datosForm, [e.target.name] : e.target.value
                                    })}
                                />
                            </Form.Group>
                        </Row>

                        <div className='my-4' style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}>
                            <Turnstile
                                ref={turnRef}
                                siteKey={`${process.env.REACT_APP_SITE_KEY}`}
                                onSuccess={(token) => setTokenTung(token)}
                                style={{opacity: 0}}
                                onError={(error) => console.error("Errores: ", error)}
                            />
                        </div>   

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