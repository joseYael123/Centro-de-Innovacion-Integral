import './App.css';
import Inicio from '../contenido_principal/Inicio';
import { Routes, Route, Router} from 'react-router-dom';
import ExportPrin from '../ExportPrin';
import Enconstruccion from '../enConstruccion';
import Contacto from '../contenido_principal/Contacto/Contacto';
import Nosotros from '../contenido_principal/Nosotros/Nosotros';
import { useEffect, useState } from 'react';
import videoCarga from '../img/videoCarga.mp4';
import Blog from '../contenido_principal/Blog/Blog';
import Detalle from '../contenido_principal/Blog/blogDetalle';
import Diagnostico from '../contenido_principal/Diagnostico/Diagnostico';

function App() {

const [cargando, setCargando] = useState(true);

useEffect(() =>{

  const time = setTimeout(() =>{
    setCargando(false)
  }, 2000)

  return () => clearTimeout(time);
}, []);

  if(cargando){
    return(
    <div className='contenedor-cargar'>
      <video autoPlay playsInline muted className='logoGirando' src={videoCarga}/>
      <h2 className='texto-carga'>Cargando...</h2>
    </div>
  );
  }

  return (
   <>
    <Routes>
      <Route path='/' element={<ExportPrin/>}>
      <Route index element={<Inicio/>}/>      
      <Route path='en-construccion' element={<Enconstruccion/>}/>
      <Route path='contacto' element={<Contacto/>}/>
      <Route path='nosotros' element={<Nosotros/>}/>
      <Route path='blog' element={<Blog/>}/>
      <Route path='blog-detalle' element={<Detalle/>}/>
      <Route path='diagnostico' element={<Diagnostico/>}/>
      </Route> 
    </Routes>
  </> 
  );
}

export default App;

