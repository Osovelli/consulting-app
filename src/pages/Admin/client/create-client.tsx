import React, { useState } from 'react';
import { Tabs,  TabsContent, TabsList, TabsTrigger  } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { ClientForm } from './client-form';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { DataTable } from '../../Components/Table/data-table';
import { appointmentTableData as Data } from '../../Components/mock/dashboard-data';
import { AdminAppointment } from '../appointment/appointment';

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
import { EyeLineIcon } from '../../Components/icons';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../lib/utils';

const ClientTable = () => {

  type Application = {
    appointmentId: string
    companyName: string
    serviceType: string[]
    status: string
    time: string
    date: string
  }

  const serviceColors = {
    "Accounting and book-keeping": "bg-[#cc3e4f]",
    "Financial analysis": "bg-[#F8F0E5]",
    "Business formation": "bg-[#FFDAC2]",
    "Payroll": "bg-[#FFDAe4]",
    "Business and Individual Taxes": "bg-[#AC5Ae4]",
    "Non-for-Profit Organizations": "bg-yellow-400"
    
    // Add more service-color mappings as needed
  };

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
      cell: ({ getValue }) => {
        const services = getValue() as string[];
        const displayedServices = services.slice(0, 2);
        const remainingCount = Math.max(0, services.length - 2);
        return (
          <div className="flex flex-wrap gap-1">
            {displayedServices.map((service, index) => (
              <Badge
                key={index}
                className={cn(
                  "text-xs text-black hover:bg-[`${[serviceColors[service]}`]", [serviceColors[service]]
                )}
              >
                {service}
              </Badge>
            ))}
            {remainingCount > 0 && <span className="bg-[#F6F8FA] rounded-full  px-2 flex items-center">{remainingCount}+</span>}
          </div>
        );
      },
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
      cell: ({getValue}) => {
        const status = getValue() as String;
        return(
          <span className='flex gap-1 item-center justify-center text-xs font-medium border border-[#E2E4E9] p-1 rounded-lg'>
          {status === 'Cancelled' ? (
            <CancelIcon />
          ) : (
            <AlertIcon />
          )}
          {status}
        </span>
        )
        
      }
    },
    {
      header: "actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <span className='flex gap-2 items-center' onClick={() => console.log(row.original)}>
            <EyeLineIcon />
            View
          </span>
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


const CreateClientComponent = ({/*client, onClose*/}) => {
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
        <nav className='flex gap-2 items-center'>
          <ArrowLeftCircleIcon />
          <h2 className="text-2xl font-bold hidden sm:inline">{"tesla inc"}</h2>
        </nav>
        <Button variant="destructive">Deactivate client</Button>
      </div>
      
      <div>
        <Tabs defaultValue="clientInfo" className="w-full space-y-6">
          <TabsList className="flex justify-center bg-[#fffff] gap-1 ">
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
      </div>
    </div>
  );
};

export default CreateClientComponent;

const AlertIcon = () => {
  return(
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.49364 2.62152L13.9236 12.1351C13.9737 12.2227 14 12.3221 14 12.4233C14 12.5245 13.9737 12.624 13.9236 12.7116C13.8736 12.7993 13.8017 12.8721 13.715 12.9227C13.6283 12.9733 13.5301 12.9999 13.43 12.9999H2.57C2.46995 12.9999 2.37165 12.9733 2.285 12.9227C2.19835 12.8721 2.12639 12.7993 2.07636 12.7116C2.02634 12.624 2 12.5245 2 12.4233C2 12.3221 2.02634 12.2227 2.07637 12.1351L7.50636 2.62152C7.5564 2.53387 7.62835 2.46109 7.715 2.41049C7.80165 2.35989 7.89995 2.33325 8 2.33325C8.10005 2.33325 8.19835 2.35989 8.285 2.41049C8.37165 2.46109 8.4436 2.53387 8.49364 2.62152ZM7.42998 10.117V11.2702H8.57002V10.117H7.42998ZM7.42998 6.08098V8.96387H8.57002V6.08098H7.42998Z" fill="#F27B2C"/>
    </svg>
  )
}

const CancelIcon = () => {
  return(
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#FF0000"/>
    </svg>
  )
}