import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Card, Row, Col, Form } from "react-bootstrap";
import { generateClient } from 'aws-amplify/api';
import { listBuilds, getProduct } from '../../../graphql/queries.js';
import { SearchField } from '@aws-amplify/ui-react';


function SharedBuildsPage(){

    const [sharedBuilds, setSharedBuilds] = useState([]);

    const [builds, setBuilds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBuilds, setFilteredBuilds] = useState([]);
    const [selectedBuild, setSelectedBuild] = useState(null);
    const [productDetails, setProductDetails] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const client = generateClient();
    
    useEffect(() => {
        const fetchBuilds = async () => {
            try {
                // Fetch all builds from the database
                const { data } = await client.graphql({
                    query: listBuilds,  // Use listBuilds query that fetches all builds
                });
                setSharedBuilds(data.listBuilds.items);  // Assuming the query name and response structure
            } catch (error) {
                console.error('Error fetching builds:', error);
            }
        };
    
        fetchBuilds();
    }, []);

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
    

    const handleShowDetails = (build) => {
        setSelectedBuild(build);
        setShowDetailsModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailsModal(false);
        setSelectedBuild(null);
    };

    useEffect(() => {
        const results = sharedBuilds.filter(build =>
            build.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBuilds(results);
    }, [searchTerm, sharedBuilds]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Browse Builds</h1></Col>
            </Row>
            <Row className="px-4 my-3">
            <SearchField
                    label="Search builds"
                    placeholder="Type build name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onClear={handleClearSearch}
                />
            </Row>
            {filteredBuilds.length > 0 ? (
                <ListGroup>
                    {filteredBuilds.map((build) => (
                        <Card className="mb-3" key={build.id}>
                            <Card.Body>
                                <Card.Title>{build.name}</Card.Title>
                                <Card.Text>Date: {new Date(build.date).toLocaleDateString()}</Card.Text>
                                <Button variant="primary" onClick={() => handleShowDetails(build)}>View Details</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </ListGroup>
            ) : (
                <p style={{ color: 'white' }}>No builds match your search.</p>
            )}
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


export default SharedBuildsPage;