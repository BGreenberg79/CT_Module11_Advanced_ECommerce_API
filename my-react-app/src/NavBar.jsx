import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import  Navbar from "react-bootstrap/Navbar";

function NavBar() {
    return(
        <Navbar expand="md" className="bg-success">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/customer/create/'>Customer Form</NavLink>
                        <NavLink to='/orders/'>Order Form</NavLink>
                        <NavLink to='/products/'>Product Form</NavLink>
                        <NavLink to='/products/list/'>Product List</NavLink>
                        <NavLink to='/orders/list/'>Order List</NavLink>
                        <NavLink to='/customers/list/'>Customer List</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar;