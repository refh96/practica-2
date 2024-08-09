'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Container, Grid, Typography, Box, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddressAutocomplete from './AddressAutocomplete'; // Asegúrate de que la ruta sea correcta

function PedidoPage() {
  const [emailTouched, setEmailTouched] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [address, setAddress] = useState('');
  const [pickupDetails, setPickupDetails] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    paymentMethod: '',
  });
  const [isPickup, setIsPickup] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const productos = JSON.parse(sessionStorage.getItem('pedido')) || [];
    setPedido(productos);
  }, []);

  const handleDeleteOrder = () => {
    sessionStorage.removeItem('pedido');
    setPedido([]);
    router.push('/');
  };

  const handleClearOrder = () => {
    sessionStorage.removeItem('pedido');
    setPedido([]);
  };

  const handleSubmitOrder = async () => {
    // Validar que todos los campos estén llenos
    const { date, time, name, phone, email, paymentMethod } = pickupDetails;
    if (
      date === '' ||
      time === '' ||
      name === '' ||
      phone === '' ||
      email === '' ||
      paymentMethod === '' ||
      (!isPickup && address === '')
    ) {
      alert('Por favor, complete todos los campos antes de enviar el pedido.');
      return;
    }

    // Construir el mensaje para enviar por WhatsApp
    let mensaje = `*Resumen del Pedido:*\n\n`;

    let total = 0;
    pedido.forEach((item, index) => {
      const itemTotal = item.precio * item.quantity;
      total += itemTotal;
      mensaje += `Producto: ${item.nombre_producto}\nCantidad: ${item.quantity}\nPrecio: ${item.precio}\n\n`;
    });

    mensaje += `*Total del Pedido:*\n${total}\n\n`;

    mensaje += `*Detalles del Pedido:*\n`;
    mensaje += `Fecha: ${date}\n`;
    mensaje += `Hora: ${time}\n`;
    mensaje += `Nombre: ${name}\n`;
    mensaje += `Teléfono: ${phone}\n`;
    mensaje += `Correo Electrónico: ${email}\n`;
    mensaje += `Método de Pago: ${paymentMethod}\n`;

    if (!isPickup) {
      mensaje += `Dirección de Entrega: ${address}\n`;
    }

    const numeroWhatsApp = '56983219636';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Abrir el enlace en una nueva ventana
    window.open(urlWhatsApp, '_blank');

    // Opcionalmente, también puedes enviar los datos al backend si necesitas guardar el pedido
    try {
      await axios.post('https://www.ranchomarket.site/orders', {
        pedido,
        address,
        pickupDetails,
        isPickup,
      });
      router.push('/confirmation');
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    }

    // Limpiar el pedido
    handleClearOrder();
  };

  const handleAddressSelect = (place) => {
    console.log('Selected address:', place);
    setAddress(place.formatted_address); // Actualiza el estado de la dirección
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Filtrar solo números
    const filteredValue = value.replace(/[^0-9]/g, '');
    setPickupDetails({ ...pickupDetails, phone: filteredValue });
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setPickupDetails({ ...pickupDetails, email: value });
    setEmailTouched(true); // Marca el campo como tocado
  };


  const validateEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <Header />

      <Container>
        <Typography variant="h4" align="center" margin="20px">
          Resumen del Pedido
        </Typography>
        {pedido.length > 0 ? (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Productos</Typography>
                {pedido.map((item, index) => (
                  <Paper key={index} style={{ padding: '10px', marginBottom: '10px' }}>
                    <Typography>{item.nombre_producto}</Typography>
                    <Typography>Cantidad: {item.quantity}</Typography>
                    <Typography>Precio: {item.precio}</Typography>
                  </Paper>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Detalles del Pedido</Typography>
                <Button variant="contained" color="secondary" onClick={handleDeleteOrder}>
                  Eliminar Pedido
                </Button>
                <Button variant="contained" color="primary" onClick={handleClearOrder}>
                  Limpiar Pedido
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
                  Enviar Pedido
                </Button>
                <Box marginTop="20px">
                  {isPickup ? (
                    <Box>
                      <TextField
                        label="Fecha"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ inputProps: { min: today } }}
                        value={pickupDetails.date}
                        onChange={(e) => setPickupDetails({ ...pickupDetails, date: e.target.value })}
                      />
                      <TextField
                        label="Hora"
                        type="time"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={pickupDetails.time}
                        onChange={(e) => setPickupDetails({ ...pickupDetails, time: e.target.value })}
                      />
                      <TextField
                        label="Nombre"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={pickupDetails.name}
                        onChange={(e) => setPickupDetails({ ...pickupDetails, name: e.target.value })}
                      />
                      <TextField
                        label="Teléfono"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={pickupDetails.phone}
                        onChange={handlePhoneChange}
                        inputProps={{ pattern: "[0-9]*" }}
                      />
                      <TextField
                        label="Correo Electrónico"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={pickupDetails.email}
                        onChange={handleEmailChange}
                        onBlur={() => setEmailTouched(true)} // Marca el campo como tocado cuando pierde el foco
                        type="email"
                        error={emailTouched && !validateEmail(pickupDetails.email)}
                        helperText={emailTouched && !validateEmail(pickupDetails.email) ? 'Correo electrónico inválido' : ''}
                      />
                      <FormControl fullWidth>
                        <InputLabel>Método de Pago</InputLabel>
                        <Select
                          value={pickupDetails.paymentMethod}
                          onChange={(e) => setPickupDetails({ ...pickupDetails, paymentMethod: e.target.value })}
                        >
                          <MenuItem value="efectivo">Efectivo</MenuItem>
                          <MenuItem value="transferencia">Transferencia</MenuItem>
                          <MenuItem value="tarjeta">Tarjeta</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  ) : (
                    <Box>
                      <AddressAutocomplete onAddressSelect={handleAddressSelect} />
                      <TextField
                        label="Fecha"
                        type="date"
                        fullWidth
                        InputProps={{ inputProps: { min: today } }}
                        value={pickupDetails.date}
                        onChange={(e) => setPickupDetails({ ...pickupDetails, date: e.target.value })}
                      />
                      <TextField
                        label="Hora"
                        type="time"
                        fullWidth
                        value={pickupDetails.time}
                        onChange={(e) => setPickupDetails({ ...pickupDetails, time: e.target.value })}
                      />
                      <TextField
                        label="Nombre"
                        fullWidth
                        value={pickupDetails.name}
                        onChange={(e) => setPickupDetails({ ...pickupDetails, name: e.target.value })}
                      />
                      <TextField
                        label="Teléfono"
                        fullWidth
                        value={pickupDetails.phone}
                        onChange={(e) => setPickupDetails({ ...pickupDetails, phone: e.target.value })}
                      />
                      <TextField
                        label="Correo Electrónico"
                        fullWidth
                        value={pickupDetails.email}
                        onChange={(e) => setPickupDetails({ ...pickupDetails, email: e.target.value })}
                      />
                      <FormControl fullWidth>
                        <InputLabel>Método de Pago</InputLabel>
                        <Select
                          value={pickupDetails.paymentMethod}
                          onChange={(e) => setPickupDetails({ ...pickupDetails, paymentMethod: e.target.value })}
                        >
                          <MenuItem value="efectivo">Efectivo</MenuItem>
                          <MenuItem value="transferencia">Transferencia</MenuItem>
                          <MenuItem value="tarjeta">Tarjeta</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                  <Button variant="contained" color="primary" onClick={() => setIsPickup(!isPickup)}>
                    {isPickup ? 'Cambiar a Domicilio' : 'Cambiar a Retiro'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography variant="h6" align="center">
            No hay productos en el pedido.
          </Typography>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default PedidoPage;
