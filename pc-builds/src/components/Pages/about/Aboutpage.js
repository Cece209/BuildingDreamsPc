import React from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AboutPage(){
    return(
        <Container>
            <Row className="px-4 my-5">
                <Col xs={12} md={6}>
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
                <Col xs={12} md={6} className="text-center">
                    <img src="/img/About.png" alt="About" style={{ maxWidth: '100%' }} />
                </Col>
            </Row>
            <Row className="px-4 my-5">
                <Col xs={12} md={6} className="text-center">
                    <img src="img/About2.jpeg"alt="Left" style={{ maxWidth: '100%' }} />
                </Col>
                <Col xs={12} md={6}>
                    <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Goal</h2>
                    <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                        The ultimate goal is to combine passion for technology with expert knowledge, delivering a comprehensive and enjoyable PC building experience.
                    </p>
                </Col>
            </Row>
            <style>
                {`
                    body {
                        background-color: #333333;
                        min-height: 100vh;
                    }
                `}
            </style>
        </Container>
    )
}
export default AboutPage;
