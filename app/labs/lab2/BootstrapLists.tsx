import { Container } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

export default function BootstrapList() {

    return (
        <Container>
            <div id="wd-css-styling-lists"> 
  <h2>Favorite movies</h2> 
  <ListGroup> 
    <ListGroupItem active>Aliens</ListGroupItem> 
    <ListGroupItem>Terminator</ListGroupItem> 
    <ListGroupItem>Blade Runner</ListGroupItem> 
    <ListGroupItem>Lord of the Ring</ListGroupItem> 
    <ListGroupItem disabled>Star Wars</ListGroupItem> 
  </ListGroup> 
</div> 


        </Container>

    )
}