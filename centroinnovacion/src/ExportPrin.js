import { Outlet } from 'react-router-dom';
import NavBar from './contenido_principal/NavBar/NavBar';
import Footer from './contenido_principal/Componentes/Footer';

function ExportPrin(){
    return(
        <>
            <NavBar/>
        <div className='d-flex flex-column min-vh-100 min-vw-100'>
            <main className='d-flex flex-grow-1 w-100'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
        </>
    );
}

export default ExportPrin;