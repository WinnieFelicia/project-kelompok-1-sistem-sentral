import React from 'react';
import { Box, Heading, Flex, Input, HStack, Button } from '@chakra-ui/react';

export default function AddProductForm({ product, handleChange, handleAdd }) {
  return (
    <Box bg="white" p={6} borderRadius="xl" shadow="sm" mb={8}>
      <Heading size="md" mb={4}>Add Product</Heading>
      <Flex gap={4} flexWrap="wrap">
        <Input placeholder="Description" name="description" value={product.description} onChange={handleChange} />
        <Input placeholder="Category" name="category" value={product.category} onChange={handleChange} />
        <Input placeholder="Unit Price" name="unitPrice" value={product.unitPrice} onChange={handleChange} type="number" />
        <Input placeholder="Quantity" name="quantity" value={product.quantity} onChange={handleChange} type="number" />
      </Flex>
      <HStack mt={6} justify="flex-end">
        <Button variant="outline">CANCEL</Button>
        <Button colorScheme="orange" onClick={handleAdd}>ADD</Button>
      </HStack>
    </Box>
  );
}