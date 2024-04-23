import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { generateClient } from 'aws-amplify/api';
import { createMessages } from '../../../graphql/mutations';
import { deleteMessages } from '../../../graphql/mutations';
import { listMessages } from '../../../graphql/queries';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';
import { v4 as uuid } from 'uuid';

function MessagesPage() {
    
    const [messages, setMessages] = useState([]);
    const [messageData, setMessageData] = useState({ senderName: '', content: '' });

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

    const fetchUserDetails = async () => {
        try {
            const session = await fetchAuthSession();
            const user = await getCurrentUser();
            const username = user.username;  // This assumes 'username' is the actual username attribute you want
            return username;
        } catch (error) {
            console.error("Failed to fetch user details:", error);
            return null;
        }
    };

    const addNewMessage = async () => {
        const { senderName, content } = messageData;
    
        if (!content.trim()) {
            console.error('Message content cannot be empty');
            return;
        }
    
        try {
            const newMessage = {
                id: uuid(),
                messageID: uuid(),
                senderID: senderName,  // Now using the sender's name directly
                content: content.trim(),
                timestamp: new Date().toISOString()
            };
    
            await client.graphql({
                query: createMessages,
                variables: { input: newMessage }
            });
    
            fetchMessages();  // Refresh the list of messages
            setMessageData({ senderName: '', content: '' });  // Reset message input form
        } catch (error) {
            console.error('Error creating message:', error);
            alert('Failed to send message.');
        }
    };
    
    
    
    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
    
        try {
            await client.graphql({
                query: deleteMessages,
                variables: { input: { id: messageId } }
            });
            setMessages(messages.filter(msg => msg.id !== messageId)); // Update state to remove the message
            alert('Message deleted successfully!');
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message.');
        }
    };
    

    return (
        <Container fluid="md">
            <Row className="my-4 justify-content-center">
                <Col xs={12} md={8}>
                    <h1 className="text-center" style={{ color: 'white', textShadow: '0 0 3px black' }}>GroupChat</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label style={{ color: 'white', textShadow: '0 0 3px black' }}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Type your name"
                                name="senderName"
                                value={messageData.senderName}
                                onChange={(e) => setMessageData({ ...messageData, senderName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: 'white', textShadow: '0 0 3px black' }}>Message Content</Form.Label>
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
                            <b>From: {message.senderID}</b><br />  {/* This now displays the name directly */}
                            {message.content}
                            <Button variant="danger" size="sm" onClick={() => handleDeleteMessage(message.id)} style={{ float: 'right' }}>
                                Delete
                            </Button>
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
