import React from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";

function HomePage() {
    return(
        <Container>
            <Row className="px-4 ny-5">
                <Col xs={4} sm={6}>
                    <Image
                    src="/img/buildingDreamsIcon.jpeg"
                    fluid />
                </Col>
            </Row>
        </Container>
    )
}
//hi
export default HomePage;