import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, alignItems: 'right' }}>
          <Typography variant="body1" align='center'>
            © 2023 Rancho Market. Todos los derechos reservados.
          </Typography>
          <Link  href="https://www.facebook.com/profile.php?id=61554562001480" target="_blank" sx={{ color: 'black', mx: 1 }}>
            <FacebookIcon />
          </Link>
          <Link href="https://www.instagram.com/rancho_market_/" target="_blank" sx={{ color: 'black', mx: 1 }}>
            <InstagramIcon />
          </Link>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
