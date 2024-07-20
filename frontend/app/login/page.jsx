"use client";
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from '@mui/material';

function Home() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', credentials);

    if (res.status === 200) {
      router.push('/dashboard');
    }
  };

  return (
    <div>
            <Header />

    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography level="h4" sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Input
            placeholder="Email"
            type="email"
            fullWidth
            onChange={(e) =>
              setCredentials({
                ...credentials,
                email: e.target.value,
              })
            }
          />
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Input
            placeholder="Password"
            type="password"
            fullWidth
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.target.value,
              })
            }
          />
        </Box>
        <Button
          type="submit"
          variant="solid"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
    <Footer />

  </div>
  );
}

export default Home;
