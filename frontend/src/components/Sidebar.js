import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Supplier', path: '/supplier' },
    { name: 'Order', path: '/order' },
    { name: 'Laporan', path: '/laporan' },
  ];

  // Fungsi untuk Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete axios.defaults.headers.common['Authorization'];

    navigate('/login', { replace: true });
  };

  return (
    <Box
      w="250px"
      bg="primary" // Warna utama
      color="white"
      h="100vh"
      position="fixed"
      p={5}
      display="flex"
      flexDirection="column"
    >
      <Text fontSize="2xl" mb={10} fontWeight="bold">
        Sentral Data
      </Text>

      <VStack spacing={4} align="stretch" flex="1">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            style={({ isActive }) => ({
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: isActive ? '#1A202C' : 'transparent', // aktif = dark
              textDecoration: 'none',
              color: 'white',
            })}
          >
            {item.name}
          </NavLink>
        ))}
      </VStack>

      {/* Tombol Logout di bawah */}
      <Button
        colorScheme="red"
        mt={4}
        onClick={handleLogout}
        w="full"
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
