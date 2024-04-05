import React from 'react';
import { Container, Button } from 'react-bootstrap';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <Container fluid style={{ 
            backgroundImage: 'url(/img/bulidingdreamsbackground.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed', 
            top: 0,
            left: 0,
            right: 0, 
            bottom: 0,
            zIndex: -1, 
            overflow: 'hidden',
        }}>
        <div style={{ 
            position: 'absolute',
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -120%)',
            textAlign: 'text',
            color: 'white',
            textShadow: '0 0 2px black'
        }}>
            <h1 className="font-weight-light" style={{ fontSize: '2.5rem' }}>Let's Build Dreams Together! </h1>
            <p style={{ fontSize: '1.2rem' }}>
                Welcome to "Building Dreams!" Start building your PC now!
            </p>
            <Link to="/configure">
                <Button variant="outline-primary">Start Building &gt;&gt;</Button>
            </Link>
        </div>
    </Container>
);
}

export default HomePage;
