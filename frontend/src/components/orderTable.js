import { Table, Thead, Tbody, Tr, Th, Td, Button, HStack } from '@chakra-ui/react';

const OrderTable = ({ orders = [], onEdit, onDelete }) => {
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
          <Th>Aksi</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order._id}>
            <Td>{order.orderID}</Td>
            <Td>{order.date}</Td>
            <Td>{order.supplier}</Td>
            <Td>{order.product}</Td>
            <Td>{order.quantity}</Td>
            <Td>{order.price}</Td>
            <Td>{order.total}</Td>
            <Td>{order.payment}</Td>
            <Td>
              <HStack>
                <Button size="sm" colorScheme="yellow" onClick={() => onEdit(order)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => onDelete(order._id)}>
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