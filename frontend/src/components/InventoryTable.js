import { Table, Thead, Tbody, Tr, Th, Td, Button, HStack } from '@chakra-ui/react';

const InventoryTable = ({ inventories, onEdit, onDelete }) => {
  return (
    <Table variant="simple" mt={5}>
      <Thead>
        <Tr>
          <Th>Kode Produk</Th>
          <Th>Nama Produk</Th>
          <Th>Kategori</Th>
          <Th>Harga/pcs</Th>
          <Th>Stok</Th>
          <Th>Minimum Stok</Th>
          <Th>Aksi</Th>
        </Tr>
      </Thead>
      <Tbody>
        {inventories.map((item) => (
          <Tr key={item._id}>
            <Td>{item.kodeProduk}</Td>
            <Td>{item.namaProduk}</Td>
            <Td>{item.kategori}</Td>
            <Td>Rp {item.harga.toLocaleString()}</Td>
            <Td>{item.stok}</Td>
            <Td>{item.batasMinimumStok}</Td>
            <Td>
              <HStack>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  onClick={() => onEdit(item)}
                  _hover={{ bg: 'accent' }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDelete(item._id)}
                  _hover={{ bg: 'secondary' }}
                >
                  Delete
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default InventoryTable;
