import { React, useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { generateClient } from 'aws-amplify/api';
import { listBuilds } from '../../../graphql/queries';
//import { useCart } from '../../../components/Pages/cartItems/CartContext.js';

function SavedBuildsPage(){

    //const { savedBuilds } = useCart();

    const [builds, setBuilds] = useState([]);

    const client = generateClient();

    useEffect(() => {
        const fetchBuilds = async () => {
            try {
                const { data } = await client.graphql({
                    query: listBuilds
                });
                setBuilds(data.listBuilds.items);
            } catch (error) {
                console.error('Error fetching builds:', error);
            }
        };
    
        fetchBuilds();
    }, [client]);

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
        <h1>Saved Builds</h1>
        {builds.map((build) => (
            <div key={build.id}>
                <h2>{build.name}</h2>
                <p>Date: {build.date}</p>
                <ul>
                    {build.Products.items.map((product) => (
                        <li key={product.id}>{product.name} - ${product.price}</li>
                    ))}
                </ul>
            </div>
        ))}
    </Container>
        </Container>
    )
}

export default SavedBuildsPage;