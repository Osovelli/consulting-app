import clsx from 'clsx'
import { useEffect, useState, useMemo } from 'react'
import { DataTable } from '../../Table/data-table'
import { Button } from '../../../../components/ui/button'
import { SearchIcon, FilterIcon, SortDesc, ArrowDown, EyeLineIcon } from '../../icons'
import { Input } from '../../../../components/ui/input'
import { Badge } from '../../../../components/ui/badge'
import { applicationData as Data } from '../../mock/application-data'

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
  FilterFn,
} from '@tanstack/react-table'
import { ApplicationReview } from './application-review'
<<<<<<< HEAD:src/pages/Admin/application/application.tsx
import { cn } from '../../../lib/utils'
=======
import { cn } from '../../../../lib/utils'
>>>>>>> 89b62c0236ef745e0252f38f35eeaba26d610da7:src/pages/Components/Admin/application/application.tsx

// This type should match your data structure
type Application = {
  applicationId: string
  clientName: string
  serviceType: string[]
  status: string
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

type Status = 'all' | 'in review' | 'successful' | 'rejected';

const clientStatus = ['all', 'in review', 'successful', 'rejected']


export const AdminApplication = ({ modalOpen, setModalOpen }) => {
  const [data, setData] = useState<Application[]>(Data)
  const [activeTab, setActiveTab] = useState('All')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedApplication, setSelectedApplication] = useState(null);

  const navigate = useNavigate()

  const columns: ColumnDef<Application>[] = [
    {
      accessorKey: "applicationId",
      header: "Application ID",
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
    },
    {
      accessorKey: "serviceType",
      header: "Service Type",
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
                  "text-xs text-[#6E330C] hover:bg-[`${[serviceColors[service]}`]", [serviceColors[service]]
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
      accessorKey: "status",
      header: "Status",
      cell: ({getValue}) => {
        const status = getValue() as String;
        return(
          <span className='flex gap-1 item-center justify-center text-xs font-medium border border-[#E2E4E9] py-1 rounded-md'>
          {
            status === 'Successful' ? (
              <ActiveIcon />  
            ) : status === 'Rejected' ? (
              <PendingIcon />
            ) : (
              <InactiveIcon />
            )
          }
          {status}
        </span>
        )
        
      }
    },
    {
      accessorKey: "date",
      header: "Submission Date",
    },
    {
      header: "actions",
      id: "actions",
      cell: ({ row }) => {
        const handleviewApplication = () => {
          setSelectedApplication(row.original)
          navigate('/application/create-application')
        }
        return (
<<<<<<< HEAD:src/pages/Admin/application/application.tsx
          <span className='flex gap-2 items-center' onClick={handleviewApplication}>
=======
          <span className='flex gap-2 items-center' onClick={() => setSelectedApplication(row.original)}>
>>>>>>> 89b62c0236ef745e0252f38f35eeaba26d610da7:src/pages/Components/Admin/application/application.tsx
            <EyeLineIcon />
            View
          </span>
        )
      },
    },
  ]
  
  console.log("Selected client: ", selectedApplication)

  useEffect(() => {
    // Fetch your data here
    const fetchData = async () => {
      const response = await fetch('/api/applications')
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const filterByTabAndTime: FilterFn<Application> = (row, columnId, filterValue) => {
    if (filterValue === 'upcoming') {
      const status = row.getValue('status') as string;
      const time = row.getValue('time') as string | undefined;
      return status.toLowerCase() === 'upcoming' && !!time && time.trim() !== '';
    } else if (filterValue === 'pending') {
      const status = row.getValue('status') as string;
      return status.toLowerCase() === 'pending';
    }
    return true;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      filterByTabAndTime
    },
    //globalFilterFn: hasTimeValue,
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    
  
    table.setPageIndex(0)
  }

  useEffect(() => {
    // Initially hide the Time column
    const timeColumn = table.getColumn('time')
    const statusColumn = table.getColumn('status')
    if (timeColumn && statusColumn) {
      timeColumn.toggleVisibility(false)
      statusColumn.setFilterValue('pending')
    }
  }, [table])

    return(
      <>
      {
      selectedApplication === null ? (
      <div className='w-auto p-4 font-hubot space-y-6'>
      <header className=''>
          <h2 className='text-lg font-medium'>Applications</h2>
          <p className='text-sm font-normal'>
            Centralized hub for reviewing, approving, and managing all submitted client applications.
          </p>
      </header>
      <div className='space-y-8 pt-4'>
        {/* Tabs */}
        <div className='flex justify-between'>
          <div className='flex space-x-2 bg-[#F6F8FA] p-1 rounded-md'>
              {clientStatus.map((status) => (
                <span
                onClick={() => handleTabChange(status)}
                key={status}
                className={clsx(
                    'px-3 py-1 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200',
                    activeTab === status
                    ? 'bg-white text-[#01170C] font-medium'
                    : 'bg-transparent text-[#868C98] hover:bg-gray-200'
                )}
                >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            ))}
          </div>
        
        {/* Filter and Sort Controls */}
        <div className="flex gap-1">
                <div className="relative max-w-sm">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <SearchIcon  />
                    </div>
                    <Input
                        placeholder="Searching..."
                        value={globalFilter ?? ''}
                        onChange={(event) => setGlobalFilter(String(event.target.value))}
                        className="pl-10 pr-4 md:w-64" // Add left padding to make room for the icon
                    />
                </div>
                <Button
                onClick={() => {table.getColumn('status')?.setFilterValue('')}}
                variant="outline"
                className="flex items-center space-x-2"
                >
                    <FilterIcon />
                    <span>Filter</span>
                </Button>
                <Button
                onClick={() => {table.getColumn('date')?.toggleSorting()}}
                variant="outline"
                className="flex items-center space-x-2"
                >
                    <SortDesc />
                    <span>Sort by</span>
                    <ArrowDown />
                </Button>
            </div>
        </div>
        <DataTable 
        table={table}
        columns={columns}
        />
      </div>
    </div>) : (
      <ApplicationReview application={selectedApplication} onClose={() => setSelectedApplication(null)} />
    )
      }
    </>
    )
  }

  const PendingIcon = () => {
    return(
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.49364 2.62152L13.9236 12.1351C13.9737 12.2227 14 12.3221 14 12.4233C14 12.5245 13.9737 12.624 13.9236 12.7116C13.8736 12.7993 13.8017 12.8721 13.715 12.9227C13.6283 12.9733 13.5301 12.9999 13.43 12.9999H2.57C2.46995 12.9999 2.37165 12.9733 2.285 12.9227C2.19835 12.8721 2.12639 12.7993 2.07636 12.7116C2.02634 12.624 2 12.5245 2 12.4233C2 12.3221 2.02634 12.2227 2.07637 12.1351L7.50636 2.62152C7.5564 2.53387 7.62835 2.46109 7.715 2.41049C7.80165 2.35989 7.89995 2.33325 8 2.33325C8.10005 2.33325 8.19835 2.35989 8.285 2.41049C8.37165 2.46109 8.4436 2.53387 8.49364 2.62152ZM7.42998 10.117V11.2702H8.57002V10.117H7.42998ZM7.42998 6.08098V8.96387H8.57002V6.08098H7.42998Z" fill="#F27B2C"/>
      </svg>
    )
  }
  
  const ActiveIcon = () => {
    return(
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#1C7F4E"/>
      </svg>
    )
  }

  const InactiveIcon = () => {
    return(
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#FF0000"/>
      </svg>
    )
  }