import { Container, Row, Col, Carousel, Image} from 'react-bootstrap';
import imagenes from '../../img/imagenes';

function Carrusel({style
}){
return(
<div className='carrusel-fixed' style={style}>
<Container fluid className='p-0 m-0 carrusel-container'>
    <Row className='g-0'> 
        <Col xs={12}> 
            <Carousel controls={false} indicators={false}>
                <Carousel.Item interval={3500} style={{ height: '600px' }}>
                    <Image
                    src={imagenes[0]}
                    className="d-block w-100"
                    style={{ height: '100%', width: '100%'}}
                    />
                <Carousel.Caption>
                    <h3 className='fw-bold'>El logo del centro de innovacion</h3>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3500} style={{ height: '600px',objectFit: "cover" }}>
                    <Image
                    src={imagenes[1]}
                    className="d-block w-100"
                    style={{ height: '100%', width: '100%', objectFit: "cover"}}
                    />
                <Carousel.Caption>
                <h3 className='fw-bold'>Actividades del centro de innovacion</h3>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3500} style={{ height: '600px' }}>
                    <Image
                    src={imagenes[2]}
                    className="d-block w-100"
                    style={{ height: '100%', width: '100%',objectFit: "cover"}}
                    />
                <Carousel.Caption>
                    <h3 className='fw-bold'>Estas Interesado?</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Col>                    
    </Row>
</Container>
</div>
);

}

export default Carrusel;