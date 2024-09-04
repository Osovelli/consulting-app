// DataTable.js
import { useState, useEffect } from 'react';
import { DataTable, DataTableColumnDefinition } from '@/components/ui/data-table';
import Data
import { Button } from '@/components/ui/button';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filterText, setFilterText] = useState('');

  // Fetch the data when the component mounts
  useEffect(() => {
    // Fetch data from an API or a mock data source
    const fetchData = async () => {
      const response = await fetch('/api/dashboard-data');
      const data = await response.json();
      setData([...data.pendingApplications, ...data.upcomingAppointments]);
    };
    fetchData();
  }, []);

  const columnDefinitions: DataTableColumnDefinition[] = [
    {
      id: 'id',
      header: 'ID',
      accessor: (item) => item.id,
      sortable: true,
    },
    {
      id: 'clientName',
      header: 'Client Name',
      accessor: (item) => item.clientName,
      sortable: true,
    },
    {
      id: 'serviceType',
      header: 'Service Type',
      accessor: (item) => item.serviceType.join(', '),
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessor: (item) => item.status,
      sortable: true,
    },
    {
      id: 'submissionDate',
      header: 'Submission Date',
      accessor: (item) => item.submissionDate,
      sortable: true,
    },
    {
      id: 'action',
      header: 'Action',
      accessor: (item) => (
        <Button variant="link">View</Button>
      ),
    },
  ];

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  filteredData.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filter..."
          value={filterText}
          onChange={handleFilter}
          className="border rounded px-2 py-1"
        />
        <Button>+ New Application</Button>
      </div>
      <DataTable
        data={filteredData}
        columns={columnDefinitions}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
};

export default DataTable;