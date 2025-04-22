import React from 'react';
import { Box, Heading, VStack, Flex, Icon, Spacer } from '@chakra-ui/react';
import { FiHome, FiBox, FiBarChart2, FiUser, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <Box w="250px" bg="white" p={5} shadow="md">
      <Heading size="md" color="red.600" mb={10}>Sental Data</Heading>
      <VStack align="start" spacing={5} fontSize="md">
        <Flex align="center" gap={3}><Icon as={FiHome} /> Dashboard</Flex>
        <Flex align="center" gap={3}><Icon as={FiBox} /> Inventory</Flex>
        <Flex align="center" gap={3}><Icon as={FiBarChart2} /> Reports</Flex>
        <Flex align="center" gap={3}><Icon as={FiUser} /> Suppliers</Flex>
        <Flex align="center" gap={3}><Icon as={FiFileText} /> Orders</Flex>
        <Flex align="center" gap={3}><Icon as={FiFileText} /> Manage Store</Flex>
      </VStack>
      <Spacer my={10} />
      <VStack align="start" spacing={5}>
        <Flex align="center" gap={3}><Icon as={FiSettings} /> Settings</Flex>
        <Flex align="center" gap={3}><Icon as={FiLogOut} /> Log Out</Flex>
      </VStack>
    </Box>
  );
}