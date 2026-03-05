import {Container, Row, Col} from 'react-bootstrap';
import { useEffect, useState, useMemo } from 'react';
import './diagnostico.css';


function Diagnostico(){

    const particulas = useMemo(() =>{

        return Array.from({length: 100}).map((_,ind) =>({
            id: ind,
            dim: `${5 + Math.random() * 6}px`,
            posX: `${Math.random() * 100}%`,
            dur: `${3 + Math.random() *3}s`,
            delay: `${-1 * Math.random() * 12}s`
        }))
    },[]);
    
    return(
        <Container fluids className='d-flex justify-content-center align-items-center w-100'>
            
            {particulas.map((part) => {
                return(
                <span
                    key={part.id}
                    className='animacionFondo'
                    style={{
                        '--dim': part.dim,
                        '--posX': part.posX,
                        '--dur': part.dur,
                        '--delay': part.delay
                    }}
                >
                </span>
                );
            })}
            <Row className='z-2 g-3 w-100'>
                <Col xs={12} md={12}>
                    <div className='d-flex justify-content-center align-items-center bg-dark'>
                        <h2 className='fw-bold text-white'>Texto ejemplo</h2>
                    </div>
                </Col>
            </Row>
        </Container>
    )

}
export default Diagnostico;