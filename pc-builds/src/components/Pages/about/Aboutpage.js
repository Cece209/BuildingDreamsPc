import React from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AboutPage(){
    return(
        <Container>
            <Row className="px-4 my-5">
                <Col xs={12} md={6}>
                    <h1 style={{ color: 'white' }}>About Us</h1>
                    <p style={{ color: 'white' }}>
                        Insert your about content here.
                    </p>
                </Col>
                <Col xs={12} md={6} className="text-center">
                    <img src="/img/Aboutimage.png" alt="About" style={{ maxWidth: '100%' }} />
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
