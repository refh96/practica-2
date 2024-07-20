// pages/editar.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({
    nombre_producto: '',
    description: '',
    categoria: '',
    precio: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch product details
      axios
        .get(`http://127.0.0.1:3333/productos/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:3333/productos/${id}`, product)
      .then((response) => {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard'); // Redirect to dashboard after success
        }, 2000);
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">Error al cargar el producto: {error.message}</Alert>;

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Producto
        </Typography>
        {success && <Alert severity="success">Producto actualizado correctamente</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre del Producto"
            name="nombre_producto"
            value={product.nombre_producto}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Categoría"
            name="categoria"
            value={product.categoria}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Precio"
            name="precio"
            value={product.precio}
            onChange={handleChange}
            type="number"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditProduct;
