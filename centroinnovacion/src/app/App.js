import './App.css';
import Inicio from '../contenido_principal/Inicio';
import { Routes, Route, Router} from 'react-router-dom';
import ExportPrin from '../ExportPrin';
import Enconstruccion from '../enConstruccion';
import Contacto from '../contenido_principal/Contacto/Contacto';
import Nosotros from '../contenido_principal/Nosotros/Nosotros';

function App() {
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

