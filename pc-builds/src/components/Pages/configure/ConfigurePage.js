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
    const [selectedGPUs, setSelectedGPUs] = useState([]);

    const [showRAM, setShowRAM] = useState(false);
    const [selectedRAMs, setSelectedRAMs] = useState([]);

    const [showCase, setShowCase] = useState(false);
    const [selectedCases, setSelectedCases] = useState([]);

    const [showPSU, setShowPSU] = useState(false);
    const [selectedPSUs, setSelectedPSUs] = useState([]);

    const [showCPU, setShowCPU] = useState(false);
    const [selectedCPUs, setSelectedCPUs] = useState([]);

    const [showMOBO, setShowMOBO] = useState(false);
    const [selectedMOBOs, setSelectedMOBOs] = useState([]);

    const [showCooling, setShowCooling] = useState(false);
    const [selectedCooling, setSelectedCooling] = useState([]);

    const [showMemory, setShowMemory] = useState(false);
    const [selectedMemory, setSelectedMemory] = useState([]);

    //clear buttons functionality
    const clearGPUs = () => {
        setSelectedGPUs([]);
        setTotalPrice(prev => prev - selectedGPUs.reduce((acc, curr) => acc + parseFloat(curr.price), 0));
    };
    
    const clearRAMs = () => {
        setSelectedRAMs([]);
        setTotalPrice(prev => prev - selectedRAMs.reduce((acc, curr) => acc + parseFloat(curr.price), 0));
    };
    
    const clearCases = () => {
        setSelectedCases([]);
        setTotalPrice(prev => prev - selectedCases.reduce((acc, curr) => acc + parseFloat(curr.price), 0));
    };
    
    const clearPSUs = () => {
        setSelectedPSUs([]);
        setTotalPrice(prev => prev - selectedPSUs.reduce((acc, curr) => acc + parseFloat(curr.price), 0));
    };
    
    const clearCPUs = () => {
        setSelectedCPUs([]);
        setTotalPrice(prev => prev - selectedCPUs.reduce((acc, curr) => acc + parseFloat(curr.price), 0));
    };
    
    const clearMOBOs = () => {
        setSelectedMOBOs([]);
        setTotalPrice(prev => prev - selectedMOBOs.reduce((acc, curr) => acc + parseFloat(curr.price), 0));
    };
    
    const clearCooling = () => {
        setSelectedCooling([]);
        setTotalPrice(prev => prev - selectedCooling.reduce((acc, curr) => acc + parseFloat(curr.price), 0));
    };
    
    const clearMemory = () => {
        setSelectedMemory([]);
        setTotalPrice(prev => prev - selectedMemory.reduce((acc, curr) => acc + parseFloat(curr.price), 0));
    };
    

    const [totalPrice, setTotalPrice] = useState(0);

    const client = generateClient();

    // // Filter GPU products only
    // const gpuProducts = products.filter(product => product.partType === 'GPU');

    // // Filter RAM products only
    // const ramProducts = products.filter(product => product.partType === 'RAM');

    // // Filter Case products only
    // const caseProducts = products.filter(product => product.partType === 'Case');

    // // Filter PSU products only
    // const psuProducts = products.filter(product => product.partType === 'PSU');

    // // Filter CPU products only
    // const cpuProducts = products.filter(product => product.partType === 'CPU');

    // // Filter Motherboard products only
    // const moboProducts = products.filter(product => product.partType === 'Motherboard');

    // // Filter Cooling products only
    // const coolingProducts = products.filter(product => product.partType === 'Cooling');

    // // Filter Memory Drive products only
    // const memoryProducts = products.filter(product => product.partType === 'Memory');

    const handleAddGPU = (product) => {
        if (!selectedGPUs.find(gpu => gpu.id === product.id) && selectedGPUs.length < 2) {
            setSelectedGPUs(prev => [...prev, product]);
            setTotalPrice(prev => prev + parseFloat(product.price));
        }
    };
    
    const handleAddRAM = (product) => {
        if (!selectedRAMs.find(ram => ram.id === product.id) && selectedRAMs.length < 4) {
            setSelectedRAMs(prev => [...prev, product]);
            setTotalPrice(prev => prev + parseFloat(product.price));
        }
    };
    
    const handleAddCase = (product) => {
        if (!selectedCases.find(caseItem => caseItem.id === product.id) && selectedCases.length < 1) {
            setSelectedCases([product]);  // Clears previous and adds new one
            setTotalPrice(prev => prev + parseFloat(product.price));
        }
    };
    
    const handleAddPSU = (product) => {
        if (!selectedPSUs.find(psu => psu.id === product.id) && selectedPSUs.length < 1) {
            setSelectedPSUs([product]);  // Clears previous and adds new one
            setTotalPrice(prev => prev + parseFloat(product.price));
        }
    };
    
    const handleAddCPU = (product) => {
        if (!selectedCPUs.find(cpu => cpu.id === product.id) && selectedCPUs.length < 1) {
            setSelectedCPUs([product]);  // Clears previous and adds new one
            setTotalPrice(prev => prev + parseFloat(product.price));
        }
    };
    
    const handleAddMOBO = (product) => {
        if (!selectedMOBOs.find(mobo => mobo.id === product.id) && selectedMOBOs.length < 2) {
            setSelectedMOBOs(prev => [...prev, product]);
            setTotalPrice(prev => prev + parseFloat(product.price));
        }
    };
    
    const handleAddCooling = (product) => {
        if (!selectedCooling.find(cooling => cooling.id === product.id) && selectedCooling.length < 3) {
            setSelectedCooling(prev => [...prev, product]);
            setTotalPrice(prev => prev + parseFloat(product.price));
        }
    };
    
    const handleAddMemory = (product) => {
        if (!selectedMemory.find(memory => memory.id === product.id) && selectedMemory.length < 6) {
            setSelectedMemory(prev => [...prev, product]);
            setTotalPrice(prev => prev + parseFloat(product.price));
        }
    };
    
    
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
                    <Button variant="dark" onClick={() => setShowGPU(true)}>Configure</Button>
                    <Button variant="danger" onClick={clearGPUs} style={{ marginLeft: '10px' }}>Clear</Button>
                    <div className="GPUArea">
                    {selectedGPUs.length > 0 ? (
                        <ul>{selectedGPUs.map(gpu => <li key={gpu.id}>{gpu.name}</li>)}</ul>
                    ) : "No GPUs selected"}
                    </div>
                        </div>
                    <div className="partDiv">
                    {/* RAM */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>RAM (up to four)</h6></Col>
                        <Button variant="dark" onClick={() => setShowRAM(true)}>Configure</Button>
                        <Button variant="danger" onClick={clearRAMs} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="RAMArea">
                    {selectedRAMs.length > 0 ? (
                        <ul>{selectedRAMs.map(ram => <li key={ram.id}>{ram.name}</li>)}</ul>
                    ) : "No RAMs selected"}
                    </div>
                    </div>
                    <div className="partDiv">
                    {/* Case */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Case</h6></Col>
                        <Button variant="dark" onClick={() => setShowCase(true)}>Configure</Button>
                        <Button variant="danger" onClick={clearCases} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="CaseArea">
                    {selectedCases.length > 0 ? (
                        <ul>{selectedCases.map(c => <li key={c.id}>{c.name}</li>)}</ul>
                    ) : "No Cases selected"}
                    </div>
                    </div>
                    <div className="partDiv">
                    {/* PSU */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>PSU</h6></Col>
                        <Button variant="dark" onClick={() => setShowPSU(true)}>Configure</Button>
                        <Button variant="danger" onClick={clearPSUs} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="PSUArea">
                    {selectedPSUs.length > 0 ? (
                        <ul>{selectedPSUs.map(psu => <li key={psu.id}>{psu.name}</li>)}</ul>
                    ) : "No PSUs selected"}
                    </div>
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
                        <Button variant="dark" onClick={() => setShowCPU(true)}>Configure</Button>
                        <Button variant="danger" onClick={clearCPUs} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="CPUArea">
                        {selectedCPUs.length > 0 ? (
                            <ul>{selectedCPUs.map(cpu => <li key={cpu.id}>{cpu.name}</li>)}</ul>
                        ) : "No CPUs selected"}
                        </div>
                    </div>
                    <div className="partDiv">
                    {/* Motherboard */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Motherboard</h6></Col>
                        <Button variant="dark" onClick={() => setShowMOBO(true)}>Configure</Button>
                        <Button variant="danger" onClick={clearMOBOs} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="MOBOArea">
                        {selectedMOBOs.length > 0 ? (
                            <ul>{selectedMOBOs.map(mobo => <li key={mobo.id}>{mobo.name}</li>)}</ul>
                        ) : "No Motherboards selected"}
                        </div>
                    </div>
                    <div className="partDiv">
                    {/* Cooling */}
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Cooling System</h6></Col>
                    <Button variant="dark" onClick={() => setShowCooling(true)}>Configure</Button>
                    <Button variant="danger" onClick={clearCooling} style={{ marginLeft: '10px' }}>Clear</Button>
                    <div className="CoolArea">
                        {selectedCooling.length > 0 ? (
                            <ul>{selectedCooling.map(cool => <li key={cool.id}>{cool.name}</li>)}</ul>
                        ) : "No Cooling Systems selected"}
                        </div>
                    </div>
                    <div className="partDiv">
                    {/* Memory Drives */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Memory Drives (up to 6)</h6></Col>
                        <Button variant="dark" onClick={() => setShowMemory(true)}>Configure</Button>
                        <Button variant="danger" onClick={clearMemory} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="MemArea">
                        {selectedMemory.length > 0 ? (
                            <ul>{selectedMemory.map(memory => <li key={memory.id}>{memory.name}</li>)}</ul>
                        ) : "No Memory Drives selected"}
                        </div>
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
                        {products.filter(product => product.partType === 'GPU').map(product => (
                            <Card key={product.id} style={{ margin: '10px' }}>
                                <Card.Img variant="top" src={product.productPicturePath} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Button variant="primary" onClick={() => handleAddGPU(product)}>Add to Build</Button>
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
                        {products.filter(product => product.partType === 'RAM').map(product => (
                            <Card key={product.id} style={{ margin: '10px' }}>
                                <Card.Img variant="top" src={product.productPicturePath} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Button variant="primary" onClick={() => handleAddRAM(product)}>Add to Build</Button>
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
                        {products.filter(product => product.partType === 'Case').map(product => (
                            <Card key={product.id} style={{ margin: '10px' }}>
                                <Card.Img variant="top" src={product.productPicturePath} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Button variant="primary" onClick={() => handleAddCase(product)}>Add to Build</Button>
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
                {products.filter(product => product.partType === 'PSU').map(product => (
                    <Card key={product.id} style={{ margin: '10px' }}>
                        <Card.Img variant="top" src={product.productPicturePath} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Price: ${product.price}</Card.Text>
                            <Button variant="primary" onClick={() => handleAddPSU(product)}>Add to Build</Button>
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
                {products.filter(product => product.partType === 'CPU').map(product => (
                    <Card key={product.id} style={{ margin: '10px' }}>
                        <Card.Img variant="top" src={product.productPicturePath} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Price: ${product.price}</Card.Text>
                            <Button variant="primary" onClick={() => handleAddCPU(product)}>Add to Build</Button>
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
                {products.filter(product => product.partType === 'Motherboard').map(product => (
                    <Card key={product.id} style={{ margin: '10px' }}>
                        <Card.Img variant="top" src={product.productPicturePath} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Price: ${product.price}</Card.Text>
                            <Button variant="primary" onClick={() => handleAddMOBO(product)}>Add to Build</Button>
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
                {products.filter(product => product.partType === 'Cooling').map(product => (
                    <Card key={product.id} style={{ margin: '10px' }}>
                        <Card.Img variant="top" src={product.productPicturePath} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Price: ${product.price}</Card.Text>
                            <Button variant="primary" onClick={() => handleAddCooling(product)}>Add to Build</Button>
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
                {products.filter(product => product.partType === 'Memory').map(product => (
                    <Card key={product.id} style={{ margin: '10px' }}>
                        <Card.Img variant="top" src={product.productPicturePath} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Price: ${product.price}</Card.Text>
                            <Button variant="primary" onClick={() => handleAddMemory(product)}>Add to Build</Button>
                        </Card.Body>
                    </Card>
                ))}
            </Modal.Body>
        </Modal>
        {/* Total price */}
        <Container>
        <Row className="justify-content-center">
            <Col md={12} className="text-center">
                <h4 style={{color: 'white', textShadow: '0 0 3px black'}}>Total Price: ${totalPrice.toFixed(2)}</h4>
            </Col>
        </Row>
    </Container>
        </Container>
        
    );
}

export default ConfigurePage;