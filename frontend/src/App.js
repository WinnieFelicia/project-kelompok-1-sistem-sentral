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
import OrderPage from './pages/OrderPage';
import ReportPage from './pages/ReportPage'; 
import DashboardPage from './pages/DashboardPage';


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

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="laporan" element={<ReportPage />} /> 
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
