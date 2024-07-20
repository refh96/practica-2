"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Grid, Card, CardContent, Typography, Button, TextField, Alert, Container, Modal, Box } from '@mui/material';

function Dashboard() {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const [product, setProduct] = useState({
    nombre_producto: "",
    description: "",
    categoria: "",
    precio: "",
  });
  const [products, setProducts] = useState({
    perro: [],
    gato: [],
    otros: [],
    medicamentos: []
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [file, setFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const normalizeCategory = (category) => {
    const normalizedCategory = category.trim().toLowerCase();
    const categoryMap = {
      perro: 'perro',
      gatos: 'gato',
      gato: 'gato',
      otros: 'otros',
      medicamento: 'medicamentos',
      medicamentos: 'medicamentos'
    };

    return categoryMap[normalizedCategory] || 'otros';
  };

  const getProfile = async () => {
    try {
      const profile = await axios.get("/api/profile");
      setUser(profile.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res);
      router.push("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const normalizedCategory = normalizeCategory(product.categoria);

    try {
      const res = await axios.post("http://127.0.0.1:3333/productos", {
        ...product,
        categoria: normalizedCategory
      });
      setProducts(prev => ({
        ...prev,
        [normalizedCategory]: [...prev[normalizedCategory], res.data]
      }));
      setAlertMessage("Producto creado con éxito");
    } catch (error) {
      console.error(error.message);
      setAlertMessage("Error al crear el producto");
    }
  };

  const loadImage = async (productId) => {
    if (!file) {
      setAlertMessage("Selecciona una imagen para cargar.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      await axios.post(`http://127.0.0.1:3333/cargar_foto/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProducts(prevProducts =>
        Object.fromEntries(
          Object.entries(prevProducts).map(([key, prods]) =>
            [key, prods.map(p =>
              p.id === productId ? { ...p, url_foto: `${productId}.jpg` } : p
            )]
          )
        )
      );

      setAlertMessage("Imagen cargada con éxito");
    } catch (error) {
      console.error(error.message);
      setAlertMessage("Error al cargar la imagen");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const [perro, gato, otros, medicamentos] = await Promise.all([
        axios.get("http://127.0.0.1:3333/productos?txtBuscar=perro"),
        axios.get("http://127.0.0.1:3333/productos?txtBuscar=gato"),
        axios.get("http://127.0.0.1:3333/productos?txtBuscar=otros"),
        axios.get("http://127.0.0.1:3333/productos?txtBuscar=medicamentos"),
      ]);

      setProducts({
        perro: perro.data,
        gato: gato.data,
        otros: otros.data,
        medicamentos: medicamentos.data
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (productId) => {
    router.push(`/app/dashboard/editar/${productId}`);
  };

  const handleDelete = async (productId) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    
    if (!isConfirmed) {
      return;
    }
  
    try {
      await axios.delete(`http://127.0.0.1:3333/productos/${productId}`);
      setProducts(prevProducts =>
        Object.fromEntries(
          Object.entries(prevProducts).map(([key, prods]) =>
            [key, prods.filter(p => p.id !== productId)]
          )
        )
      );
      setAlertMessage("Producto eliminado con éxito");
    } catch (error) {
      console.error(error.message);
      setAlertMessage("Error al eliminar el producto");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => getProfile()}>Profile</Button>
      <Button variant="contained" color="secondary" onClick={() => logout()}>Logout</Button>

      {alertMessage && <Alert severity="info">{alertMessage}</Alert>}

      <form onSubmit={createProduct}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre del producto"
          name="nombre_producto"
          value={product.nombre_producto}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Categoría"
          name="categoria"
          value={product.categoria}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Precio"
          type="number"
          name="precio"
          value={product.precio}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary">Crear Producto</Button>
        <Button href="../dashboard" variant="contained" color="primary">Refrescar listas</Button>
      </form>

      {Object.entries(products).map(([category, prods]) => (
        <div key={category}>
          <Typography variant="h5" component="h3" gutterBottom>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
          <Grid container spacing={2}>
            {prods.map(producto => (
              <Grid item xs={12} sm={6} md={4} key={producto.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h4">
                      {producto.nombre_producto}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {producto.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Precio: ${producto.precio}
                    </Typography>
                    <Image
                      src={`http://127.0.0.1:3333/fotografias/${producto.url_foto || `${producto.id}.jpg`}`}
                      alt={`Imagen de ${producto.nombre_producto}`}
                      width={150}
                      height={150}
                      style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" color="secondary" onClick={() => {
                      setSelectedProductId(producto.id);
                      setOpen(true);
                    }}>
                      Cargar Imagen
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(producto.id)}>
                      Editar
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(producto.id)}>
                      Eliminar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Cargar Imagen
          </Typography>
          <input type="file" onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={() => loadImage(selectedProductId)}>
            {loading ? "Cargando..." : "Cargar Imagen"}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Dashboard;
