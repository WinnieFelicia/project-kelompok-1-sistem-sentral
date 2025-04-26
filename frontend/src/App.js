import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import InventoryPage from './pages/InventoryPage';
import SupplierPage from './pages/SupplierPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
            <Routes>
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/supplier" element={<SupplierPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
