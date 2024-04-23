import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { generateClient } from 'aws-amplify/api';
import { createMessages } from '../../../graphql/mutations';
import { listMessages } from '../../../graphql/queries';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';
import { v4 as uuid } from 'uuid';

function MessagesPage() {
    
    const [messages, setMessages] = useState([]);
    const [messageData, setMessageData] = useState({ recipientID: '', content: '' }); // Defines the messageData state
    const client = generateClient();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const session = await fetchAuthSession();
            const { accessToken } = session.tokens; // Assuming tokens are available
            
            const response = await client.graphql({
                query: listMessages,
                authToken: accessToken.jwtToken // Use the JWT token for authentication
            });
            setMessages(response.data.listMessages.items);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


    const addNewMessage = async () => {
        const { recipientID, content } = messageData;
    
        if (!content.trim()) {
            console.error('Message content cannot be empty');
            return;
        }
    
        try {
            // Fetch user session and details
            const session = await fetchAuthSession();
            const user = await getCurrentUser();
    
            // If necessary, use user attributes for something specific
            // e.g., getting a custom attribute or email for display
            const senderID = session.tokens.idToken.payload.sub;  // Unique user ID from token
            const senderEmail = user.attributes.email;  // User email from Cognito user pool
    
            const newMessage = {
                id: uuid(),
                messageID: uuid(),
                senderID,  // Or senderEmail if you want to display the email
                recipientID,
                content: content.trim(),
                timestamp: new Date().toISOString()
            };
    
            await client.graphql({
                query: createMessages,
                variables: { input: newMessage }
            });
    
            fetchMessages();  // Refresh the list of messages
            setMessageData({ recipientID: '', content: '' });  // Reset message input form
        } catch (error) {
            console.error('Error creating message:', error);
            alert('Failed to send message.');
        }
    };
    

    return (
        <Container fluid="md">
            <Row className="my-4 justify-content-center">
                <Col xs={12} md={8}>
                    <h1 className="text-center" style={{ color: 'white', textShadow: '0 0 3px black' }}>Messages</h1>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Type User Account"
                                value={messageData.recipientID}
                                onChange={(e) => setMessageData({ ...messageData, recipientID: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Message Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Type here"
                                value={messageData.content}
                                onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={addNewMessage}>Send Message</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="my-4 justify-content-center">
                <Col xs={12} md={8}>
                    <ListGroup>
                        {messages.map(message => (
                            <ListGroup.Item key={message.id}>
                                <strong>From:</strong> {message.senderID}<br />
                                <p>{message.content}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <style jsx>{`
                body {
                    background-color: #333333;
                    min-height: 100vh;
                }
            `}</style>
        </Container>
    );
}

export default MessagesPage;
