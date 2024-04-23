import { React, useState, useEffect } from 'react';
import { Container, Button, Row, Col, Card, Form, Alert} from "react-bootstrap";
import { useCart } from '../../../components/Pages/cartItems/CartContext.js';
import { generateClient } from 'aws-amplify/api';
import { listProducts } from '../../../graphql/queries';

function CartItemsPage() {
    const { cartItems, clearCart } = useCart();

    const [validated, setValidated] = useState(false);
    
    const [setProducts] = useState([]);
    const client = generateClient();
    const [showClearAlert, setShowClearAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleCheckout = (event) => {
        event.preventDefault(); // Prevent the form from submitting by default
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
            
        } else {
            clearCart();
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Alert disappears after 3 seconds
        }
        
        setValidated(true); // This will trigger Bootstrap's validation feedback

    };
    
    const handleClearCart = () => {
        clearCart();
        setShowClearAlert(true);
        setTimeout(() => setShowClearAlert(false), 3000); // Alert disappears after 3 seconds
    };
    

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await client.graphql({
                    query: listProducts
                });
                setProducts(productData.data.listProducts.items);
            } catch (err) {
                console.log('error fetching products', err);
            }
        };

        fetchProducts();
    }, [client]);

    return (
        <Container>
            {showAlert && (
                <Alert variant="success">
                    Purchase was successful! Thank you for your order.
                </Alert>
            )}
            {showClearAlert && 
            <Alert variant="warning">
                Cleared items out of cart.
                </Alert>
                }
            <Row className="px-4 my-5">
                <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Shopping Cart</h1></Col>
            </Row>
            <div>
      {cartItems.length > 0 ? (
        // Chunk the cartItems into groups of three for each row
        cartItems.reduce((acc, curr, idx) => {
          const index = Math.floor(idx / 3); // Determine which row the current item should go into
          if (!acc[index]) {
            acc[index] = []; // Initialize a new row if not yet created
          }
          acc[index].push(curr); // Add the current item to the appropriate row
          return acc;
        }, []).map((row, rowIndex) => (
          <Row key={rowIndex} className="mb-4">
            {row.map((item) => (
              <Col key={item.id} sm={4}>
                <Card>
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={item.productPicturePath}
                      style={{ width: '60%', height: 'auto' }}
                    />
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ))
      ) : (
        <p style={{ color: 'white' }}>No items in the cart.</p>
      )}
    </div>
    <Form noValidate validated={validated} onSubmit={handleCheckout}>
    
             {/* Credit Card Information */}
             <h4 className="my-3" style={{ color: 'white' }}>Payment Information</h4>
                <Form.Group className="mb-3" controlId="formGridCardNumber">
                    <Form.Label style={{ color: 'white' }}>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Card Number" required />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridExpiry">
                        <Form.Label style={{ color: 'white' }}>Expiration Date</Form.Label>
                        <Form.Control type="text" placeholder="MM/YY" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCVV">
                        <Form.Label style={{ color: 'white' }}>CVV</Form.Label>
                        <Form.Control type="text" placeholder="CVV" required />
                    </Form.Group>

                    <h4 className="my-3" style={{ color: 'white' }}>Your Information</h4>
            
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label style={{ color: 'white' }}>Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name" required />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label style={{ color: 'white' }}>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label style={{ color: 'white' }}>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label style={{ color: 'white' }}>City</Form.Label>
                        <Form.Control required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label style={{ color: 'white' }}>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." required>
                        <option>Choose...</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label style={{ color: 'white' }}>Zip</Form.Label>
                        <Form.Control required />
                    </Form.Group>
                </Row>

                <h4 style={{ color: 'white' }}>Total Price: ${totalPrice.toFixed(2)}</h4>
                <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
                <Button variant="danger" onClick={handleClearCart}>Clear Cart</Button>
                <br></br>
                
                
            </Form>
            <style>
                {`
                    body {
                        background-color: #333333;
                        min-height: 100vh;
                    }
                `}
            </style>
        </Container>
    );
}

export default CartItemsPage;
