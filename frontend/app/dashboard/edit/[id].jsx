import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Typography, TextField, Stack, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const API_URL = 'https://www.ranchomarket.site/productos';

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return {
      props: {
        producto: response.data
      }
    };
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return {
      props: {
        producto: null
      }
    };
  }
};

const EditarProducto = ({ producto }) => {
  const router = useRouter();
  const [productData, setProductData] = useState(producto);

  useEffect(() => {
    setProductData(producto);
  }, [producto]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  const updateProduct = async (data) => {
    try {
      await axios.put(`${API_URL}/${router.query.id}`, data);
      alert('Producto editado exitosamente');
      router.push('/list'); // Redirigir a la lista de productos
    } catch (error) {
      alert('Error al editar el producto: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(productData);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Editar Producto
      </Typography>
      <Stack spacing={3} mt={3}>
        <TextField
          label="Nombre del Producto"
          name="nombre_producto"
          value={productData.nombre_producto}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Descripción"
          name="description"
          value={productData.description}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            name="categoria"
            value={productData.categoria}
            onChange={handleChange}
          >
            <MenuItem value="gato">Gato</MenuItem>
            <MenuItem value="perro">Perro</MenuItem>
            {/* Agrega más categorías según sea necesario */}
          </Select>
        </FormControl>
        <TextField
          label="Precio"
          name="precio"
          type="number"
          value={productData.precio}
          onChange={handleChange}
          fullWidth
        />
      </Stack>
      <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleSubmit}>
        Modificar
      </Button>
    </Container>
  );
};

export default EditarProducto;
