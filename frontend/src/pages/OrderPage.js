import { useEffect, useState } from 'react';
import { Box, Heading, useToast } from '@chakra-ui/react';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../services/orderService';
import OrderForm from '../components/orderForm';
import OrderTable from '../components/orderTable';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
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

  return (
    <Box p={5}>
      <Heading mb={5}>Order - Data Pesanan</Heading>
      
      <OrderForm
        onAdd={handleAddOrder}
        onUpdate={handleUpdateOrder}
        editingOrder={editingOrder}
        clearEdit={() => setEditingOrder(null)}
      />
      
      <OrderTable
        orders={orders}
        onEdit={setEditingOrder}
        onDelete={handleDeleteOrder}
      />
    </Box>
  );
};

export default OrderPage;
