import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Container from '@mui/material/Container';

const Contactos = () => {
  return (
    <div>
            <Header />

    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 4 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%',
          padding: 3,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          backgroundColor: '#fff'
        }}
      >
        <Typography level="h4" sx={{ marginBottom: 2 }}>
          Contáctenos
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          WhatsApp: <a href="tel:+56983219636" style={{ color: '#007bff', textDecoration: 'none' }}>+56983219636</a>
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Facebook: <a href="https://facebook.com/RanchoMarket" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>Rancho Market</a>
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Instagram: <a href="https://instagram.com/rancho_market" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>rancho_market</a>
        </Typography>
        <Typography variant="body1">
          Correo: <a href="mailto:info@rancho-market.com" style={{ color: '#007bff', textDecoration: 'none' }}>info@rancho-market.com</a>
        </Typography>
      </Box>
      <Footer />
    </Container>
    

    </div>
  );
};

export default Contactos;
