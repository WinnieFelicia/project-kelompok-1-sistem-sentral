import { useState, useEffect } from 'react';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../services/orderService';
import OrderForm from '../components/orderForm';
import OrderTable from '../components/orderTable';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAdd = async (newOrder) => {
    try {
      await addOrder(newOrder);
      fetchOrders();
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleUpdate = async (id, updatedOrder) => {
    try {
      await updateOrder(id, updatedOrder);
      fetchOrders();
      setEditingOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <OrderForm 
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingOrder={editingOrder}
        clearEdit={() => setEditingOrder(null)}
      />
      <OrderTable 
        orders={orders}
        onEdit={setEditingOrder}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OrderPage;