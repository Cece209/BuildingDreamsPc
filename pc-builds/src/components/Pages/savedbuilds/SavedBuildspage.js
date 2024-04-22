import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Card, Row, Col } from "react-bootstrap";
import { generateClient } from 'aws-amplify/api';
import { listBuilds, getProduct } from '../../../graphql/queries';
import { deleteBuilds } from '../../../graphql/mutations';

import { getCurrentUser } from 'aws-amplify/auth';

function SavedBuildsPage(){
    
    const [builds, setBuilds] = useState([]);
    const [selectedBuild, setSelectedBuild] = useState(null);
    const [productDetails, setProductDetails] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const client = generateClient();

    useEffect(() => {
        const fetchBuilds = async () => {
            try {
                const user = await getCurrentUser();
                const userId = user.username; // Or user.attributes.sub for the Cognito user pool sub ID

                const { data } = await client.graphql({ 
                    query: listBuilds,
                    variables: { filter: { ownerID: { eq: userId } } } // Assuming you have an ownerID in your schema
                });
                setBuilds(data.listBuilds.items);
            } catch (error) {
                console.error('Error fetching builds:', error);
            }
        };

        fetchBuilds();
    }, [client]);

    useEffect(() => {
        if (selectedBuild) {
            const productIds = selectedBuild.itemsPurchased.split(',');
            fetchProductDetails(productIds);
        }
    }, [selectedBuild, client]);

    const fetchProductDetails = async (productIds) => {
        try {
            const details = await Promise.all(productIds.map(id =>
                client.graphql({
                    query: getProduct,
                    variables: { id }
                })
            ));
            setProductDetails(details.map(detail => detail.data.getProduct));
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleDeleteBuild = async (buildId) => {
        if (!window.confirm("Are you sure you want to delete this build?")) return;
    
        try {
            const { data } = await client.graphql({
                query: deleteBuilds,
                variables: { input: { id: buildId } }
            });
            setBuilds(builds.filter(build => build.id !== buildId));
            alert('Build deleted successfully!');
        } catch (error) {
            console.error('Error deleting build:', error);
            alert('Failed to delete build.');
        }
    };

    const handleShowDetails = (build) => {
        setSelectedBuild(build);
        setShowDetailsModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailsModal(false);
        setSelectedBuild(null);
    };

    const renderProductCards = (products) => {
        return products.map(product => (
            <Card key={product.id} className="mb-2">
                <Card.Img variant="top" src={product.productPicturePath} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                </Card.Body>
            </Card>
        ));
    };
    


    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Saved Builds</h1></Col>
            </Row>
            <ListGroup>
                {builds.map((build) => (
                    <ListGroup.Item key={build.id}>
                        <h5>{build.name}</h5>
                        <p>Date: {new Date(build.date).toLocaleDateString()}</p>
                        <Button variant="primary" onClick={() => handleShowDetails(build)}>View Details</Button>
                        <Button variant="danger" onClick={() => handleDeleteBuild(build.id)}>Delete Build</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {showDetailsModal && selectedBuild && (
                <Modal show={showDetailsModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedBuild.name} Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex flex-wrap">
                            {renderProductCards(productDetails)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
             <style jsx>{`
                body {
                    background-color: #333333;
                    min-height: 100vh;
                }
            `}</style>
        </Container>
    );
}

export default SavedBuildsPage;