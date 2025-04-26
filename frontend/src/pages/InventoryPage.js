import { useEffect, useState } from 'react';
import { getInventories, addInventory, updateInventory, deleteInventory } from '../services/inventoryService';
import InventoryTable from '../components/InventoryTable';
import InventoryForm from '../components/InventoryForm';
import { Box, Heading, useToast } from '@chakra-ui/react';

const InventoryPage = () => {
  const [inventories, setInventories] = useState([]);
  const [editingInventory, setEditingInventory] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    const data = await getInventories();
    setInventories(data);
  };

  const handleAddInventory = async (inventory) => {
    await addInventory(inventory);
    fetchInventories();
    toast({ title: 'Product added!', status: 'success', duration: 2000, isClosable: true });
  };

  const handleUpdateInventory = async (id, inventory) => {
    await updateInventory(id, inventory);
    fetchInventories();
    toast({ title: 'Product updated!', status: 'success', duration: 2000, isClosable: true });
  };

  const handleDeleteInventory = async (id) => {
    if (window.confirm('Are you sure want to delete this item?')) {
      await deleteInventory(id);
      fetchInventories();
      toast({ title: 'Product deleted!', status: 'error', duration: 2000, isClosable: true });
    }
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Inventory - Data Produk</Heading>
      <InventoryForm
        onAdd={handleAddInventory}
        onUpdate={handleUpdateInventory}
        editingInventory={editingInventory}
        clearEdit={() => setEditingInventory(null)}
      />
      <InventoryTable
        inventories={inventories}
        onEdit={setEditingInventory}
        onDelete={handleDeleteInventory}
      />
    </Box>
  );
};

export default InventoryPage;
