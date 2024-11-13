import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import  Navbar from "react-bootstrap/Navbar";

function NavBar() {
    return(
        <Navbar expand="md" bg="success" data-bs-theme="success">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <NavLink className="mx-2 text-light text-decoration-none" to='/'>Home</NavLink>
                        <NavLink className="mx-2 text-light text-decoration-none" to='/customer/create/'>Customer Form</NavLink>
                        <NavLink className="mx-2 text-light text-decoration-none" to='/orders/create/'>Order Form</NavLink>
                        <NavLink className="mx-2 text-light text-decoration-none" to='/products/create/'>Product Form</NavLink>
                        <NavLink className="mx-2 text-light text-decoration-none" to='/products/list/'>Product List</NavLink>
                        <NavLink className="mx-2 text-light text-decoration-none" to='/orders/list/'>Order List</NavLink>
                        <NavLink className="mx-2 text-light text-decoration-none" to='/customers/list/'>Customer List</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar;