import React from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useCart } from '../../../components/Pages/cartItems/CartContext.js';

function SavedBuildsPage(){

    const { savedBuilds } = useCart();

    return(
        <Container>
            <Row className="px-4 my-5">
            <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Saved Builds</h1></Col>
            </Row>
            <style>
                {`
                    body {
                        background-color: #333333;
                        min-height: 100vh;
                    }
                `}
            </style>
            <Container>
            <h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>My Saved Builds</h1>
            {savedBuilds.map(build => (
                <div key={build.id}>
                    <h2>Build {build.id}</h2>
                    {build.items.map(item => (
                        <div key={item.id}>{item.name} - ${item.price}</div>
                    ))}
                </div>
            ))}
        </Container>
        </Container>
    )
}

export default SavedBuildsPage;