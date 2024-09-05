import clsx from 'clsx'
import { useEffect, useState, useMemo } from 'react'
import { DataTable } from '../Table/data-table'
import { Button } from '../../../components/ui/button'
import { Data } from '../mock/dashboard-data'
import { SearchIcon, FilterIcon, SortDesc, ArrowDown } from '../icons'
import { Input } from '../../../components/ui/input'

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
  time?: string
  submissionDate: string
}

type Status = 'all' | 'pending' | 'active' | 'inactive';

const clientStatus = ['all', 'pending', 'active', 'inactive']

const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "applicationId",
    header: "ID",
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
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => row.original.time || 'N/A',
  },
  {
    accessorKey: "submissionDate",
    header: "Submission Date",
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

export const AdminClient = () => {
  const [data, setData] = useState<Application[]>(Data)
  const [activeTab, setActiveTab] = useState('All')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

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

  return (
    <div className='w-auto p-4 font-hubot space-y-6 '>
      <header>
        <h2 className='text-lg font-medium'>Client</h2>
        <p className='text-sm font-normal'>View, edit, and manage all your client information in one place..</p>
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
        {/*<div className="flex gap-3 justify-between items-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {() => table.getColumn('status')?.setFilterValue('')}}
          >
            <Filter size={16} />
            Filter
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => table.getColumn('submissionDate')?.toggleSorting()}
          >
            Sort by
            <ChevronDown size={16} />
          </Button>
        </div>*/}
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