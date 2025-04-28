import { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, useDisclosure
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
  const [suppliers, setSuppliers] = useState([]);
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    if (editingOrder) {
      setFormData(editingOrder);
      onOpen();
    }

    const fetchSuppliers = async () => {
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    };

    const fetchInventories = async () => {
      const response = await fetch('/api/inventory'); // pastikan endpoint ini ada
      const data = await response.json();
      setInventories(data);
    };

    fetchSuppliers();
    fetchInventories();
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
    resetForm();
    onClose();
    clearEdit();
  };

  const handleClose = () => {
    resetForm();
    onClose();
    clearEdit();
  };

  const resetForm = () => {
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
            {Object.keys(formData).map((field) => {
              if (field === 'supplier') {
                return (
                  <FormControl key={field} mb={3}>
                    <FormLabel>Supplier</FormLabel>
                    <Select
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier._id} value={supplier.supplierName}>
                          {supplier.supplierName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              if (field === 'product') {
                return (
                  <FormControl key={field} mb={3}>
                    <FormLabel>Product</FormLabel>
                    <Select
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    >
                      <option value="">Select Product</option>
                      {inventories.map(product => (
                        <option key={product._id} value={product.productName}>
                          {product.productName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              return (
                <FormControl key={field} mb={3}>
                  <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                  <Input
                    type={field === 'date' ? 'date' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </FormControl>
              );
            })}
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