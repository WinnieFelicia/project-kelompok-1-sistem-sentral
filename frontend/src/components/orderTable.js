import { Table, Thead, Tbody, Tr, Th, Td, Button, HStack } from '@chakra-ui/react';

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <Table variant="simple" mt={5}>
      <Thead>
        <Tr>
          <Th>Order ID</Th>
          <Th>Tanggal</Th>
          <Th>Supplier</Th>
          <Th>Produk</Th>
          <Th>Kuantitas</Th>
          <Th>Harga</Th>
          <Th>Total</Th>
          <Th>Pembayaran</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((item) => (
          <Tr key={item._orderID}>
            <Td>{item.orderID}</Td>
            <Td>{item.date}</Td>
            <Td>{item.supplier}</Td>
            <Td>{item.product}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.price}</Td>
            <Td>{item.total}</Td>
            <Td>{item.payment}</Td>
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

export default OrderTable;
