import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.png'
import auth from '../../../firebase.init'

const Header = () => {
    const [user] = useAuthState(auth);
    const [signOut] =useSignOut(auth);
    const navigate = useNavigate();
    const handleLogOut =()=>{
        signOut();
        alert('You are sign out');
        navigate("/home");
    }
  
    return (
        <>
        <Navbar collapseOnSelect sticky='top' expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/"><img height={30} src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="home#services">Services</Nav.Link>
                    <Nav.Link href="home#experts">Experts</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    {
                        user && <>
                            <Nav.Link as={Link} to="/addservice">AddService</Nav.Link>
                            <Nav.Link as={Link} to="/manage">Manage</Nav.Link>
                            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>

                        </>
                    }
                    {
                        user? <Button onClick={handleLogOut}>Log Out</Button>:
                        <Nav.Link as={Link} to="/login">
                    Login
                    </Nav.Link>}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
};

export default Header;