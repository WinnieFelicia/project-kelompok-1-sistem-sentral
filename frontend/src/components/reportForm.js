import React, { useState } from 'react';

const ReportForm = ({ onSearch }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Generate Report</button>
    </form>
  );
};

export default ReportForm;
