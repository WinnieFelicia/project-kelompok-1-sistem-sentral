import { useEffect, useState } from 'react';
import { Box, Heading, HStack, Select, useToast, useDisclosure } from '@chakra-ui/react';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../services/orderService';
import OrderForm from '../components/orderForm';
import OrderTable from '../components/orderTable';

const OrderPage = () => {
  const [filteredOrders, setFilteredOrders] = useState([]); 
  const [editingOrder, setEditingOrder] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddOrder = async (order) => {
    try {
      await addOrder(order);
      fetchOrders();
      toast({ title: 'Order berhasil ditambahkan!', status: 'success', duration: 2000, isClosable: true });
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleUpdateOrder = async (id, order) => {
    try {
      await updateOrder(id, order);
      fetchOrders();
      setEditingOrder(null);
      toast({ title: 'Order berhasil diupdate!', status: 'success', duration: 2000, isClosable: true });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus order ini?')) {
      try {
        await deleteOrder(id);
        fetchOrders();
        toast({ title: 'Order berhasil dihapus!', status: 'error', duration: 2000, isClosable: true });
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    onOpen();
  };

  const handleSortProduct = (order) => {
    let sorted = [...filteredOrders];
    if (order === 'asc') {
      sorted.sort((a, b) => a.product.localeCompare(b.product));
    } else if (order === 'desc') {
      sorted.sort((a, b) => b.product.localeCompare(a.product));
    }
    setFilteredOrders(sorted);
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Order - Data Pesanan</Heading>

      <HStack justifyContent="space-between" mb={5}>
        <OrderForm
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          onAdd={handleAddOrder}
          onUpdate={handleUpdateOrder}
          editingOrder={editingOrder}
          clearEdit={() => setEditingOrder(null)}
        />
        <Select
          placeholder="Filter Order"
          maxW="200px"
          onChange={(e) => handleSortProduct(e.target.value)}
        >
          <option value="asc">A - Z Produk</option>
          <option value="desc">Z - A Produk</option>
        </Select>
      </HStack>

      <OrderTable
        orders={filteredOrders}
        onEdit={handleEdit}
        onDelete={handleDeleteOrder}
      />
    </Box>
  );
};

export default OrderPage;
