import { React, useState, useEffect } from 'react';

import { Container, Button, Modal, Row, Col, Card, Form } from "react-bootstrap";
import '../../../App.css';
import { SearchField } from '@aws-amplify/ui-react';
import { ScrollView } from '@aws-amplify/ui-react';

import { useCart } from '../../../components/Pages/cartItems/CartContext.js';
import { useNavigate } from 'react-router-dom';

import { generateClient } from 'aws-amplify/api';
import { listProducts } from '../../../graphql/queries';
import { createBuilds } from '../../../graphql/mutations';

import { getCurrentUser } from 'aws-amplify/auth';



function ConfigurePage(){

    const [currentImage, setCurrentImage] = useState('/img/PCSilh-removebg-preview.png'); // Default image path

    const [products, setProducts] = useState([]);
    // const [productData, setProductData] = useState({partType:"", name:"", price:""});

    //const variables for showing product parts and selected parts
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
    
    //cart item linking
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        // Adding all selected items from different categories to the cart
        selectedGPUs.forEach(item => addToCart(item));
        selectedRAMs.forEach(item => addToCart(item));
        selectedCases.forEach(item => addToCart(item));
        selectedPSUs.forEach(item => addToCart(item));
        selectedCPUs.forEach(item => addToCart(item));
        selectedMOBOs.forEach(item => addToCart(item));
        selectedCooling.forEach(item => addToCart(item));
        selectedMemory.forEach(item => addToCart(item));
    
        navigate('/cartitems'); 
        alert('Added to cart!'); // Simple feedback
    };

    //total price var
    const [totalPrice, setTotalPrice] = useState(0);

    const client = generateClient();

    //handles the addition of products by user and sets constraints
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
        if (!selectedMOBOs.find(mobo => mobo.id === product.id) && selectedMOBOs.length < 1) {
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

    //handle mouse hover
    const handleMouseEnter = (imageUrl, partType) => {
        setCurrentImage(imageUrl);
        setCurrentPartInfo(partInfo[partType] || { title: "", description: "No information available" });
    };
    
    const handleMouseLeave = () => {
        setCurrentImage('/img/PCSilh-removebg-preview.png');
        setCurrentPartInfo({ title: "", description: "No information available" });
        
    };
    
    //SEARCH FIELD STUFF
    // State for search terms
    const [searchTermGPU, setSearchTermGPU] = useState('');
    const [searchTermRAM, setSearchTermRAM] = useState('');
    const [searchTermCase, setSearchTermCase] = useState('');
    const [searchTermPSU, setSearchTermPSU] = useState('');
    const [searchTermCPU, setSearchTermCPU] = useState('');
    const [searchTermMOBO, setSearchTermMOBO] = useState('');
    const [searchTermCooling, setSearchTermCooling] = useState('');
    const [searchTermMemory, setSearchTermMemory] = useState('');

    // State for filtered products
    const [filteredGPUs, setFilteredGPUs] = useState([]);
    const [filteredRAMs, setFilteredRAMs] = useState([]);
    const [filteredCases, setFilteredCases] = useState([]);
    const [filteredPSUs, setFilteredPSUs] = useState([]);
    const [filteredCPUs, setFilteredCPUs] = useState([]);
    const [filteredMOBOs, setFilteredMOBOs] = useState([]);
    const [filteredCooling, setFilteredCooling] = useState([]);
    const [filteredMemory, setFilteredMemory] = useState([]);

        

    // Handlers for search input changes
    const handleSearchChangeGPU = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTermGPU(searchTerm);
        setFilteredGPUs(products.filter(product => product.partType === 'GPU' && product.name.toLowerCase().includes(searchTerm)));
    };

    const handleSearchChangeRAM = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTermRAM(searchTerm);
        setFilteredRAMs(products.filter(product => product.partType === 'RAM' && product.name.toLowerCase().includes(searchTerm)));
    };

    const handleSearchChangeCase = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTermCase(searchTerm);
        setFilteredCases(products.filter(product => product.partType === 'Case' && product.name.toLowerCase().includes(searchTerm)));
    };

    const handleSearchChangePSU = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTermPSU(searchTerm);
        setFilteredPSUs(products.filter(product => product.partType === 'PSU' && product.name.toLowerCase().includes(searchTerm)));
    };

    const handleSearchChangeCPU = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTermCPU(searchTerm);
        setFilteredCPUs(products.filter(product => product.partType === 'CPU' && product.name.toLowerCase().includes(searchTerm)));
    };

    const handleSearchChangeMOBO = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTermMOBO(searchTerm);
        setFilteredMOBOs(products.filter(product => product.partType === 'Motherboard' && product.name.toLowerCase().includes(searchTerm)));
    };

    const handleSearchChangeCooling = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTermCooling(searchTerm);
        setFilteredCooling(products.filter(product => product.partType === 'Cooling' && product.name.toLowerCase().includes(searchTerm)));
    };
    
    const handleSearchChangeMemory = (event) => {
        const newSearchTerm = event.target.value.toLowerCase();
        setSearchTermMemory(newSearchTerm);
        setFilteredMemory(products.filter(product => product.partType === 'Memory' && product.name.toLowerCase().includes(newSearchTerm)
        ));
    };

    //Part info handling

    const partInfo = {
        GPU: {
            title: "Graphics Processing Unit (GPU)",
            description: "Responsible for rendering images, video, and animations. It's essential for gaming, video editing, and other graphics-intensive tasks."
        },
        RAM: {
            title: "Random Access Memory (RAM)",
            description: "Vital for multitasking and speed, RAM is the short-term memory that your computer uses to run active apps and tasks."
        },
        Case: {
            title: "Computer Case",
            description: "The case houses all of the computer's hardware components. It provides protection and contributes to the system's airflow and cooling."
        },
        PSU: {
            title: "Power Supply Unit (PSU)",
            description: "Supplies power to the computer. It converts the AC power from the outlet into the lower voltages of DC power needed to power all the components of the computer."
        },
        CPU: {
            title: "Central Processing Unit (CPU)",
            description: "Often considered the 'brain' of the computer, it handles all instructions it receives from hardware and software running on the computer."
        },
        MOBO: {
            title: "Motherboard",
            description: "The main printed circuit board (PCB) in a computer. It is the central communication backbone connectivity point, through which all components and external peripherals connect."
        },
        Cooling: {
            title: "Cooling Systems",
            description: "Essential to keep the computer's hardware at a manageable temperature. It ensures that components aren't overheated and operate within safe temperature limits."
        },
        Memory: {
            title: "Memory Drives",
            description: "Devices that store digital data in your computer. Includes SSDs (solid-state drives) and HDDs (hard disk drives) used for storing permanent data and system files."
        }
    };
    
    
    const [currentPartInfo, setCurrentPartInfo] = useState({ title: "", description: "" });
  
    //Handling saved builds

    const [buildName, setBuildName] = useState('');
    const [showSaveModal, setShowSaveModal] = useState(false);


    
    const handleSaveBuild = async () => {
        try {
            const user = await getCurrentUser();  // Get the current authenticated user
            const userId = user.username;  // Or use `user.attributes.sub` for the unique user ID
    
            const selectedProductIds = [selectedGPUs, selectedRAMs, selectedCases, selectedPSUs, selectedCPUs, selectedMOBOs, selectedCooling, selectedMemory]
                .flat()
                .map(product => product.id)
                .join(',');
    
            const buildDetails = {
                name: buildName,
                date: new Date().toISOString(),
                itemsPurchased: selectedProductIds,
                ownerID: userId  // Save the owner ID with the build
            };
    
            const { data } = await client.graphql({
                query: createBuilds,
                variables: { input: buildDetails }
            });
            console.log('Saved Build:', data.createBuilds);
            alert('Build saved successfully!');
        } catch (error) {
            console.error('Error fetching user data or saving build:', error);
            alert('Failed to fetch user data or save build.');
        }
    };
    
    
    
   
    
    const updateFilteredProducts = (items) => {
        setProducts(items);
        setFilteredGPUs(items.filter(product => product.partType === 'GPU'));
        setFilteredRAMs(items.filter(product => product.partType === 'RAM'));
        setFilteredCases(items.filter(product => product.partType === 'Case'));
        setFilteredPSUs(items.filter(product => product.partType === 'PSU'));
        setFilteredCPUs(items.filter(product => product.partType === 'CPU'));
        setFilteredMOBOs(items.filter(product => product.partType === 'Motherboard'));
        setFilteredCooling(items.filter(product => product.partType === 'Cooling'));
        setFilteredMemory(items.filter(product => product.partType === 'Memory'));
        // Add other product types if needed
    };
    
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await client.graphql({
                    query: listProducts
                });
                const items = productData.data.listProducts.items;
                updateFilteredProducts(items);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
   
        fetchProducts();
    }, []);

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
                    <div className="partDiv" onMouseEnter={() => handleMouseEnter('/img/GPU.png', 'GPU')} onMouseLeave={handleMouseLeave}> 
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>GPU (up to two)</h6></Col>
                    <Button variant="dark" onClick={() => setShowGPU(true)} >
                        Configure
                    </Button>
                    <Button variant="danger" onClick={clearGPUs} style={{ marginLeft: '10px' }}>Clear</Button>
                    <div className="GPUArea">
                    {selectedGPUs.length > 0 ? (
                        <ul>{selectedGPUs.map(gpu => <li key={gpu.id}>{gpu.name}</li>)}</ul>
                    ) : "No GPUs selected"}
                    </div>
                        </div>
                    {/* RAM */}
                    <div className="partDiv" onMouseEnter={() => handleMouseEnter('/img/RAM.png', 'RAM')} onMouseLeave={handleMouseLeave}>
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>RAM (up to four)</h6></Col>
                        <Button variant="dark" onClick={() => setShowRAM(true)} >
                            Configure
                        </Button>
                        <Button variant="danger" onClick={clearRAMs} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="RAMArea">
                    {selectedRAMs.length > 0 ? (
                        <ul>{selectedRAMs.map(ram => <li key={ram.id}>{ram.name}</li>)}</ul>
                    ) : "No RAMs selected"}
                    </div>
                    </div>
                    {/* Case */}
                    <div className="partDiv" onMouseEnter={() => handleMouseEnter('/img/PC-Case.png', 'Case')} onMouseLeave={handleMouseLeave}>
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Case</h6></Col>
                        <Button variant="dark" onClick={() => setShowCase(true)} >
                            Configure
                        </Button>
                        <Button variant="danger" onClick={clearCases} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="CaseArea">
                    {selectedCases.length > 0 ? (
                        <ul>{selectedCases.map(c => <li key={c.id}>{c.name}</li>)}</ul>
                    ) : "No Cases selected"}
                    </div>
                    </div>
                    {/* PSU */}
                    <div className="partDiv" onMouseEnter={() => handleMouseEnter('/img/PSU.png', 'PSU')} onMouseLeave={handleMouseLeave}>
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>PSU</h6></Col>
                        <Button variant="dark" onClick={() => setShowPSU(true)} >
                            Configure
                        </Button>
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
                <div min-width="40%" max-width="40%" className="ConfMiddle-column">
                    <img src={currentImage} alt="Selected Part" />
                </div>

                <ScrollView width="30%" height="500px" borderRadius="10px">
                <div className="ConfRight-column">
                    {/* CPU */}
                    <div className="partDiv" onMouseEnter={() => handleMouseEnter('/img/CPU.png', 'CPU')} onMouseLeave={handleMouseLeave}>
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>CPU</h6></Col>
                        <Button variant="dark" onClick={() => setShowCPU(true)} >
                            Configure
                        </Button>
                        <Button variant="danger" onClick={clearCPUs} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="CPUArea">
                        {selectedCPUs.length > 0 ? (
                            <ul>{selectedCPUs.map(cpu => <li key={cpu.id}>{cpu.name}</li>)}</ul>
                        ) : "No CPUs selected"}
                        </div>
                    </div>
                    {/* Motherboard */}
                    <div className="partDiv" onMouseEnter={() => handleMouseEnter('/img/MotherBoard.png', 'MOBO')} onMouseLeave={handleMouseLeave}>
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Motherboard</h6></Col>
                        <Button variant="dark" onClick={() => setShowMOBO(true)} >
                            Configure
                        </Button>
                        <Button variant="danger" onClick={clearMOBOs} style={{ marginLeft: '10px' }}>Clear</Button>
                        <div className="MOBOArea">
                        {selectedMOBOs.length > 0 ? (
                            <ul>{selectedMOBOs.map(mobo => <li key={mobo.id}>{mobo.name}</li>)}</ul>
                        ) : "No Motherboards selected"}
                        </div>
                    </div>
                    {/* Cooling */}
                    <div className="partDiv" onMouseEnter={() => handleMouseEnter('/img/CoolingSystem-fotor-bg-remover-2024041802841.png', 'Cooling')} onMouseLeave={handleMouseLeave}>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Cooling System</h6></Col>
                    <Button variant="dark" onClick={() => setShowCooling(true)} >
                        Configure
                    </Button>
                    <Button variant="danger" onClick={clearCooling} style={{ marginLeft: '10px' }}>Clear</Button>
                    <div className="CoolArea">
                        {selectedCooling.length > 0 ? (
                            <ul>{selectedCooling.map(cool => <li key={cool.id}>{cool.name}</li>)}</ul>
                        ) : "No Cooling Systems selected"}
                        </div>
                    </div>
                    {/* Memory Drives */}
                    <div className="partDiv" onMouseEnter={() => handleMouseEnter('/img/MemoryDrive.png', 'Memory')} onMouseLeave={handleMouseLeave}> 
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Memory Drives (up to 6)</h6></Col>
                        <Button variant="dark" onClick={() => setShowMemory(true)} >
                            Configure
                        </Button>
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
            {/* cart items button */}
            <Container>
            <div>
            <Row>
            <Col className="addButton"><Button variant="primary" onClick={handleAddToCart}>Add item(s) to cart</Button>
            </Col>
            {/* Total Price Display */}
            <Col className="priceCalc">
            <h5 style={{paddingTop: '10px', color: 'white', textShadow: '0 0 3px black'}}>Total Price: ${totalPrice.toFixed(2)}</h5>
            </Col>
            <Col>
            <Button variant="success" onClick={() => setShowSaveModal(true)}>Save Build</Button>

            </Col>
            </Row>
            </div>
            </Container>
                {/* GPU Modal */}
                <Modal show={showGPU} onHide={() => setShowGPU(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Available GPUs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SearchField
                            placeholder="Search GPUs..."
                            onChange={handleSearchChangeGPU}
                            value={searchTermGPU}
                            clearButtonLabel="Clear search"
                        />
                        {filteredGPUs.map(product => (
                            <Card key={product.id} style={{ margin: '10px' }}>
                                <Card.Img variant="top" src={product.productPicturePath} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Card.Text> {product.Description}</Card.Text>
                                    <Card.Text> {product.Description2}</Card.Text>
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
                    <SearchField
                        placeholder="Search RAM..."
                        onChange={handleSearchChangeRAM}
                        value={searchTermRAM}
                        clearButtonLabel="Clear search"
                    />
                    {filteredRAMs.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Card.Text> {product.Description}</Card.Text>
                                <Card.Text> {product.Description2}</Card.Text>
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
                    <SearchField
                        placeholder="Search Cases..."
                        onChange={handleSearchChangeCase}
                        value={searchTermCase}
                        clearButtonLabel="Clear search"
                    />
                    {filteredCases.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Card.Text> {product.Description}</Card.Text>
                                <Card.Text> {product.Description2}</Card.Text>
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
                    <SearchField
                        placeholder="Search PSUs..."
                        onChange={handleSearchChangePSU}
                        value={searchTermPSU}
                        clearButtonLabel="Clear search"
                    />
                    {filteredPSUs.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Card.Text> {product.Description}</Card.Text>
                                <Card.Text> {product.Description2}</Card.Text>
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
                    <SearchField
                        placeholder="Search CPUs..."
                        onChange={handleSearchChangeCPU}
                        value={searchTermCPU}
                        clearButtonLabel="Clear search"
                    />
                    {filteredCPUs.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Card.Text> {product.Description}</Card.Text>
                                <Card.Text> {product.Description2}</Card.Text>
                                <Button variant="primary" onClick={() => handleAddCPU(product)}>Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* MotherBoard Modal */}
            <Modal show={showMOBO} onHide={() => setShowMOBO(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available Motherboards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchField
                        placeholder="Search Motherboards..."
                        onChange={handleSearchChangeMOBO}
                        value={searchTermMOBO}
                        clearButtonLabel="Clear search"
                    />
                    {filteredMOBOs.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Card.Text> {product.Description}</Card.Text>
                                <Card.Text> {product.Description2}</Card.Text>
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
                    <SearchField
                        placeholder="Search Cooling Systems..."
                        onChange={handleSearchChangeCooling}
                        value={searchTermCooling}
                        clearButtonLabel="Clear search"
                    />
                    {filteredCooling.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Card.Text> {product.Description}</Card.Text>
                                <Card.Text> {product.Description2}</Card.Text>
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
                    <SearchField
                        placeholder="Search Memory Drives..."
                        onChange={handleSearchChangeMemory}
                        value={searchTermMemory}
                        clearButtonLabel="Clear search"
                    />
                    {filteredMemory.map(product => (
                        <Card key={product.id} style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={product.productPicturePath} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Card.Text> {product.Description}</Card.Text>
                                <Card.Text> {product.Description2}</Card.Text>
                                <Button variant="primary" onClick={() => handleAddMemory(product)}>Add to Build</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
            {/* Saving buils Modal */}
            <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Save Your Build</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Build Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter build name"
                            value={buildName}
                            onChange={(e) => setBuildName(e.target.value)}
                        />
                    </Form.Group>
                    <h5 className="mt-3">Selected Products:</h5>
                    <div className="d-flex flex-wrap">
                        {renderProductCards([...selectedGPUs, ...selectedRAMs, ...selectedCases, ...selectedPSUs, ...selectedCPUs, ...selectedMOBOs, ...selectedCooling, ...selectedMemory])}
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    handleSaveBuild();
                    setShowSaveModal(false);
                }}>
                    Save Build
                </Button>
            </Modal.Footer>
        </Modal>
        {/* Part info */}
            <Container>
                <Row className="justify-content-center">
                    <Col md={12} className="text-center" style={{paddingTop: '10px', color: 'white', textShadow: '0 0 3px black'}}>
                        <h4>{currentPartInfo.title}</h4>
                        <p>{currentPartInfo.description}</p>
                    </Col>
                </Row>
            </Container>
        </Container>
        
    );
}

export default ConfigurePage;