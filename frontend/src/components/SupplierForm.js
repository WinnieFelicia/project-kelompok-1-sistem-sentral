import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const SupplierForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [supplier, setSupplier] = useState({
    supplierId: '',
    supplierName: '',
    contactNumber: '',
    address: '',
  });

  useEffect(() => {
    if (initialData) {
      setSupplier(initialData);
    } else {
      setSupplier({
        supplierId: '',
        supplierName: '',
        contactNumber: '',
        address: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(supplier);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Supplier' : 'Tambah Supplier'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            <Input placeholder="ID Supplier" name="supplierId" value={supplier.supplierId} onChange={handleChange} />
            <Input placeholder="Nama Supplier" name="supplierName" value={supplier.supplierName} onChange={handleChange} />
            <Input placeholder="Nomor Kontak" name="contactNumber" value={supplier.contactNumber} onChange={handleChange} />
            <Input placeholder="Alamat" name="address" value={supplier.address} onChange={handleChange} />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="orange" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SupplierForm;
