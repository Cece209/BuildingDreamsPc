import React from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <Container fluid style={{ 
            backgroundImage: 'url(img/bulidingdreamsbackground.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed', 
            top: 0,
            left: 0,
            right: 0, 
            bottom: 0,
            zIndex: -1, 
            overflow: 'hidden' 
        }}>

            <Row className="px-4 my-5">
                <Col sm={6}>
                    <h1 className="font-weight-light">PC Builds</h1>
                    <p className="mt-4">
                        Welcome to "Building Dreams," the ultimate destination for personalized computing. 
                        Founded by a tech enthusiast with a deep passion for custom PC builds, our service 
                        offers a hands-on approach to creating your ideal computer. Catering to the growing 
                        demand for tailored systems, our new website introduces an intuitive PC configurator, 
                        allowing you to select and visualize each component of your dream machine. From processors 
                        to peripherals, design your custom build with real-time compatibility checks and transparent 
                        pricing. Plus, with our interactive chat feature, get expert advice and share your configurations 
                        with the tech community. Join us in crafting a unique, supportive, and user-friendly platform 
                        for all your custom PC needs.
                    </p>
                    <Link to="/configure">
                        <Button variant="outline-primary">Configure Builds &gt;&gt;</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;