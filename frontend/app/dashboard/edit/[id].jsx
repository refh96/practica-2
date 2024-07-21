'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Container, Typography, TextField, Stack, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const API_URL = 'http://159.223.114.118:3333/productos';

const getProducto = async (id) => {
  const response = await axios.get(API_URL + '/' + context.query.id)
  return response
}

export const getServerSideProps =  async (context) => {
  const response = await getProducto(context.query.id)
  return {
    props: {
      producto: response.data
    }
  }
}

const editar = ({producto}) => {
  
  const router = useRouter()

  const [producto2, setProducto] = useState(producto)

  const updateProducto = async (producto) =>{
    const response = await axios.put(API_URL + '/' + context.query.id)
    return response
  }

  const handleChange = (e) => {
    setProducto ({
      ...producto2,
      [e.target.name]: e.target.value
    })
  }

  console.log(producto2)

  const submitProducto = (e) => {
    
    updateProducto(producto2).then(res => {
      console.log('producto modificado')
      router.push('../page')
    })
  }

  return (
    <Container maxW="container.xl" mt={10}>
      <Heading size="2xl" textAlign={"center"}>Editar producto: {producto2.nombre_producto}</Heading>
      <Stack spacing={4} mt ={10}>
        <FormControl id = 'nombre'>
          <FormLabel>Nombre producto</FormLabel>
          <Input type="text" placeholder="Nombre" name = "nombre" onChange={handleChange} value = {producto2.nombre_producto}/>
        </FormControl>
        <FormControl id = 'description'>
          <FormLabel>descripcion</FormLabel>
          <Input type="text" placeholder="description" name = "description" onChange={handleChange} value = {producto2.description}/>
        </FormControl>
        <FormControl id = 'categoria'>
          <Select name = 'categoria' onChange={handleChange} value = {arrendatario2.categoria}>
            <option value='efectivo'>efectivo</option>
            <option value='transferencia'>transferencia</option>
            <option value='tarjeta'>tarjeta</option>
          </Select>
        </FormControl>
        <FormControl id = 'precio'>
          <FormLabel>precio</FormLabel>
          <InputGroup>
            <InputLeftAddon children = '$'></InputLeftAddon>
            <Input type="number" placeholder="precio" name = "precio" onChange={handleChange} value = {producto2.precio}/>
          </InputGroup>
        </FormControl>
      </Stack>
      <Button colorScheme='blue' mt = {10} mb = {10} onClick={() =>{submitProducto(); handleSubmit()}}>Modificar</Button>
    </Container>
  )
};

export default EditarProducto;
