import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <Container fluid style={{ 
            position: 'absolute',
            height: '100vh', 
            overflow: 'hidden', 

        }}>
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(/img/bulidingdreamsbackground.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                }}
            />
            <Container 
                style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    padding: '2rem', 
                }}
            >
                <div style={{ 
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '0 0 2px black'
                }}>
                    <h1 className="font-weight-light" style={{ fontSize: '2.5rem' }}>Let's Build Dreams Together! </h1>
                    <p style={{ fontSize: '1.2rem' }}>
                        Welcome to "Building Dreams!" Start building your PC now!
                    </p>
                    <Link to={{pathname: '/configure' }}>
                        <Button variant="outline-primary">Start Building &gt;&gt;</Button>
                    </Link>
                </div>
            </Container>
        </Container>
    );
}

export default HomePage;

