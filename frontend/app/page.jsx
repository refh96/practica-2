'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Grid, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image'; // Importa el componente Image de Next.js
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [productos1, setProductos1] = useState([]);
  const [productos2, setProductos2] = useState([]);
  const [productos3, setProductos3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedido, setPedido] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await axios.get('https://www.ranchomarket.site/productos?txtBuscar=perro');
        if (response.status === 200) {
          setProductos(response.data);
        } else {
          console.error('Error al obtener los productos');
        }
      } catch (error) {
        console.error('Error en la solicitud de productos:', error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchProductos1() {
      try {
        const response = await axios.get('https://www.ranchomarket.site/productos?txtBuscar=gato');
        if (response.status === 200) {
          setProductos1(response.data);
        } else {
          console.error('Error al obtener los productos');
        }
      } catch (error) {
        console.error('Error en la solicitud de productos:', error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchProductos2() {
      try {
        const response = await axios.get('https://www.ranchomarket.site/productos?txtBuscar=otros');
        if (response.status === 200) {
          setProductos2(response.data);
        } else {
          console.error('Error al obtener los productos');
        }
      } catch (error) {
        console.error('Error en la solicitud de productos:', error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchProductos3() {
      try {
        const response = await axios.get('https://www.ranchomarket.site/productos?txtBuscar=medicamentos');
        if (response.status === 200) {
          setProductos3(response.data);
        } else {
          console.error('Error al obtener los productos');
        }
      } catch (error) {
        console.error('Error en la solicitud de productos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
    fetchProductos1();
    fetchProductos2();
    fetchProductos3();
  }, []);

  const items = [
    {
      img: 'https://i.ibb.co/5B8nLqf/imagen-1.jpg',
      alt: 'Descripción de la imagen 1',
    },
    {
      img: 'https://i.ibb.co/xsnKD9Z/rancho-market-2.jpg',
      alt: 'Descripción de la imagen 2',
    },
    {
      img: 'https://i.ibb.co/hyVWDvn/imagen-2.jpg',
      alt: 'Descripción de la imagen 3',
    },
    {
      img: 'https://i.ibb.co/gw2mZ1q/rancho-market.jpg',
      alt: 'Descripción de la imagen 4',
    },
    {
      img: 'https://i.ibb.co/SQ7Z7YD/imagen-3.jpg',
      alt: 'Descripción de la imagen 5',
    },
    {
      img: 'https://i.ibb.co/k0yhK3g/imagen-4.jpg',
      alt: 'Descripción de la imagen 6',
    },
    {
      img: 'https://i.ibb.co/3hZSYkQ/imagen-5.jpg',
      alt: 'Descripción de la imagen 7',
    },
  ];

  const handleOpenModal = (producto) => {
    setSelectedProduct(producto);
    setQuantity(1);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleAddToOrder = () => {
    if (quantity <= 0) {
      alert('La cantidad debe ser mayor a 0.');
      return;
    }
  
    const currentOrder = JSON.parse(sessionStorage.getItem('pedido')) || [];
    const updatedOrder = [...currentOrder, { ...selectedProduct, quantity }];
    sessionStorage.setItem('pedido', JSON.stringify(updatedOrder));
    handleCloseModal();
  };
  
  
  return (
    <div 
      style={{ 
        position: 'relative',
        backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/012/874/543/non_2x/cute-seamless-pattern-with-colorful-pets-paws-cat-or-dog-footprint-outline-background-with-dots-animal-backdrop-for-pet-shops-product-packing-greeting-card-vet-clinic-pet-care-product-vector.jpg")',
        backgroundSize: '20%', 
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        minHeight: '100vh',
        imageRendering: 'auto'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1
        }}
      />
      <Box component="nav" aria-label="My site" sx={{ flexGrow: 1, width: '100%', maxWidth: '1500px', position: 'relative', zIndex: 2 }}>
        <Header />
        <Typography 
          variant="h1" 
          align="center" 
          style={{ margin: '60px 0', color: 'darkorange', fontFamily: 'Cursive', fontSize: '3rem' }}
        >
          Bienvenido al Rancho
        </Typography>
        <div style={{ width: '100%', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
          <Carousel
            autoPlay={true}
            animation="slide"
            timeout={500}
            navButtonsAlwaysVisible={true}
            indicatorContainerProps={{ sx: { mt: 2 } }}
          >
            {items.map((item, index) => (
              <Paper key={index} style={{ height: '50vh', display: 'flex', alignItems: 'center', color: 'black' }}>
                <img src={item.img} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Paper>
            ))}
          </Carousel>
        </div>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{ textAlign:'center', padding: '0 20px', color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
                <h2>Perros</h2>
                {productos.map((producto) => (
                  <div key={producto.id} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
                    <h3>{producto.nombre_producto}</h3>
                    <p>{producto.description}</p>
                    <p>Precio: {producto.precio}</p>
                    <Image 
                      src={`https://www.ranchomarket.site/fotografias/${producto.id}.jpg`} 
                      alt={`Imagen de ${producto.nombre_producto}`} 
                      width={150} 
                      height={150} 
                      style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(producto)}>
                      Agregar al Pedido
                    </Button>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{ textAlign:'center', padding: '0 20px', color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
                <h2>Gatos</h2>
                {productos1.map((producto) => (
                  <div key={producto.id} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
                    <h3>{producto.nombre_producto}</h3>
                    <p>{producto.description}</p>
                    <p>Precio: {producto.precio}</p>
                    <Image 
                      src={`https://www.ranchomarket.site/fotografias/${producto.id}.jpg`} 
                      alt={`Imagen de ${producto.nombre_producto}`} 
                      width={150} 
                      height={150} 
                      style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(producto)}>
                      Agregar al Pedido
                    </Button>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{ textAlign:'center', padding: '0 20px', color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
                <h2>Otros</h2>
                {productos2.map((producto) => (
                  <div key={producto.id} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
                    <h3>{producto.nombre_producto}</h3>
                    <p>{producto.description}</p>
                    <p>Precio: {producto.precio}</p>
                    <Image 
                      src={`https://www.ranchomarket.site/fotografias/${producto.id}.jpg`} 
                      alt={`Imagen de ${producto.nombre_producto}`} 
                      width={150} 
                      height={150} 
                      style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(producto)}>
                      Agregar al Pedido
                    </Button>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{ textAlign:'center', padding: '0 20px', color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
                <h2>Medicamentos</h2>
                {productos3.map((producto) => (
                  <div key={producto.id} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
                    <h3>{producto.nombre_producto}</h3>
                    <p>{producto.description}</p>
                    <p>Precio: {producto.precio}</p>
                    <Image 
                      src={`https://www.ranchomarket.site/fotografias/${producto.id}.jpg`} 
                      alt={`Imagen de ${producto.nombre_producto}`} 
                      width={150} 
                      height={150} 
                      style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(producto)}>
                      Agregar al Pedido
                    </Button>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Agregar al Pedido</DialogTitle>
          <DialogContent>
            {selectedProduct && (
              <>
                <Typography variant="h6">{selectedProduct.nombre_producto}</Typography>
                <TextField
                  label="Cantidad"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleAddToOrder} color="primary">
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
        <Footer />
        <IconButton
  style={{
    position: 'fixed',
    bottom: 16,
    right: 16,
    backgroundColor: '#25D366',
    color: 'white',
    zIndex: 1000,
  }}
  onClick={() => window.open('https://wa.me/56983219636?text=Hola%2C%20me%20comunico%20desde%20su%20sitio%20web', '_blank')}
>
  <WhatsAppIcon />
</IconButton>


      </Box>
    </div>
  );
}

export default HomePage;
