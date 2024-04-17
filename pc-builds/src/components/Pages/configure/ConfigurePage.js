import React from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../App.css';
import { SearchField } from '@aws-amplify/ui-react';
import { ScrollView } from '@aws-amplify/ui-react';

function ConfigurePage(){
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
                    <div>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>GPU</h6></Col>
                    <SearchField
                        label="SearchGPU"
                        placeholder="Search GPUs here..."
                        />
                    <div className="GPUArea">Text go here</div>
                    </div>
                    <div>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>RAM</h6></Col>
                    <SearchField
                        label="SearchRAM"
                        placeholder="Search RAM here..."
                        />
                    <div className="RAMArea">Text go here</div>
                    </div>
                    <div>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Case</h6></Col>
                    <SearchField
                        label="SearchCase"
                        placeholder="Search Cases here..."
                        />
                    <div className="CaseArea">Text go here</div>
                    </div>
                    <div>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>PSU</h6></Col>
                    <SearchField
                        label="SearchPSU"
                        placeholder="Search PSUs here..."
                        />
                    <div className="CasePSU">Text go here</div>
                    </div>
                </div>
                </ScrollView>
                <div className="ConfMiddle-column">
                    <img src="/img/PCSilh-removebg-preview.png"/>
                </div>
                <ScrollView height="500px" borderRadius="10px">
                <div className="ConfRight-column">
                    <div>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>CPU</h6></Col>
                    <SearchField
                        label="SearchCPU"
                        placeholder="Search CPUs here..."
                        />
                    <div className="CPUArea">Text go here</div>
                    </div>
                    <div>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Motherboard</h6></Col>
                    <SearchField
                        label="SearchMOBO"
                        placeholder="Search MOBOS here..."
                        />
                    <div className="MOBOArea">Text go here</div>
                    </div>
                    <div>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Cooling System</h6></Col>
                    <SearchField
                        label="SearchCooling"
                        placeholder="Search Cooling here..."
                        />
                    <div className="CoolArea">Text go here</div>
                    </div>
                    <div>
                    <Col><h6 style={{color: 'black', textShadow: '0 0 3px black'}}>Main Memory</h6></Col>
                    <SearchField
                        label="SearchMEM"
                        placeholder="Search Hard Drives/SSDs here..."
                        />
                    <div className="MemArea">Text go here</div>
                    </div>
                </div>
                </ScrollView>
            </div>
            </Container>
            </Row>
        </Container>
    )
}

export default ConfigurePage;