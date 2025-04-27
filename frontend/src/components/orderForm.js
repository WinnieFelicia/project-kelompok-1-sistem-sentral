import { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, useDisclosure
} from '@chakra-ui/react';

const OrderForm = ({ onAdd, onUpdate, editingOrder, clearEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    orderID: '',
    Tanggal: '',
    Supplier: '',
    Produk: '',
    Kuantitas: '',
    Harga: '',
    Total: '',
    Pembayaran: ''
  });

  useEffect(() => {
    if (editingOrder) {
      setFormData(editingOrder);
      onOpen();
    }
  }, [editingOrder, onOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingOrder) {
      onUpdate(editingOrder._id, formData);
      clearEdit();
    } else {
      onAdd(formData);
    }
    setFormData({ orderID: '', Tanggal: '', Supplier: '', Produk: '', Kuantitas: '', Harga: '', Total: '', Pembayaran: '' });
    onClose();
  };

  const handleClose = () => {
    clearEdit();
    setFormData({ orderID: '', Tanggal: '', Supplier: '', Produk: '', Kuantitas: '', Harga: '', Total: '', Pembayaran: '' });
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>Add Order</Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingOrder ? 'Edit order' : 'Add Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {['orderID', 'Tanggal', 'Supplier', 'Produk', 'Kuantitas', 'Harga', 'Total', 'Pembayaran'].map((field) => (
              <FormControl key={field} mb={3}>
                <FormLabel>{field.replace(/([A-Z])/g, ' $1')}</FormLabel>
                <Input name={field} value={formData[field]} onChange={handleChange} />
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="teal" mr={3}>
              {editingOrder ? 'Update' : 'Add'}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderForm;
