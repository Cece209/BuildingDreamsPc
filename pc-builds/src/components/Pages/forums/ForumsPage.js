 
import { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";

import '../../../App.css';

import { getUrl, uploadData } from 'aws-amplify/storage';
import { remove } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/api';
import { ScrollView } from '@aws-amplify/ui-react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as mutations from '../../../graphql/mutations';
import { listForums } from '../../../graphql/queries';

import {v4 as uuid} from 'uuid';


function ForumsPage(){
    
    const [forums, setForums] = useState([]);
    const [forumData, setForumData] = useState({name:"", title:"", description:""});
    const [forumImage, setForumImage] = useState("");
    const [forumImagePaths, setForumImagePaths] = useState([]);
    const client = generateClient();
    
    useEffect(() => {
        const getForum = async () => {
            try {
                const forumsData = await client.graphql({ query: listForums });
                const forumsList = forumsData.data.listForums.items;
                setForums(forumsList);

                const imagePaths = await Promise.all(forumsList.map(async forum => {
                    try {
                        return await getUrl({ key: forum.forumPicturePath, options: { expires: 60 } });
                    } catch (err) {
                        console.error('Error fetching image URL:', err);
                        return '';  // Providing a default or fallback image path could be useful here
                    }
                }));

                setForumImagePaths(imagePaths);
                console.log("Forum Image Paths:", imagePaths); 
            } catch (err) {
                console.error('Error loading forums:', err);
            }
        };

        getForum();
    }, [client]);

    useEffect(() => {
        const validUrls = forumImagePaths.filter(path => path.url && typeof path.url === 'string' && !path.url.includes('favicon.io'));
        console.log('Valid URLs:', validUrls.map(path => path.url)); // log only URLs
    }, [forumImagePaths]);

    const addNewForum = async () => {
        const { name, title, description } = forumData;
        const filename = `${uuid()}.png`;

        if (!title.trim()) {
            console.error('Title content cannot be empty');
            return;
        }
        if (!name.trim()) {
            console.error('Name content cannot be empty');
            return;
        }

        try {
            await uploadData({
                key: filename,
                data: forumImage,
                options: { contentType: 'image/png' }
            });

            const newForum = {
                id: uuid(),
                name,
                title,
                description,
                forumPicturePath: filename
            };

            await client.graphql({
                query: mutations.createForum,
                variables: { input: newForum }
            });

            // Optionally update the forums list and paths locally to avoid needing to refetch
            setForums(prev => [...prev, newForum]);
            setForumImagePaths(prev => [...prev, filename]);

        } catch (error) {
            console.error('Error creating forum:', error);
        }
    };

    const deleteForum = async (forumId, forumPicturePath) => {
        try {
            // Assuming 'remove' method is to delete the picture
            await remove({ key: forumPicturePath });

            await client.graphql({
                query: mutations.deleteForum,
                variables: { input: { id: forumId } }
            });

            setForums(prevForums => prevForums.filter(forum => forum.id !== forumId));
            setForumImagePaths(prevPaths => prevPaths.filter(path => path !== forumPicturePath));
        } catch (error) {
            console.error('Error deleting forum:', error);
        }
    };
    
    

    return (
        <Container className="forumContainer">
        <Row>
        <Col className="addForumArea">
            <Row className="px-4 my-5">
                    <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Forums</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label style={{ color: 'white', textShadow: '0 0 3px black' }}>Name*</Form.Label>
                            <Form.Control type="text" placeholder="Type here" 
                                value={forumData.name} 
                                onChange={e => setForumData({ ...forumData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupTitle">
                            <Form.Label style={{ color: 'white', textShadow: '0 0 3px black' }}>Title*</Form.Label>
                            <Form.Control type="text" placeholder="Type here" 
                                value={forumData.title}  
                                onChange={e => setForumData({ ...forumData, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupDescription">
                            <Form.Label style={{ color: 'white', textShadow: '0 0 3px black' }}>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Type here" 
                                value={forumData.description}  
                                onChange={e => setForumData({ ...forumData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupImage">
                            <Form.Label style={{ color: 'white', textShadow: '0 0 3px black' }}>Image</Form.Label>
                            <Form.Control type="file" accept="image/png"   
                                onChange={e => setForumImage(e.target.files[0])}
                            />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={addNewForum}>Create Post &gt;&gt;</Button>
                    </Form>
            </Row>
            <style jsx>{`
                body {
                    background-color: #333333;
                    min-height: 100vh;
                }
            `}</style>
            </Col>
            
        
        <Col className="forumsArea">
        <ScrollView marginLeft="5%" height="100vh" width="90%"> 
            {forums.map((forum, index) => (
                
                    <Col key={forum.id} className="px-2 my-2">
                        <Card className="text-center">
                            <Card.Header as="h5">{forum.name}</Card.Header>
                            <Card.Body>
                                <Card.Img src={forumImagePaths[index]?.url} variant="top"/>
                                <Card.Title>{forum.title}</Card.Title>
                                <Card.Text>{forum.description}</Card.Text>
                                <Button variant="danger" onClick={() => deleteForum(forum.id, forum.forumPicturePath)}>Delete</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">Posted on: {new Date(forum.createdAt).toLocaleString()}</Card.Footer>
                        </Card>
                    </Col>
                
            ))}
            </ScrollView>
            <style jsx>{`
                body {
                    background-color: #333333;
                    min-height: 100vh;
                }
            `}</style>
            </Col>
            </Row>
        </Container>
    );
}

export default ForumsPage;