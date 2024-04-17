import { React, useState } from 'react';
import { Container, Button, Modal, Row, Col, Card } from "react-bootstrap";
import '../../../App.css';
//import { SearchField } from '@aws-amplify/ui-react';
import { ScrollView } from '@aws-amplify/ui-react';


function ConfigurePage(){

    // const [products, setProducts] = useState([]);
    // const [productData, setProductData] = useState({partType:"", name:"", price:""});
   
    const [showGPU, setShowGPU] = useState(false);
    const handleGPUModal = () => setShowGPU(!showGPU);

    const [showRAM, setShowRAM] = useState(false);
    const handleRAMModal = () => setShowRAM(!showRAM);

    const [showCase, setShowCase] = useState(false);
    const handleCaseModal = () => setShowCase(!showCase);

    const [showPSU, setShowPSU] = useState(false);
    const handlePSUModal = () => setShowPSU(!showPSU);

    const [showCPU, setShowCPU] = useState(false);
    const handleCPUModal = () => setShowCPU(!showCPU);

    const [showMOBO, setShowMOBO] = useState(false);
    const handleMOBOModal = () => setShowMOBO(!showMOBO);

    const [showCooling, setShowCooling] = useState(false);
    const handleCoolingModal = () => setShowCooling(!showCooling);

    const [showMemory, setShowMemory] = useState(false);
    const handleMemoryModal = () => setShowMemory(!showMemory);

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
                <ScrollView height="500px" borderRadius="10px">
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
                                <Button variant="dark" onClick={handleRAMModal}>Configure RAM</Button>
                    <div className="RAMArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* Case */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Case</h6></Col>
                                <Button variant="dark" onClick={handleCaseModal}>Configure Case</Button>
                    <div className="CaseArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* PSU */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>PSU</h6></Col>
                                <Button variant="dark" onClick={handlePSUModal}>Configure PSU</Button>
                    <div className="PSUArea">Text go here</div>
                    </div>
                </div>
                </ScrollView>
                <div className="ConfMiddle-column">
                    <img src="/img/PCSilh-removebg-preview.png"/>
                </div>
                <ScrollView height="500px" borderRadius="10px">
                <div className="ConfRight-column">
                    <div className="partDiv">
                        {/* CPU */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>CPU</h6></Col>
                                <Button variant="dark" onClick={handleCPUModal}>Configure CPU</Button>
                    <div className="CPUArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* Motherboard */}
                            <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Motherboard</h6></Col>
                                <Button variant="dark" onClick={handleMOBOModal}>Configure Motherboard</Button>
                    <div className="MOBOArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* Cooling */}
                   <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Cooling System</h6></Col>
                                <Button variant="dark" onClick={handleCoolingModal}>Configure Cooling System</Button>
                    <div className="CoolArea">Text go here</div>
                    </div>
                    <div className="partDiv">
                        {/* Memory Drives */}
                        <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Memory Drives (up to 6)</h6></Col>
                                <Button variant="dark" onClick={handleMemoryModal}>Configure Memory Drives</Button>
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
                <Modal show={showGPU} onHide={handleGPUModal} fullscreen={true} centered>
                <Modal.Header closeButton>
                <Modal.Title>GPU Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Here you can configure your GPU settings.
                </Modal.Body>
            </Modal>
            {/* RAM Modal */}
            <Modal show={showRAM} onHide={handleRAMModal} fullscreen={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>RAM Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Here you can configure your RAM settings. Choose the amount and type of RAM.
                </Modal.Body>
            </Modal>
            {/* Case Modal */}
            <Modal show={showCase} onHide={handleCaseModal} fullscreen={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Case Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Configure your computer case. Choose from various sizes and designs.
                </Modal.Body>
            </Modal>
            {/* PSU Modal */}
            <Modal show={showPSU} onHide={handlePSUModal} fullscreen={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>PSU Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Configure your Power Supply Unit. Select wattage, efficiency, and form factor.
                </Modal.Body>
            </Modal>
            {/* CPU Modal */}
            <Modal show={showCPU} onHide={handleCPUModal} fullscreen={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>CPU Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Configure your CPU. Choose from various manufacturers, core counts, and clock speeds.
                </Modal.Body>
            </Modal>
            {/* Motherboard Modal */}
            <Modal show={showMOBO} onHide={handleMOBOModal} fullscreen={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Motherboard Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Configure your motherboard. Select from various sizes, chipsets, and socket types.
                </Modal.Body>
            </Modal>
            {/* Cooling Modal */}
            <Modal show={showCooling} onHide={handleCoolingModal} fullscreen={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cooling System Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Configure your cooling system. Choose from air coolers, liquid coolers, and fan setups.
                </Modal.Body>
            </Modal>
            {/* Memory Drives Modal */}
            <Modal show={showMemory} onHide={handleMemoryModal} fullscreen={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Memory Drives Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Configure your memory drives. Choose from various types of HDDs and SSDs, capacities, and form factors.
                    <Card style={{ width: '11rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Name</Card.Title>
                        <Card.Text>
                        100.99
                        </Card.Text>
                        <Button variant="primary">add</Button>
                    </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </Container>
        
    );
}

export default ConfigurePage;