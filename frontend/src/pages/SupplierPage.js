import { useEffect, useState } from 'react';
import { Box, Button, Heading, HStack, Select, useToast } from '@chakra-ui/react';
import SupplierTable from '../components/SupplierTable';
import SupplierForm from '../components/SupplierForm';
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../services/supplierService';

const SupplierPage = () => {
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const toast = useToast();

  const fetchSuppliers = async () => {
    const res = await getSuppliers();
    setFilteredSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAdd = () => {
    setEditingSupplier(null);
    setIsOpen(true);
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      fetchSuppliers();
      toast({
        title: "Supplier Dihapus.",
        description: "Supplier telah berhasil dihapus.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Gagal Menghapus Supplier.",
        description: "Terjadi kesalahan saat menghapus supplier.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (supplier) => {
    if (editingSupplier) {
      await updateSupplier(editingSupplier._id, supplier);
    } else {
      await addSupplier(supplier);
    }
    fetchSuppliers();
  };

  const handleSortSupplier = (order) => {
    let sorted = [...filteredSuppliers];
    if (order === 'asc') {
      sorted.sort((a, b) => a.supplierName.localeCompare(b.supplierName));
    } else if (order === 'desc') {
      sorted.sort((a, b) => b.supplierName.localeCompare(a.supplierName));
    }
    setFilteredSuppliers(sorted);
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Data Supplier</Heading>

      <HStack justifyContent="space-between" mb={4}>
        <Button colorScheme="orange" onClick={handleAdd}>
          Tambah Supplier
        </Button>

        <Select
          placeholder="Filter Supplier"
          maxW="200px"
          onChange={(e) => handleSortSupplier(e.target.value)}
        >
          <option value="asc">A - Z Supplier</option>
          <option value="desc">Z - A Supplier</option>
        </Select>
      </HStack>

      <SupplierTable suppliers={filteredSuppliers} onEdit={handleEdit} onDelete={handleDelete} />
      
      <SupplierForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingSupplier}
      />
    </Box>
  );
};

export default SupplierPage;
