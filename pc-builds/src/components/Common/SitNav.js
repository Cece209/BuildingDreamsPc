import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SiteNav(props) {
    const handleLogout = () => {
        props.logOut();
    }
    return (
        <div>
            <header>
            <Navbar bg="grey" expand="lg" variant="dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Container>
                        <Navbar.Brand>Building Dreams</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-md-auto">
                                <Nav.Link href="/home">Home</Nav.Link>  
                                 
                                <Nav.Link href="/forums">Forums</Nav.Link> 
                                <Nav.Link href="/configure">Configure</Nav.Link> 
                                <Nav.Link href="/messages">Messages</Nav.Link> 
                                <Nav.Link href="/cartitems">Cart Items</Nav.Link> 
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <footer style={{ position: "fixed", bottom: 0, width: "100%" }}>
            <Navbar  bg="grey" expand="lg" variant="dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

                    <Container>
                        <Nav className="ms-md-auto">
                        <Nav.Link href="/about" className="white-text" style={{ marginRight: '80px' }}>About</Nav.Link>  
                        <Nav.Link href="/save builds" className="white-text" style={{ marginRight: '100px' }}>Saved Builds</Nav.Link>
                        <Nav.Link href="/feedback" className="white-text"style={{ marginRight: '60px' }}>Feedback</Nav.Link>
                        <Nav.Link onClick={handleLogout} className="white-text"style={{ marginRight: '40px' }}>Logout</Nav.Link>
    
                        </Nav>
                    </Container>
                </Navbar>
            </footer>
        </div>
    )
}

export default SiteNav;