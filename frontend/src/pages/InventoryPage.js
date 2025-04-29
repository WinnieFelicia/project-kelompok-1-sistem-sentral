import { useEffect, useState } from 'react';
import { getInventories, addInventory, updateInventory, deleteInventory } from '../services/inventoryService';
import InventoryTable from '../components/InventoryTable';
import InventoryForm from '../components/InventoryForm';
import { Box, Heading, HStack, Select, useToast } from '@chakra-ui/react';

const InventoryPage = () => {
  const [filteredInventories, setFilteredInventories] = useState([]);
  const [editingInventory, setEditingInventory] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    const data = await getInventories();
    setFilteredInventories(data);
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

  const handleSortProduct = (order) => {
    let sorted = [...filteredInventories];
    if (order === 'asc') {
      sorted.sort((a, b) => a.namaProduk.localeCompare(b.namaProduk));
    } else if (order === 'desc') {
      sorted.sort((a, b) => b.namaProduk.localeCompare(a.namaProduk));
    }
    setFilteredInventories(sorted);
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Inventory - Data Produk</Heading>

      <HStack justifyContent="space-between" mb={5}>
        <InventoryForm
          onAdd={handleAddInventory}
          onUpdate={handleUpdateInventory}
          editingInventory={editingInventory}
          clearEdit={() => setEditingInventory(null)}
        />

        <Select
          placeholder="Filter"
          maxW="200px"
          onChange={(e) => handleSortProduct(e.target.value)}
        >
          <option value="asc">A - Z Produk</option>
          <option value="desc">Z - A Produk</option>
        </Select>
      </HStack>

      <InventoryTable
        inventories={filteredInventories}
        onEdit={setEditingInventory}
        onDelete={handleDeleteInventory}
      />
    </Box>
  );
};

export default InventoryPage;
