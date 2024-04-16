import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'; // Import Image component

function SiteNav(props) {
    const handleLogout = () => {
        props.logOut();
    }
    return (
        <div>
            <header>
                <Navbar bg="black" expand="lg" variant="dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Container>
                        <Navbar.Brand>
                            <Image
                                src="/img/Logo.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Building Dreams Logo"
                            />
                            Building Dreams
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-md-auto">
                                <Nav.Link href="/home">Home</Nav.Link>  
                                <Nav.Link href="/forums">Forums</Nav.Link> 
                                <Nav.Link href="/configure">Configure</Nav.Link> 
                                <Nav.Link href="/messages">Messages</Nav.Link> 
                                <Nav.Link href="/cartitems">Cart Items</Nav.Link> 
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    )
}

export default SiteNav;
