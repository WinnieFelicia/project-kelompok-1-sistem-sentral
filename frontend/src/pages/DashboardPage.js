// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Divider } from '@chakra-ui/react';
import axios from 'axios';

const DashboardPage = () => {
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const inventoryRes = await axios.get('/api/inventory');
      const supplierRes = await axios.get('/api/supplier');
      const orderRes = await axios.get('/api/order');

      setInventory(inventoryRes.data);
      setSuppliers(supplierRes.data);
      setOrders(orderRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Dashboard Sistem Sentral</Heading>

      {/* Section Inventory */}
      <Heading size="md" mb={4}>Data Inventory</Heading>
      <Table variant="simple" bg="white" borderRadius="md" boxShadow="md" mb={10}>
        <Thead bg="gray.100">
          <Tr>
            <Th>ID Barang</Th>
            <Th>Nama Barang</Th>
            <Th>Stok</Th>
            <Th>Harga</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventory.map((item) => (
            <Tr key={item._id}>
              <Td>{item.id_barang}</Td>
              <Td>{item.nama_barang}</Td>
              <Td>{item.stok}</Td>
              <Td>{item.harga}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Divider my={10} />

      {/* Section Supplier */}
      <Heading size="md" mb={4}>Data Supplier</Heading>
      <Table variant="simple" bg="white" borderRadius="md" boxShadow="md" mb={10}>
        <Thead bg="gray.100">
          <Tr>
            <Th>ID Supplier</Th>
            <Th>Nama Supplier</Th>
            <Th>Nomor Kontak</Th>
            <Th>Alamat</Th>
          </Tr>
        </Thead>
        <Tbody>
          {suppliers.map((supplier) => (
            <Tr key={supplier._id}>
              <Td>{supplier.id_supplier}</Td>
              <Td>{supplier.nama_supplier}</Td>
              <Td>{supplier.nomor_kontak}</Td>
              <Td>{supplier.alamat}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Divider my={10} />

      {/* Section Order */}
      <Heading size="md" mb={4}>Data Order</Heading>
      <Table variant="simple" bg="white" borderRadius="md" boxShadow="md">
        <Thead bg="gray.100">
          <Tr>
            <Th>ID Order</Th>
            <Th>Nama Barang</Th>
            <Th>Jumlah</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order._id}>
              <Td>{order.id_order}</Td>
              <Td>{order.nama_barang}</Td>
              <Td>{order.jumlah}</Td>
              <Td>{order.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DashboardPage;
