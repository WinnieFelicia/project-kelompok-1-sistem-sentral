import React, { useState, useEffect } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddSupplierForm from '../components/AddSupplierForm';
import SupplierTable from '../components/SupplierTable';
import axios from 'axios';

export default function SupplierPage() {
  const toast = useToast();
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({
    supplierId: '',
    name: '',
    contact: '',
    address: '',
  });

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/suppliers');
      setSuppliers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/suppliers', supplier);
      toast({ title: 'Supplier added', status: 'success', duration: 2000, isClosable: true });
      setSupplier({ supplierId: '', name: '', contact: '', address: '' });
      fetchSuppliers();
    } catch (error) {
      toast({ title: 'Error adding supplier', status: 'error', duration: 2000, isClosable: true });
    }
  };

  return (
    <Flex minH="100vh" bg="#FFF7F6">
      <Sidebar />
      <Box flex={1} p={10}>
        <Header />
        <AddSupplierForm supplier={supplier} handleChange={handleChange} handleAdd={handleAdd} />
        <SupplierTable suppliers={suppliers} />
      </Box>
    </Flex>
  );
}
