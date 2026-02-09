import {Container, Image} from 'react-bootstrap'
import construccion from './img/construcc.jpg';

function Enconstruccion(){

return(
<Container className='d-flex justify-content-center align-items-center my-4'>
    <Image src={construccion} width={400} height={400} alt='EN CONSTRUCCION'/>
</Container>
);
};

export default Enconstruccion;