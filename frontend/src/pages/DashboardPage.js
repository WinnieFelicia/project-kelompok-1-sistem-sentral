import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

export default function DashboardPage() {
  const [inventories, setInventories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [inventoryRes, supplierRes, orderRes] = await Promise.all([
        axios.get('/api/inventory'),
        axios.get('/api/supplier'),
        axios.get('/api/order'),
      ]);

      // Menambahkan log untuk memeriksa data yang diterima
      console.log('Inventory:', inventoryRes.data);
      console.log('Supplier:', supplierRes.data);
      console.log('Order:', orderRes.data);

      setInventories(inventoryRes.data);
      setSuppliers(supplierRes.data);
      setOrders(orderRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  return (
    <Box>
      <Heading mb={6}>Dashboard Sistem Sentral</Heading>

      <Heading size="md" mt={8} mb={4}>Data Inventory</Heading>
      <Table variant="simple" bg="gray.50" borderRadius="md">
        <Thead>
          <Tr>
            <Th>Kode Produk</Th>
            <Th>Nama Produk</Th>
            <Th>Kategori</Th>
            <Th>Harga/Pcs</Th>
            <Th>Stok</Th>
            <Th>Minumum Stok</Th>
          </Tr>
        </Thead>
        <Tbody>
        {inventories.map((item) => (
          <Tr key={item._id}>
            <Td>{item.kodeProduk}</Td>
            <Td>{item.namaProduk}</Td>
            <Td>{item.kategori}</Td>
            <Td>Rp {item.harga.toLocaleString()}</Td>
            <Td>{item.stok}</Td>
            <Td>{item.batasMinimumStok}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Heading size="md" mt={8} mb={4}>Data Supplier</Heading>
      <Table variant="simple" bg="gray.50" borderRadius="md">
        <Thead>
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
            <Td>{supplier.supplierId}</Td>
            <Td>{supplier.supplierName}</Td>
            <Td>{supplier.contactNumber}</Td>
            <Td>{supplier.address}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Heading size="md" mt={8} mb={4}>Data Order</Heading>
      <Table variant="simple" bg="gray.50" borderRadius="md">
        <Thead>
          <Tr>
            <Th>ID Order</Th>
            <Th>Tanggal</Th>
            <Th>Supplier</Th>
            <Th>Produk</Th>
            <Th>Kuantitas</Th>
            <Th>Harga</Th>
            <Th>Total</Th>
            <Th>Status Pembayaran</Th>
          </Tr>
        </Thead>
        <Tbody>
        {orders.map((order) => (
          <Tr key={order._id}>
            <Td>{order.orderID}</Td>
            <Td>{order.date}</Td>
            <Td>{order.supplier}</Td>
            <Td>{order.product}</Td>
            <Td>{order.quantity}</Td>
            <Td>{order.price}</Td>
            <Td>{order.total}</Td>
            <Td>{order.payment}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
