// src/pages/LoginPage.js

import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Input,
  Button,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { login } from '../services/authService';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      toast({
        title: 'Username dan password wajib diisi',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const { data } = await login(form);

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', form.username);

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

      toast({
        title: 'Login berhasil!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      navigate('/dashboard');
    } catch (err) {
      toast({
        title: err.response?.data?.message || 'Login gagal',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt="20"
      p="8"
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Login
        </Text>
        <Input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <Button colorScheme="primary" w="full" onClick={handleSubmit}>
          Login
        </Button>

        <HStack>
          <Text fontSize="sm" color="gray.600">
            Belum punya akun?
          </Text>
          <Link
            as={RouterLink}
            to="/register"
            fontSize="sm"
            color="primary"
            fontWeight="semibold"
          >
            Register
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
