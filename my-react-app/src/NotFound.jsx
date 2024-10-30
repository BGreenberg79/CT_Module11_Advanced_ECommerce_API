import {Container} from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap/Row';
import {Col} from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap'

function NotFound() {
    return(
        <div>
            <Container fluid className="border border-danger">
                <Row className="my-2">
                    <Col>
                        <h2>404- Not Found</h2>
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col>
                        <p>The page you are seeking does not exist.</p>
                        <p>Please return to the <Nav.Link as={NavLink} className="text-info" to="/">homepage</Nav.Link></p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default NotFound