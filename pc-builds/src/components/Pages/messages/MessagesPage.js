import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { generateClient } from 'aws-amplify/api';
import { createMessages } from '../../../graphql/mutations';
import { listMessages } from '../../../graphql/queries';
import { v4 as uuid } from 'uuid';

function MessagesPage() {
    const [messageData, setMessageData] = useState({ recipientID: '', content: '' });
    const [messages, setMessages] = useState([]);
    const client = generateClient();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await client.graphql({ query: listMessages });
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
            // Replace this section with your logic to get the sender ID
            const senderID = 'Replace with sender ID logic';
    
            const newMessage = {
                id: uuid(),
                messageID: uuid(), // Assuming messageID is similar to ID
                senderID,
                recipientID,
                content: content.trim(),
                timestamp: new Date().toISOString() // Assuming timestamp is required
            };
    
            console.log('New Message:', newMessage);
    
            // Set the message data before making the GraphQL mutation call
            setMessageData({ recipientID: '', content: '' });
    
            const mutationVariables = { input: newMessage };
            console.log("Mutation Variables:", mutationVariables); // Log the mutation variables
    
            await client.graphql({ mutation: createMessages, variables: mutationVariables });
    
            fetchMessages();
    
        } catch (error) {
            console.error('Error creating message:', error);
        }
    };
    

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Messages</h1></Col>
            </Row>
            <Row className="px-4 my-5">
                <Col sm={6}>
                    <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Add New Message</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupRecipientID">
                            <Form.Label style={{ color: 'white', textShadow: '0 0 3px black' }}>To</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Type User Account"
                                name="recipientID"
                                value={messageData.recipientID}
                                onChange={(e) => setMessageData({ ...messageData, recipientID: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupContent">
                            <Form.Label style={{ color: 'white', textShadow: '0 0 3px black' }}>Message Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Type here"
                                name="content"
                                value={messageData.content}
                                onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={addNewMessage}>Send Message &gt;&gt;</Button>
                    </Form>
                </Col>
                <Col sm={6}>
                    <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Received Messages</h2>
                    <ListGroup>
                        {messages.map(message => (
                            <ListGroup.Item key={message.id}>
                                <b>From: {message.senderID}</b><br />
                                {message.content}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

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

export default MessagesPage;
