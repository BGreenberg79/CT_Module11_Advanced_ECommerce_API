import { Link, NavLink } from "react-router-dom";
import {Container} from "react-bootstrap/Container";
import {Nav} from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap/Navbar";

function NavBar() {
    return(
        <Navbar expand="md" className="bg-success">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <NavLink to='/' activeClassName="active">Home</NavLink>
                        <NavLink to='/customers/' activeClassName="active">Customer Form</NavLink>
                        <NavLink to='/orders/' activeClassName="active">Order Form</NavLink>
                        <NavLink to='/products/' activeClassName="active">Product Form</NavLink>
                        <NavLink to='/products/list/' activeClassName="active">Product List</NavLink>
                        <NavLink to='/orders/list/' activeClassName="active">Order List</NavLink>
                        <NavLink to='/customers/list/' activeClassName="active">Customer List</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar;