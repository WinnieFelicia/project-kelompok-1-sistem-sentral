import React, { useState } from 'react';
import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, Text, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


export default function LaporanPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orders, setOrders] = useState([]);

  const fetchReport = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/report?start=${startDate}&end=${endDate}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };
  
  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape', // Biar tabel lebih lebar, opsional
      unit: 'pt',
      format: 'A4',
    });
  
    // Judul Laporan
    doc.setFontSize(18);
    doc.text('Order Report', 40, 40);
  
    // Isi tabel
    autoTable(doc, {
      startY: 60,
      head: [[
        'Order ID', 'Date', 'Supplier', 'Product', 'Quantity', 'Price', 'Total', 'Payment'
      ]],
      body: orders.map(order => [
        order.orderID,
        new Date(order.date).toLocaleDateString(),
        order.supplier,
        order.product,
        order.quantity,
        order.price,
        order.total,
        order.payment,
      ]),
      theme: 'striped', // Ada warna belang putih-abu, kelihatan rapi
      headStyles: {
        fillColor: [32, 122, 183], // Biru untuk header
        textColor: 255, // Putih
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 10,
      },
      styles: {
        cellPadding: 6,
        overflow: 'linebreak',
        halign: 'center',
        valign: 'middle',
      },
      didDrawPage: (data) => {
        // Footer nomor halaman
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height || pageSize.getHeight();
        doc.setFontSize(10);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageSize.width - 50, pageHeight - 20);
      },
    });
  
    // Save file
    doc.save('order-report.pdf');
  };
  

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Order Report
      </Text>

      <Flex mb={4} gap={4}>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
          width="200px"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
          width="200px"
        />
        <Button colorScheme="blue" onClick={fetchReport}>
          Generate Report
        </Button>
        <Button colorScheme="green" onClick={downloadPDF} isDisabled={orders.length === 0}>
          Download PDF
        </Button>
      </Flex>

      <Table variant="simple" size="md">
        <Thead bg="gray.100">
          <Tr>
            <Th>Order ID</Th>
            <Th>Date</Th>
            <Th>Supplier</Th>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Total</Th>
            <Th>Payment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order._id}>
              <Td>{order.orderID}</Td>
              <Td>{new Date(order.date).toLocaleDateString()}</Td>
              <Td>{order.supplier}</Td>
              <Td>{order.product}</Td>
              <Td>{order.quantity}</Td>
              <Td>{order.price}</Td>
              <Td>{order.total}</Td>
              <Td>{order.payment}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
