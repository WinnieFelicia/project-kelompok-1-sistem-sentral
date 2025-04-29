import { useEffect, useState } from 'react';
import { getInventories } from '../services/inventoryService';
import {
  Box,
  Button,
  Heading,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Text,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const DashboardInventory = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInventories = async () => {
    try {
      setLoading(true);
      const data = await getInventories();
      setInventories(data);
    } catch (error) {
      console.error('Gagal load data inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventories();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="70vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Dashboard Stok Produk</Heading>
        <Button onClick={loadInventories} colorScheme="blue">
          🔄 Refresh Data
        </Button>
      </Flex>

      <Heading size="md" mb={4}>Tabel Stok Produk</Heading>
      <TableContainer mb={8}>
        <Table variant="simple" size="md">
          <Thead bg="gray.100">
            <Tr>
              <Th>Kode Produk</Th>
              <Th>Nama Produk</Th>
              <Th>Kategori</Th>
              <Th isNumeric>Harga</Th>
              <Th isNumeric>Stok</Th>
              <Th isNumeric>Batas Minimum Stok</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventories.map((item) => {
              const isLowStock = item.stok <= item.batasMinimumStok;
              return (
                <Tr key={item._id}>
                  <Td>{item.kodeProduk}</Td>
                  <Td>{item.namaProduk}</Td>
                  <Td>{item.kategori}</Td>
                  <Td isNumeric>Rp{item.harga.toLocaleString()}</Td>
                  <Td isNumeric>
                    <Text color={isLowStock ? 'red.500' : 'black'}>
                      {item.stok}
                    </Text>
                  </Td>
                  <Td isNumeric>{item.batasMinimumStok}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Heading size="md" mb={4}>Grafik Stok Produk</Heading>
      <Box width="100%" height="400px">
        <ResponsiveContainer>
          <BarChart data={inventories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="namaProduk" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stok" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DashboardInventory;
