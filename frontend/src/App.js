import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SupplierPage from './pages/SupplierPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/suppliers" element={<SupplierPage />} />
        {/* Tambah routing lain sesuai kebutuhan */}
      </Routes>
    </Router>
  );
}

export default App;
