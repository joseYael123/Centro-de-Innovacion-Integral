import './App.css';
import Inicio from '../contenido_principal/Inicio';
import { Routes, Route, Router} from 'react-router-dom';
import ExportPrin from '../ExportPrin';
import Enconstruccion from '../enConstruccion';
import Contacto from '../contenido_principal/Contacto/Contacto';
import Nosotros from '../contenido_principal/Nosotros/Nosotros';
import { useEffect, useState } from 'react';


function App() {

const [cargando, setCargando] = useState(true);

useEffect(() =>{

  const time = setTimeout(() =>{
    setCargando(false)
  }, 1500)

  return () => clearTimeout(time);
}, []);

  if(cargando){
    return(
    <div className='contenedor-cargar'>
      <div className='spinner-ciin'></div>
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
      </Route> 
    </Routes>
  </> 
  );
}

export default App;

