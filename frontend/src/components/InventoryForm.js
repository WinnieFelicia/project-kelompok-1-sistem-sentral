import { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, useDisclosure
} from '@chakra-ui/react';

const InventoryForm = ({ onAdd, onUpdate, editingInventory, clearEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    kodeProduk: '',
    namaProduk: '',
    kategori: '',
    harga: '',
    stok: '',
    batasMinimumStok: ''
  });

  useEffect(() => {
    if (editingInventory) {
      setFormData(editingInventory);
      onOpen();
    }
  }, [editingInventory, onOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingInventory) {
      onUpdate(editingInventory._id, formData);
      clearEdit();
    } else {
      onAdd(formData);
    }
    setFormData({ kodeProduk: '', namaProduk: '', kategori: '', harga: '', stok: '', batasMinimumStok: '' });
    onClose();
  };

  const handleClose = () => {
    clearEdit();
    setFormData({ kodeProduk: '', namaProduk: '', kategori: '', harga: '', stok: '', batasMinimumStok: '' });
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>Add Product</Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingInventory ? 'Edit Inventory' : 'Add Inventory'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {['kodeProduk', 'namaProduk', 'kategori', 'harga', 'stok', 'batasMinimumStok'].map((field) => (
              <FormControl key={field} mb={3}>
                <FormLabel>{field.replace(/([A-Z])/g, ' $1')}</FormLabel>
                <Input name={field} value={formData[field]} onChange={handleChange} />
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="teal" mr={3}>
              {editingInventory ? 'Update' : 'Add'}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InventoryForm;
