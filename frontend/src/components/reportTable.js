import React from 'react';

const ReportTable = ({ reports }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Supplier</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((order) => (
          <tr key={order._id}>
            <td>{order.orderID}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>{order.supplier}</td>
            <td>{order.product}</td>
            <td>{order.quantity}</td>
            <td>{order.price}</td>
            <td>{order.total}</td>
            <td>{order.payment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
