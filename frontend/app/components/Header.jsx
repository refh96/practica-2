'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets'; // Importa el ícono de patita
import { useRouter } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Horarios de atención
const hours = {
  Lunes: '10:00 AM - 8:30 PM',
  Martes: '10:00 AM - 8:30 PM',
  Miércoles: '10:00 AM - 8:30 PM',
  Jueves: '10:00 AM - 8:30 PM',
  Viernes: '10:00 AM - 8:30 PM',
  Sábado: '10:00 AM - 8:30 PM',
  Domingo: '10:00 AM - 7:00 PM'
};

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  // Obtener el día de la semana actual en español
  const dayOfWeek = new Date().toLocaleDateString('es-CL', { weekday: 'long' });
  const currentHours = hours[dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Inicio', link: '/' },
    { label: 'Pedido', link: '/pedido' },
    { label: 'Contacto', link: '/contactos' },
  ];

  const handleNavigation = (link) => {
    router.push(link);
    handleMenuClose(); // Cerrar el menú después de la navegación en dispositivos móviles
  };

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <PetsIcon sx={{ mr: 1 }} /> {/* Ícono de patita */}
            <Typography variant="h6">
              Rancho Market
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}: {currentHours || 'Horario no disponible'}
            </Typography>
          </Box>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {menuItems.map((item, index) => (
                  <MenuItem key={index} onClick={() => handleNavigation(item.link)}>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuItems.map((item, index) => (
                <Button key={index} color="inherit" onClick={() => handleNavigation(item.link)}>
                  {item.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
