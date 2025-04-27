import { useEffect, useState } from 'react';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../services/orderService';
import OrderForm from '../components/orderForm';
import OrderTable from '../components/orderTable';
import { Box, Heading, useToast } from '@chakra-ui/react';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  const handleAddOrder = async (order) => {
    await addOrder(order);
    fetchOrders();
    toast({ title: 'Order added!', status: 'success', duration: 2000, isClosable: true });
  };

  const handleUpdateOrder = async (id, order) => {
    await updateOrder(id, order);
    fetchOrders();
    toast({ title: 'Order updated!', status: 'success', duration: 2000, isClosable: true });
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure want to delete this item?')) {
      await deleteOrder(id);
      fetchOrders();
      toast({ title: 'Order deleted!', status: 'error', duration: 2000, isClosable: true });
    }
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Order - Data Pesanan</Heading>
      <OrderForm
        onAdd={handleAddOrder}
        onUpdate={handleUpdateOrder}
        editingInventory={editingOrder}
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
