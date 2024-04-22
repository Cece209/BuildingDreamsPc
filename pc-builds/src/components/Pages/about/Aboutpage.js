import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
    return (
        <div>
            <Container fluid style={{ 
                position: 'relative',
                padding: 0,
                height: '50vh', 
                overflow: 'hidden', 
            }}>
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(/img/eyes.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: -1, 
                    }}
                />
                <Container 
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100%',
                        padding: '2rem', 
                       
                    }}
                >
                    <div style={{ 
                        textAlign: 'center',
                        color: 'white',
                        textShadow: '0 0 2px black'
                    }}>
                        <h1 className="font-weight-light" style={{ fontSize: '3.0rem' }}>We Build Together!</h1>
                        <p style={{ fontSize: '1.2rem' }}>
                            Learn more about "Building Dreams" and us.
                        </p>
                    </div>
                </Container>
            </Container>
            
            <Container fluid style={{ 
                backgroundColor: '#333333', 
                position: 'absolute',
                minHeight: '50vh', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Row className="px-4 my-5">
                    <Col xs={12} md={12}>
                        <h1 style={{ color: 'white', textShadow: '0 0 3px black'}}>About Us</h1>
                        <p style={{ color: 'white', textShadow: '0 0 3px black' }}>
                            "Building Dreams," a PC integration service website that offers a personalized computer assembly experience. The website aims to provide an intuitive PC configurator system, 
                            enabling users to customize and visualize their ideal computer setup. 
                            Users will have the flexibility to select various components like processors, graphics cards, memory, storage, and peripherals. 
                            The system will ensure component compatibility, offer dynamic price calculations, and provide a user-friendly interface for an enhanced customization process. 
                            Additionally, the website will feature a chat/message functionality for personalized assistance, allowing users to seek advice and interact with our representatives. 
                            This platform is designed to cater to tech enthusiasts, offering them a space to not only build their dream PCs but also share and save their configurations for future reference. 
                        </p>
                    </Col>
                    <Col xs={12} md={6} className="text-center" style={{ position: 'relative' }}>
                        <img src="/img/About.png" alt="About" style={{ maxWidth: '100%', boxShadow: '0 0 20px orange' }} />
                    </Col>

                    <Col xs={12} md={6}>
                        <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Goal</h2>
                        <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                            The ultimate goal is to combine passion for technology with expert knowledge, delivering a comprehensive and enjoyable PC building experience.
                        </p>
                    </Col>
                    <Col xs={12} md={6} style={{ paddingTop: '40px' }}>
                        <h1 style={{ color: 'white', textShadow: '0 0 3px black'}}>Developers</h1>
                        <p style={{ color: 'white', textShadow: '0 0 3px black' }}>
                        </p>
                    </Col>
                    <Col xs={12} md={12} className="text-left" style={{ position: 'relative', paddingTop: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img src="/img/Etahn1.png" alt="About" style={{width: '320px', height: '300px', borderRadius: '50%',  boxShadow: '0 0 20px orange' }} />
                            <div style={{ paddingLeft: '20px' }}>
                                <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Ethan Palomino</h2>
                                <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                                    ~ Head Developer
                                </p>
                             </div>
                        </div>
                    </Col>
                    <Col xs={12} md={12} className="text-left" style={{ position: 'relative', paddingTop: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img src="/img/Cece1.png" alt="About" style={{ width: '320px', height: '300px', borderRadius: '50%', boxShadow: '0 0 20px orange' }} />
                    <div style={{ paddingLeft: '20px' }}>
                     <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Carltiana Staidum</h2>
                     <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                      ~ Designer/Developer/Frontend
                    </p>
                </div>
             </div>
         </Col>
         <Col xs={12} md={12} className="text-left" style={{ position: 'relative', paddingTop: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src="/img/About.png" alt="About" style={{ width: '320px', height: '300px', borderRadius: '50%', boxShadow: '0 0 20px orange' }} />
            <div style={{ paddingLeft: '20px' }}>
                <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Layton Lofton</h2>
                <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                    ~Developer/Backend/Frontend
                </p>
            </div>
        </div>
    </Col>
    <Col xs={12} md={12} className="text-left" style={{ position: 'relative', paddingTop: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src="/img/sunella.png" alt="About" style={{ width: '320px', height: '300px', borderRadius: '50%', boxShadow: '0 0 20px orange' }} />
            <div style={{ paddingLeft: '20px' }}>
                <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Sunella Ramnath</h2>
                <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                    ~ Data Manager/Tester
                </p>
            </div>
        </div>
    </Col>
    <Col xs={12} md={12} className="text-left" style={{ position: 'relative', paddingTop: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src="/img/About.png"alt="About" style={{ width: '320px', height: '300px', borderRadius: '50%', boxShadow: '0 0 20px orange' }} />
            <div style={{ paddingLeft: '20px' }}>
                <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Paul Yeon</h2>
                <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                    ~ Data Manager 
                </p>
            </div>
        </div>
    </Col>
    <Col xs={12} md={12} className="text-left" style={{ position: 'relative', paddingTop: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src="/img/About.png"alt="About" style={{ width: '320px', height: '300px', borderRadius: '50%', boxShadow: '0 0 20px orange' }} />
            <div style={{ paddingLeft: '20px' }}>
                <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>Saugat Ghimire</h2>
                <p style={{ color: 'white', textShadow: '0 0 3px black'}}>
                    ~ Developer/Tester
                </p>
            </div>
        </div>
    </Col>
</Row>
 </Container>
        </div>
    );
}
export default AboutPage;
