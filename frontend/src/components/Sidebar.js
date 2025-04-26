import { Box, VStack, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Inventory', path: '/inventory' },
    { name: 'Supplier', path: '/supplier' },
  ];

  return (
    <Box
      w="250px"
      bg="primary"  // Warna utama merah
      color="white"
      h="100vh"
      position="fixed"
      p={5}
    >
      <Text fontSize="2xl" mb={10} fontWeight="bold">
        Sentral Data
      </Text>
      <VStack spacing={4} align="stretch">
        {navItems.map((item) => (
          <Link
            as={NavLink}
            to={item.path}
            key={item.name}
            _hover={{ textDecoration: 'none', bg: 'accent' }} // Warna biru terang pas hover
            p={2}
            borderRadius="md"
            _activeLink={{ bg: 'secondary' }}  // Warna biru tua pas aktif
          >
            {item.name}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
