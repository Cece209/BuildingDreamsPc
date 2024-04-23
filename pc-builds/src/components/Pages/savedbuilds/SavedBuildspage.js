import React, { useState, useEffect, useRef } from 'react';
import { Container, ListGroup, Button, Modal, Card, Row, Col } from "react-bootstrap";
import { generateClient } from 'aws-amplify/api';
import { listBuilds, getProduct } from '../../../graphql/queries';
import { deleteBuilds } from '../../../graphql/mutations';

import { getCurrentUser } from 'aws-amplify/auth';
import { useCart } from '../../../components/Pages/cartItems/CartContext.js';
import { useNavigate } from 'react-router-dom';

function SavedBuildsPage() {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [builds, setBuilds] = useState([]);
    const [productsDetails, setProductsDetails] = useState({});
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedBuild, setSelectedBuild] = useState(null);
    const productsFetched = useRef(false); // This ref will track if product details have been fetched

    const client = generateClient();

    useEffect(() => {
        const fetchBuilds = async () => {
            try {
                const user = await getCurrentUser();
                const userId = user.username;
                const { data } = await client.graphql({
                    query: listBuilds,
                    variables: { filter: { ownerID: { eq: userId } } }
                });
                setBuilds(data.listBuilds.items);
            } catch (error) {
                console.error('Error fetching builds:', error);
            }
        };
        fetchBuilds();
    }, [client]);

    useEffect(() => {
        if (builds.length > 0 && !productsFetched.current) {
            fetchAllProductDetails(builds);
            productsFetched.current = true; // Mark as fetched
        }
    }, [builds]); // Only re-run this effect if 'builds' changes

    const fetchAllProductDetails = async (builds) => {
        const detailsMap = {};
        for (let build of builds) {
            const productIds = build.itemsPurchased.split(',');
            const details = await Promise.all(productIds.map(id =>
                client.graphql({
                    query: getProduct,
                    variables: { id }
                })
            ));
            const products = details.map(detail => detail.data.getProduct);
            const totalCost = products.reduce((acc, product) => acc + parseFloat(product.price), 0);
            detailsMap[build.id] = { products, totalCost };
        }
        setProductsDetails(detailsMap);
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

    const handleAddToCart = (buildId) => {
        const details = productsDetails[buildId];
        if (details && details.products) {
            details.products.forEach(product => {
                addToCart(product);
            });
            alert('Items added to cart!');
            navigate('/cartitems');
        } else {
            alert('No products details available.');
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
                <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Your Saved Builds</h1></Col>
            </Row>
            <ListGroup>
                {builds.map((build) => (
                    <ListGroup.Item key={build.id}>
                        <h5>{build.name}</h5>
                        <p>Date: {new Date(build.date).toLocaleDateString()}</p>
                        <p><b>Total Cost: ${productsDetails[build.id]?.totalCost.toFixed(2)}</b></p>
                        <Button variant="primary" onClick={() => handleShowDetails(build)}>View Details</Button>
                        <Button variant="danger" onClick={() => handleDeleteBuild(build.id)}>Delete Build</Button>
                        <Button variant="success" onClick={() => handleAddToCart(build.id)}>Add Build to Cart</Button>
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
                            {renderProductCards(productsDetails[selectedBuild.id]?.products || [])}
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
