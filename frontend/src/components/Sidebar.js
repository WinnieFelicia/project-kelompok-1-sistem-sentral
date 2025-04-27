import { Box, VStack, Link, Text, Button } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Inventory', path: '/inventory' },
    { name: 'Supplier', path: '/supplier' },
    { name: 'Order', path: '/order' },
  ];

  // Fungsi untuk Logout
  const handleLogout = () => {
    // Hapus data auth dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete axios.defaults.headers.common['Authorization'];

    // Redirect ke halaman login
    navigate('/login', { replace: true });
  };

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

      {/* Tombol Logout */}
      <Button
        mt="auto"
        colorScheme="red"
        variant="solid"
        onClick={handleLogout}
        w="full"
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
