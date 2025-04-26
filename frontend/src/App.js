// src/App.js
import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import theme from './theme';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import InventoryPage from './pages/InventoryPage';
import SupplierPage from './pages/SupplierPage';

function AppLayout() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box ml="250px" p="20px" w="full">
        <Outlet />
      </Box>
    </Box>
  );
}

// Set axios default header if token exists (on page reload)
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Logout route (optional) */}
          <Route path="/logout" element={<LogoutPage />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/inventory" replace />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="supplier" element={<SupplierPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
