import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Card, Row, Col } from "react-bootstrap";
import { generateClient } from 'aws-amplify/api';
import { listBuilds, getProduct } from '../../../graphql/queries.js';
import { SearchField } from '@aws-amplify/ui-react';
import { useCart } from '../../../components/Pages/cartItems/CartContext.js';
import { useNavigate } from 'react-router-dom';


function SharedBuildsPage(){

    const [sharedBuilds, setSharedBuilds] = useState([]);

    const { addToCart } = useCart();
    const [builds, setBuilds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBuilds, setFilteredBuilds] = useState([]);
    const [selectedBuild, setSelectedBuild] = useState(null);
    const [productDetails, setProductDetails] = useState({});
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const navigate = useNavigate();
   

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
        if (selectedBuild && !productDetails[selectedBuild.id]) {
            fetchProductDetails(selectedBuild.itemsPurchased.split(','));
        }
    }, [selectedBuild, client]);

    const fetchProductDetails = async (productIds) => {
        if (!productIds) return; // Prevent fetching if there are no product IDs
    
        try {
            const details = await Promise.all(productIds.map(id =>
                client.graphql({
                    query: getProduct,
                    variables: { id }
                })
            ));
            // Only set product details if selectedBuild is still valid
            if (selectedBuild) {
                setProductDetails(prevDetails => ({
                    ...prevDetails,
                    [selectedBuild.id]: details.map(detail => detail.data.getProduct)
                }));
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            // Handle the error case by setting an empty array for this build ID
            if (selectedBuild) {
                setProductDetails(prevDetails => ({
                    ...prevDetails,
                    [selectedBuild.id]: []
                }));
            }
        }
    };
    
    

    const renderProductCards = (products) => {
        // Check if products is an array before trying to map over it
        return Array.isArray(products) ? products.map(product => (
            <Card key={product.id} className="mb-2">
                <Card.Img variant="top" src={product.productPicturePath} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                </Card.Body>
            </Card>
        )) : <p>No products found.</p>;
    };
    
    const handleShowDetails = (build) => {
        setSelectedBuild(build);
        if (build && !productDetails[build.id]) {
            fetchProductDetails(build.itemsPurchased.split(','));
        }
        setShowDetailsModal(true);
    };
    

    const handleCloseModal = () => {
        setShowDetailsModal(false);
        setSelectedBuild(null);
    };

    const handleAddToCart = (buildId) => {
        const details = productDetails[buildId];
        if (details && details.length > 0) {
            details.forEach(product => {
                addToCart(product);
            });
            alert('Items added to cart!');
            navigate('/cartitems'); // Change this to the path of your cart page
        } else {
            alert('Fetching product details, please try again in a moment.');
            const build = sharedBuilds.find(b => b.id === buildId);
            if (build) {
                setSelectedBuild(build);
                fetchProductDetails(build.itemsPurchased.split(','));
            }
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
                    style={{ color: 'white', textShadow: '0 0 3px black' }}
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
                            {selectedBuild ? renderProductCards(productDetails[selectedBuild.id] || []) : <p>Loading...</p>}
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