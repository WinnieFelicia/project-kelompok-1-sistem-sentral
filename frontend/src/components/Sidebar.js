import React from 'react';
import { Box, Heading, VStack, Flex, Icon, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiHome, FiBox, FiBarChart2, FiUser, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <Box w="250px" bg="white" p={5} shadow="md">
      <Heading size="md" color="red.600" mb={10}>Sental Data</Heading>
      <VStack align="start" spacing={5} fontSize="md">
        <Link to="/"><Flex align="center" gap={3}><Icon as={FiHome} /> Dashboard</Flex></Link>
        <Link to="/inventory"><Flex align="center" gap={3}><Icon as={FiBox} /> Inventory</Flex></Link>
        <Link to="/reports"><Flex align="center" gap={3}><Icon as={FiBarChart2} /> Reports</Flex></Link>
        <Link to="/suppliers"><Flex align="center" gap={3}><Icon as={FiUser} /> Suppliers</Flex></Link>
        <Link to="/orders"><Flex align="center" gap={3}><Icon as={FiFileText} /> Orders</Flex></Link>
        <Link to="/store"><Flex align="center" gap={3}><Icon as={FiFileText} /> Manage Store</Flex></Link>
      </VStack>
      <Spacer my={10} />
      <VStack align="start" spacing={5}>
        <Link to="/settings"><Flex align="center" gap={3}><Icon as={FiSettings} /> Settings</Flex></Link>
        <Link to="/logout"><Flex align="center" gap={3}><Icon as={FiLogOut} /> Log Out</Flex></Link>
      </VStack>
    </Box>
  );
}
