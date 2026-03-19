import React from 'react';
import { Carousel } from 'react-bootstrap';
import imagenes from '../../img/imagenes';

const imaganesLi = [
    {imagen: imagenes.img1},
    {imagen: imagenes.img2},
    {imagen: imagenes.img3},
    {imagen: imagenes.img4},
    {imagen: imagenes.img5},
    {imagen: imagenes.img6}
];

function Carrusel({ style }) {
    return (
        <div className='carrusel-fixed' style={style}>
            <Carousel controls={true} indicators={false}>
                {imaganesLi.map((img, ind) => (
                    <Carousel.Item 
                        key={ind} 
                        interval={3000} 
                        style={{ width: "100%", height: "550px", backgroundColor: "#000" }}
                    >
                        <img 
                            src={img.imagen}
                            className='d-block w-100'
                            style={{ height: "100%", objectFit: "fill" }}
                            alt={`Slide ${ind + 1}`}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default React.memo(Carrusel);