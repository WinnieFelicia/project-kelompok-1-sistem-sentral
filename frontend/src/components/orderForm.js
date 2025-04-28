import { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, useDisclosure
} from '@chakra-ui/react';

const OrderForm = ({ onAdd, onUpdate, editingOrder, clearEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    orderID: '',
    date: '',
    supplier: '',
    product: '',
    quantity: '',
    price: '',
    total: '',
    payment: ''
  });

  useEffect(() => {
    if (editingOrder) {
      setFormData(editingOrder);
      onOpen();
    }
  }, [editingOrder, onOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (editingOrder) {
      onUpdate(editingOrder._id, formData);
    } else {
      onAdd(formData);
    }
    setFormData({
      orderID: '',
      date: '',
      supplier: '',
      product: '',
      quantity: '',
      price: '',
      total: '',
      payment: ''
    });
    onClose();
    clearEdit();
  };

  const handleClose = () => {
    setFormData({
      orderID: '',
      date: '',
      supplier: '',
      product: '',
      quantity: '',
      price: '',
      total: '',
      payment: ''
    });
    onClose();
    clearEdit();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>Add Order</Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingOrder ? 'Edit Order' : 'Add Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {Object.keys(formData).map((field) => (
              <FormControl key={field} mb={3}>
                <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                <Input name={field} value={formData[field]} onChange={handleChange} />
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
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