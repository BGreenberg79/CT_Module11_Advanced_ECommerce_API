import { Link, NavLink } from "react-router-dom";

function NavBar() {
    return(
        <nav>
            <NavLink to='/' activeClassName="active">Home</NavLink>
            <NavLink to='/customer/' activeClassName="active">Customer Form</NavLink>
            <NavLink to='/order/' activeClassName="active">Order Form</NavLink>
            <NavLink to='/product/' activeClassName="active">Product Form</NavLink>
        </nav>
    )
}
export default NavBar;