import clsx from 'clsx'
import { useEffect, useState, useMemo } from 'react'
import { DataTable } from '../Table/data-table'
import { Button } from '../../../components/ui/button'
import { SearchIcon, FilterIcon, SortDesc, ArrowDown } from '../icons'
import { Input } from '../../../components/ui/input'
import { applicationData as Data } from '../mock/application-data'

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

// This type should match your data structure
type Application = {
  applicationId: string
  clientName: string
  serviceType: string[]
  status: string
  date: string
}

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
  const [selectedClient, setSelectedClient] = useState(null);

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
      cell: ({ row }) => row.original.serviceType.join(', '),
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "date",
      header: "Submission Date",
    },
    {
      header: "actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" onClick={() => setSelectedClient(row.original)}>
            View
          </Button>
        )
      },
    },
  ]
  
  console.log("Selected client: ", selectedClient)

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
    </div>
    )
  }