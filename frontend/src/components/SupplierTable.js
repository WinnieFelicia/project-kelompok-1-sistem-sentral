import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function SupplierTable({ suppliers }) {
  return (
    <Table variant="simple" bg="white" shadow="md" borderRadius="md">
      <Thead bg="red.500">
        <Tr>
          <Th color="white">ID</Th>
          <Th color="white">Nama</Th>
          <Th color="white">Kontak</Th>
          <Th color="white">Alamat</Th>
        </Tr>
      </Thead>
      <Tbody>
        {suppliers.map((supplier, index) => (
          <Tr key={index}>
            <Td>{supplier.supplierId}</Td>
            <Td>{supplier.name}</Td>
            <Td>{supplier.contact}</Td>
            <Td>{supplier.address}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
