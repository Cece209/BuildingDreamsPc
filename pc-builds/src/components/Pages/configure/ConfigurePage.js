import { React, useState, useEffect } from 'react';

import { Container, Button, Modal, Row, Col, Card } from "react-bootstrap";
import '../../../App.css';
//import { SearchField } from '@aws-amplify/ui-react';
import { ScrollView } from '@aws-amplify/ui-react';

import { generateClient } from 'aws-amplify/api';
import { listProducts } from '../../../graphql/queries';

function ConfigurePage(){

    const [products, setProducts] = useState([]);
    // const [productData, setProductData] = useState({partType:"", name:"", price:""});
    
    const [showGPU, setShowGPU] = useState(false);
    const [showRAM, setShowRAM] = useState(false);
    const [showCase, setShowCase] = useState(false);
    const [showPSU, setShowPSU] = useState(false);
    const [showCPU, setShowCPU] = useState(false);
    const [showMOBO, setShowMOBO] = useState(false);
    const [showCooling, setShowCooling] = useState(false);
    const [showMemory, setShowMemory] = useState(false);
    
    const client = generateClient();

    // Filter GPU products only
    const gpuProducts = products.filter(product => product.partType === 'GPU');

    // Filter RAM products only
    const ramProducts = products.filter(product => product.partType === 'RAM');

    // Filter Case products only
    const caseProducts = products.filter(product => product.partType === 'Case');

    // Filter PSU products only
    const psuProducts = products.filter(product => product.partType === 'PSU');

    // Filter CPU products only
    const cpuProducts = products.filter(product => product.partType === 'CPU');

    // Filter Motherboard products only
    const moboProducts = products.filter(product => product.partType === 'Motherboard');

    // Filter Cooling products only
    const coolingProducts = products.filter(product => product.partType === 'Cooling');

    // Filter Memory Drive products only
    const memoryProducts = products.filter(product => product.partType === 'Memory');


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
    }, []);


    return(
       
        <Container>
             <Row className="px-1 my-3">
             <Col className="text-center"><h3 style={{color: 'white', textShadow: '0 0 3px black'}}>Configure Builds</h3></Col>
                </Row>
            <style>
                {`
                    body {
                        background-color: #333333;
                        min-height: 100vh;
                    }
                `}
            </style>
            <Row>
            <Container>
            <div className="ConfContainer">
                <ScrollView width="30%" height="500px" borderRadius="10px">
                <div className="ConfLeft-column">
                    {/* GPU */}
                    <div className="partDiv"> 
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>GPU (up to two)</h6></Col>
                    <Button variant="dark" onClick={() => setShowGPU(true)}>Configure GPU</Button>
                    <div className="GPUArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* RAM */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>RAM (up to four)</h6></Col>
                        <Button variant="dark" onClick={() => setShowRAM(true)}>Configure RAM</Button>
                    <div className="RAMArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* Case */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Case</h6></Col>
                        <Button variant="dark" onClick={() => setShowCase(true)}>Configure Case</Button>
                    <div className="CaseArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* PSU */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>PSU</h6></Col>
                        <Button variant="dark" onClick={() => setShowPSU(true)}>Configure PSU</Button>
                    <div className="PSUArea">Text go here</div>
                    </div>
                </div>
                {/* Middle picture column */}
                </ScrollView>
                <div className="ConfMiddle-column">
                    <img src="/img/PCSilh-removebg-preview.png"/>
                </div>
                <ScrollView width="30%" height="500px" borderRadius="10px">
                <div className="ConfRight-column">
                    <div className="partDiv">
                        {/* CPU */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>CPU</h6></Col>
                        <Button variant="dark" onClick={() => setShowCPU(true)}>Configure CPU</Button>
                    <div className="CPUArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* Motherboard */}
                            <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Motherboard</h6></Col>
                            <Button variant="dark" onClick={() => setShowMOBO(true)}>Configure Motherboard</Button>
                    <div className="MOBOArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* Cooling */}
                   <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Cooling System</h6></Col>
                   <Button variant="dark" onClick={() => setShowCooling(true)}>Configure Cooling System</Button>
                    <div className="CoolArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* Memory Drives */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Memory Drives (up to 6)</h6></Col>
                        <Button variant="dark" onClick={() => setShowMemory(true)}>Configure Memory Drives</Button>
                    <div className="MemArea">Text go here</div>
                    </div>
                </div>
                </ScrollView>
            </div>
            </Container>
            </Row>
            {/* cart items section */}
            <Container>
            <div>
            <Col><Button variant="primary">Add item(s) to cart</Button></Col>
            </div>
            </Container>
                {/* GPU Modal */}
                <Modal show={showGPU} onHide={() => setShowGPU(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available GPUs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {gpuProducts.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary">Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* RAM Modal */}
            <Modal show={showRAM} onHide={() => setShowRAM(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available RAM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ramProducts.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary">Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* Case Modal */}
            <Modal show={showCase} onHide={() => setShowCase(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available Cases</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {caseProducts.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary">Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* PSU Modal */}
            <Modal show={showPSU} onHide={() => setShowPSU(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available PSUs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {psuProducts.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary">Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* CPU Modal */}
            <Modal show={showCPU} onHide={() => setShowCPU(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available CPUs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cpuProducts.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary">Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* Motherboard Modal */}
            <Modal show={showMOBO} onHide={() => setShowMOBO(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available Motherboards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {moboProducts.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary">Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* Cooling Modal */}
            <Modal show={showCooling} onHide={() => setShowCooling(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available Cooling Systems</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {coolingProducts.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary">Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* Memory Drives Modal */}
            <Modal show={showMemory} onHide={() => setShowMemory(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available Memory Drives</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {memoryProducts.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary">Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
        </Container>
        
    );
}

export default ConfigurePage;