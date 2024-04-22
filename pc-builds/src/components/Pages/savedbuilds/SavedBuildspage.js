import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Card, Row, Col } from "react-bootstrap";
import { generateClient } from 'aws-amplify/api';
import { listBuilds, getProduct } from '../../../graphql/queries';
import { deleteBuilds } from '../../../graphql/mutations';

function SavedBuildsPage(){
    const [builds, setBuilds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentBuild, setCurrentBuild] = useState(null);
    const [productDetails, setProductDetails] = useState([]);

    const client = generateClient();

    useEffect(() => {
        const fetchBuilds = async () => {
            try {
                const { data } = await client.graphql({ query: listBuilds });
                setBuilds(data.listBuilds.items);
            } catch (error) {
                console.error('Error fetching builds:', error);
            }
        };
    
        fetchBuilds();
    }, [client]);

    useEffect(() => {
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

        if (currentBuild) {
            fetchProductDetails(currentBuild.itemsPurchased.split(','));
        }
    }, [currentBuild, client]);

    const handleDeleteBuild = async (buildId) => {
        if (!window.confirm("Are you sure you want to delete this build?")) return;
    
        try {
            const { data } = await client.graphql({
                query: deleteBuilds,
                variables: { input: { id: buildId } }
            });
            console.log('Build deleted:', data.deleteBuilds);
            alert('Build deleted successfully!');
            // Refresh the list of builds or filter out the deleted build from state
            setBuilds(builds.filter(build => build.id !== buildId));
        } catch (error) {
            console.error('Error deleting build:', error);
            alert('Failed to delete build.');
        }
    };
    

    function BuildDetailsModal({ show, onHide, build }) {
        return (
            <Modal show={show} onHide={onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{build.name} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {productDetails.map(product => (
                            <Card key={product.id} style={{ margin: '10px' }}>
                                <Card.Img variant="top" src={product.productPicturePath} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Card.Text>{product.Description}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }

    return(
        <Container>
            <Row className="px-4 my-5">
                <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Saved Builds</h1></Col>
            </Row>
            <ListGroup>
                {builds.map((build) => (
                    <ListGroup.Item key={build.id}>
                        <h5>{build.name}</h5>
                        <p>Date: {new Date(build.date).toLocaleDateString()}</p>
                        <Button variant="primary" onClick={() => {
                            setCurrentBuild(build);
                            setShowModal(true);
                        }}>View Details</Button>
                        <Button variant="danger" onClick={() => handleDeleteBuild(build.id)}>Delete Build</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {currentBuild && (
                <BuildDetailsModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    build={currentBuild}
                />
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
