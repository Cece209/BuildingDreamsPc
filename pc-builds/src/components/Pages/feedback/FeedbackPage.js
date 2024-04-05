import React from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FeedbackPage(){
    return(
        <Container>
            <Row className="px-4 my-5">
            <Col><h1 style={{ color: 'white' }}>Feedback</h1></Col>
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

export default FeedbackPage;