import React from 'react';
import  Container  from 'react-bootstrap/Container';

function SiteFooter() {
    return (
        <footer className="py-5 ny-5" >
            <Container className = "px-4">
            <p className="text-end" style={{ color: 'white' }}>&copy; 2024</p>
            </Container>
        </footer>
    )
}

export default SiteFooter;