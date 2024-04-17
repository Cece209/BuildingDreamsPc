import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
    return (
        <div>
            <Container fluid style={{ 
                position: 'relative',
                padding: 0,
                height: '50vh', 
                overflow: 'hidden', 
            }}>
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(/img/eyes.jpeg)',
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
                        minHeight: '100%',
                        padding: '2rem', 
                       
                    }}
                >
                    <div style={{ 
                        textAlign: 'center',
                        color: 'white',
                        textShadow: '0 0 2px black'
                    }}>
                        <h1 className="font-weight-light" style={{ fontSize: '2.5rem' }}>We Build Together!</h1>
                        <p style={{ fontSize: '1.2rem' }}>
                            Learn more about "Building Dreams" and us.
                        </p>
                    </div>
                </Container>
            </Container>
            
            <Container fluid style={{ 
                backgroundColor: '#333333', 
                position: 'absolute',
                minHeight: '50vh', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Row className="px-4 my-5">
                    <Col xs={12} md={12}>
                        <h1 style={{ color: 'white', textShadow: '0 0 3px black'}}>About Us</h1>
                        <p style={{ color: 'white', textShadow: '0 0 3px black' }}>
                            "Building Dreams," a PC integration service website that offers a personalized computer assembly experience. The website aims to provide an intuitive PC configurator system, 
                            enabling users to customize and visualize their ideal computer setup. 
                            Users will have the flexibility to select various components like processors, graphics cards, memory, storage, and peripherals. 
                            The system will ensure component compatibility, offer dynamic price calculations, and provide a user-friendly interface for an enhanced customization process. 
                            Additionally, the website will feature a chat/message functionality for personalized assistance, allowing users to seek advice and interact with our representatives. 
                            This platform is designed to cater to tech enthusiasts, offering them a space to not only build their dream PCs but also share and save their configurations for future reference. 
                        </p>
                    </Col>
                    <Col xs={12} md={6} className="text-center" style={{ position: 'relative' }}>
                    <img src="/img/About.png" alt="About" style={{ maxWidth: '100%', boxShadow: '0 0 20px orange' }} />
                    </Col>

                    <Col xs={12} md={6}>
                        <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Goal</h2>
                        <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                            The ultimate goal is to combine passion for technology with expert knowledge, delivering a comprehensive and enjoyable PC building experience.
                        </p>
                    </Col>
                    <Col xs={12} md={6} style={{ paddingTop: '40px' }}>
                    <h1 style={{ color: 'white', textShadow: '0 0 3px black'}}>Web Developers</h1>
                    <p style={{ color: 'white', textShadow: '0 0 3px black' }}>
                    The ultimate goal is to provide high-quality web development services tailored to our clients' needs.
        </p>
    </Col>
    </Row>
            </Container>
        </div>
    );
}

export default AboutPage;




