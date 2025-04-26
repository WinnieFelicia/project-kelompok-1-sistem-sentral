// src/pages/RegisterPage.js
import { useState } from 'react';
import { register } from '../services/authService';
import { VStack, Input, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const toast = useToast();
  const nav = useNavigate();

  const handleSubmit = async () => {
    try {
      await register(form);
      toast({ title: 'Register berhasil', status: 'success', duration: 2000 });
      nav('/login');
    } catch (err) {
      toast({ title: err.response?.data?.message || 'Register gagal', status: 'error' });
    }
  };

  return (
    <VStack spacing={4} maxW="md" mx="auto" mt={20}>
      <Input placeholder="Username" value={form.username}
             onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
      <Input type="password" placeholder="Password" value={form.password}
             onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
      <Button colorScheme="primary" w="full" onClick={handleSubmit}>
        Register
      </Button>
    </VStack>
  );
}
