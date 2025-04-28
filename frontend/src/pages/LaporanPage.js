// src/pages/LaporanPage.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Input, Flex } from '@chakra-ui/react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <-- tambahkan ini!


const LaporanPage = () => {
  const [laporan, setLaporan] = useState([]);
  const [tanggalAwal, setTanggalAwal] = useState('');
  const [tanggalAkhir, setTanggalAkhir] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/laporan'); // pastikan backendmu punya endpoint ini
      setLaporan(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Laporan Data', 14, 20);
  
    const filteredData = laporan.filter(item => {
      if (!tanggalAwal || !tanggalAkhir) return true;
      const itemDate = new Date(item.createdAt);
      return itemDate >= new Date(tanggalAwal) && itemDate <= new Date(tanggalAkhir);
    });
  
    const tableData = filteredData.map((item, index) => [
      index + 1,
      item.nama || '-',
      item.keterangan || '-',
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'
    ]);

    autoTable(doc, {
        head: [['No', 'Nama', 'Keterangan', 'Tanggal']],
        body: tableData,
      });
      

    doc.save('laporan.pdf');
  };

  const filteredLaporan = laporan.filter(item => {
    if (!tanggalAwal || !tanggalAkhir) return true;
    const itemDate = new Date(item.createdAt);
    return itemDate >= new Date(tanggalAwal) && itemDate <= new Date(tanggalAkhir);
  });

  return (
    <Box p={6}>
      <Heading mb={4}>Data Laporan</Heading>

      <Flex mb={4} gap={4} align="center" flexWrap="wrap">
        <Input
          type="date"
          value={tanggalAwal}
          onChange={(e) => setTanggalAwal(e.target.value)}
          placeholder="Tanggal Awal"
          maxW="200px"
          bg="white"
        />
        <Input
          type="date"
          value={tanggalAkhir}
          onChange={(e) => setTanggalAkhir(e.target.value)}
          placeholder="Tanggal Akhir"
          maxW="200px"
          bg="white"
        />
        <Button colorScheme="red" onClick={handleExportPDF}>
          Cetak PDF
        </Button>
      </Flex>

      <Table variant="simple" bg="white" borderRadius="md" boxShadow="md">
        <Thead bg="gray.100">
          <Tr>
            <Th>No</Th>
            <Th>Nama</Th>
            <Th>Keterangan</Th>
            <Th>Tanggal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredLaporan.map((item, index) => (
            <Tr key={item._id}>
              <Td>{index + 1}</Td>
              <Td>{item.nama || '-'}</Td>
              <Td>{item.keterangan || '-'}</Td>
              <Td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LaporanPage;
