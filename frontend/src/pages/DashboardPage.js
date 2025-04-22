import React, { useState, useEffect } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddProductForm from '../components/AddProductForm';
import ProductTable from '../components/ProductTable';
import axios from 'axios';

export default function DashboardPage() {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    description: '',
    category: '',
    unitPrice: '',
    quantity: '',
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/products', {
        ...product,
        unitPrice: parseFloat(product.unitPrice),
        quantity: parseInt(product.quantity, 10)
      });
      toast({ title: 'Product added', status: 'success', duration: 2000, isClosable: true });
      setProduct({ description: '', category: '', unitPrice: '', quantity: '' });
      fetchProducts();
    } catch (error) {
      toast({ title: 'Error adding product', status: 'error', duration: 2000, isClosable: true });
    }
  };

  return (
    <Flex minH="100vh" bg="#FFF7F6">
      <Sidebar />
      <Box flex={1} p={10}>
        <Header />
        <AddProductForm product={product} handleChange={handleChange} handleAdd={handleAdd} />
        <ProductTable products={products} />
      </Box>
    </Flex>
  );
}
