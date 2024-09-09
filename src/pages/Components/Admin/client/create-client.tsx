import React, { useState } from 'react';
import { Tabs,  TabsContent, TabsList, TabsTrigger  } from '../../../../components/ui/tabs';
import { Button } from '../../../../components/ui/button';
import { ClientForm } from './client-form';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { DataTable } from '../../Table/data-table';
import { appointmentTableData as Data } from '../../mock/dashboard-data';

import { 
  ColumnDef,
  useReactTable,
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'

const ClientTable = () => {

  type Application = {
    appointmentId: string
    companyName: string
    serviceType: string[]
    status: string
    time: string
    date: string
  }

  const columns: ColumnDef<Application>[] = [
    {
      accessorKey: "appointmentId",
      header: "Appointment ID",
    },
    {
      accessorKey: "companyName",
      header: "Company's Name",
    },
    {
      accessorKey: "serviceType",
      header: "Services",
      cell: ({ row }) => row.original.serviceType.join(', '),
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => row.original.time || 'N/A',
    },
    {
      accessorKey: "date",
      header: "Submission Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      header: "actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" onClick={() => console.log(row.original)}>
            View
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data: Data,
    columns,
    state: {
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return(
    <div className=''>
      <DataTable columns={columns} table={table} />
    </div>
  )
}


const CreateClientComponent = ({ client, onClose }) => {
  const [clientData, setClientData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    additionalInfo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Client data submitted:', clientData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex justify-between ">
        <nav className='flex gap-2 items-center' onClick={onClose}>
          <ArrowLeftCircleIcon />
          <h2 className="text-2xl font-bold hidden sm:inline">{client.clientName}</h2>
        </nav>
        <Button variant="destructive">Deactivate client</Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="clientInfo" className="w-full space-y-6">
          <TabsList className="flex justify-start bg-[#fffff] gap-1 ">
            <TabsTrigger  value="clientInfo" className='rounded-none border-b-2 data-[state=active]:border-b-[#C1FA6B] '>Client Information</TabsTrigger>
            <TabsTrigger value="applications" className='rounded-none border-b-2  data-[state=active]:border-b-[#C1FA6B]'>Applications</TabsTrigger>
            <TabsTrigger value="appointments" className='rounded-none border-b-2  data-[state=active]:border-b-[#C1FA6B]'>Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clientInfo" className="space-y-4 max-w-md mx-auto">
            <ClientForm />
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-4 max-w-md mx-auto">
            <ClientForm />
          </TabsContent>
          
          <TabsContent value="appointments">
            {/* Add appointment-related fields here */}
            <ClientTable />
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default CreateClientComponent;