import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Card, Row, Col } from "react-bootstrap";
import { generateClient } from 'aws-amplify/api';
import { listBuilds, getProduct } from '../../../graphql/queries.js';
import { SearchField } from '@aws-amplify/ui-react';
import { useCart } from '../../../components/Pages/cartItems/CartContext.js';
import { useNavigate } from 'react-router-dom';

function SharedBuildsPage() {
    const [sharedBuilds, setSharedBuilds] = useState([]);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBuilds, setFilteredBuilds] = useState([]);
    const [selectedBuild, setSelectedBuild] = useState(null);
    const [productDetails, setProductDetails] = useState({});
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const client = generateClient();

    useEffect(() => {
        const fetchBuilds = async () => {
            try {
                const { data } = await client.graphql({
                    query: listBuilds,
                });
                setSharedBuilds(data.listBuilds.items);
                data.listBuilds.items.forEach(build => {
                    if (build.itemsPurchased) {
                        fetchProductDetails(build.itemsPurchased.split(','), build.id);
                    }
                });
            } catch (error) {
                console.error('Error fetching builds:', error);
            }
        };
        fetchBuilds();
    }, []);

    const fetchProductDetails = async (productIds, buildId) => {
        try {
            const details = await Promise.all(productIds.map(id =>
                client.graphql({
                    query: getProduct,
                    variables: { id }
                })
            ));
            const products = details.map(detail => detail.data.getProduct);
            const totalCost = products.reduce((acc, product) => acc + parseFloat(product.price), 0);
            setProductDetails(prevDetails => ({
                ...prevDetails,
                [buildId]: { products, totalCost }
            }));
        } catch (error) {
            console.error('Error fetching product details for build ID:', buildId, error);
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

    const handleAddToCart = (buildId) => {
        const details = productDetails[buildId];
        if (details && details.products.length > 0) {
            details.products.forEach(product => {
                addToCart(product);
            });
            alert('Items added to cart!');
            navigate('/cartitems');
        } else {
            alert('Fetching product details, please try again in a moment.');
        }
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
                                <Card.Text><b>Total Cost: ${productDetails[build.id]?.totalCost.toFixed(2)}</b></Card.Text>
                                <Button variant="primary" onClick={() => handleShowDetails(build)}>View Details</Button>
                                <Button variant="success" onClick={() => handleAddToCart(build.id)}>Add Build to Cart</Button>
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
                        <Modal.Title>{selectedBuild ? selectedBuild.name : 'Build Details'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex flex-wrap">
                            {selectedBuild ? renderProductCards(productDetails[selectedBuild.id]?.products || []) : <p>Loading...</p>}
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
                    min-height: 100vh.
                }
            `}</style>
        </Container>
    );
}

export default SharedBuildsPage;
