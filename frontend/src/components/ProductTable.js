import React from 'react';
import { Box, Heading, Flex, IconButton, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';

export default function ProductTable({ products }) {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="sm">Products</Heading>
        <IconButton icon={<FiFilter />} aria-label="Filter" />
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>Unit Price</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <Tr key={p._id}>
                <Td>{p.description}</Td>
                <Td>{p.category}</Td>
                <Td>{p.unitPrice}</Td>
                <Td>{p.quantity}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">No Data</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
