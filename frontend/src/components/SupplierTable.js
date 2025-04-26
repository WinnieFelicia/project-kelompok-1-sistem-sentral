import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const SupplierTable = ({ suppliers, onEdit, onDelete }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID Supplier</Th>
          <Th>Nama Supplier</Th>
          <Th>Nomor Kontak</Th>
          <Th>Alamat</Th>
          <Th>Aksi</Th>
        </Tr>
      </Thead>
      <Tbody>
        {suppliers.map((supplier) => (
          <Tr key={supplier._id}>
            <Td>{supplier.supplierId}</Td>
            <Td>{supplier.supplierName}</Td>
            <Td>{supplier.contactNumber}</Td>
            <Td>{supplier.address}</Td>
            <Td>
              <Button size="sm" colorScheme="blue" mr={2} onClick={() => onEdit(supplier)}>
                Edit
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => onDelete(supplier._id)}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SupplierTable;
