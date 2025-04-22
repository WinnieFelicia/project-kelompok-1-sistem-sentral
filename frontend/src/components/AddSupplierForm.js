import React from 'react';
import { Box, Input, Button, Stack, FormControl, FormLabel } from '@chakra-ui/react';

export default function AddSupplierForm({ supplier, handleChange, handleAdd }) {
  return (
    <Box bg="white" p={5} mb={5} borderRadius="md" shadow="md">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Supplier ID</FormLabel>
          <Input name="supplierId" value={supplier.supplierId} onChange={handleChange} placeholder="SUP001" />
        </FormControl>
        <FormControl>
          <FormLabel>Nama Supplier</FormLabel>
          <Input name="name" value={supplier.name} onChange={handleChange} placeholder="PT. Sumber Makmur" />
        </FormControl>
        <FormControl>
          <FormLabel>Kontak</FormLabel>
          <Input name="contact" value={supplier.contact} onChange={handleChange} placeholder="0812xxxxxxx" />
        </FormControl>
        <FormControl>
          <FormLabel>Alamat</FormLabel>
          <Input name="address" value={supplier.address} onChange={handleChange} placeholder="Jl. Sudirman No. 123" />
        </FormControl>
        <Button colorScheme="red" onClick={handleAdd}>Tambah Supplier</Button>
      </Stack>
    </Box>
  );
}
