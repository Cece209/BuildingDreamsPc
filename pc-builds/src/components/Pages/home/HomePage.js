import React from 'react';
import { Container, Row, Carousel, Button } from "react-bootstrap";

//import { Link } from 'react-router-dom';

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
                <Row className="px-4 my-5">
                    <Carousel>
                        <Carousel.Item>
                            <Container className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                                <div>
                                    <h3>Configure Your PC</h3>
                                    <p>Customize your personal computer with our configurator.</p>
                                    <Button variant="primary" href="/configure">Configure</Button>
                                </div>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                                <div>
                                    <h3>About Us</h3>
                                    <p>Learn more about this website.</p>
                                    <Button variant="primary" href="/about">About</Button>
                                </div>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                                <div>
                                    <h3>Feedback</h3>
                                    <p>We value your feedback to improve our services.</p>
                                    <Button variant="primary" href="/feedback">Feedback</Button>
                                </div>
                            </Container>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                    </div>
                </Container>
            </Container>
    );
}

export default HomePage;

