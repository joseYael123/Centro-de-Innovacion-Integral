import { Outlet } from 'react-router-dom';
import NavBar from './contenido_principal/NavBar/NavBar';
import Footer from './contenido_principal/Componentes/Footer';
import { useLocation, useOutlet } from 'react-router-dom';
import { useEffect,useState, useRef } from 'react';
import './anim.css';

function ExportPrin(){

    const [animar,setAnimar] = useState(false);

    const outletAnim = useOutlet();

    const [outlet, setOutlet] = useState(outletAnim);

    const location = useLocation();

    const primerCarga = useRef(true);

    useEffect(() =>{

        if(primerCarga.current){
            primerCarga.current = false
            return;
        }
        setAnimar(true);

        const animOn = setTimeout(() =>{
            setOutlet(outletAnim);
        }, 600)

        const animOff = setTimeout(() =>{
            setAnimar(false);
        }, 1200)
        
        return () => {
            clearTimeout(animOn);
            clearTimeout(animOff);
        };

    }, [location.pathname])

    return(
        <>
        <div className={`circle ${animar ? 'animate': ''}`}></div>
        <NavBar/>
            <div className='d-flex flex-column min-vh-100 w-100'>
                <main className='d-flex flex-grow-1 w-100'>
                    {outlet}
                </main>
            <Footer/>
            </div>
        </>
    );
}

export default ExportPrin;