import clsx from 'clsx'
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataTable } from '../../Components/Table/data-table'
import { Button } from '../../../components/ui/button'
import { SearchIcon, FilterIcon, SortDesc, ArrowDown,} from '../../Components/icons'
import { PlusIcon } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { newsLetterData, subscriberData } from '../../Components/mock/newsletter-data'
import { NewsletterEditor } from './newsletter-editor'
import { EyeLineIcon, DeleteLineIcon, PencilLineIcon } from '../../Components/icons'
import { Badge } from '../../../components/ui/badge'


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

import BlogEditor from '../blog/blog-editor'
import { cn } from '../../../lib/utils'

//import { ApplicationReview } from './application-review'

// This type should match your data structure
type Newsletter = {
  id: string
  title: string
  status: 'Sent' | 'Scheduled'
  date: string
  recipients: string
  scheduled: string
}

type Subscriber = {
  firstName: string
  lastName: string
  email: string
  date: string
  status: 'Active' | 'Inactive'
}

type TabType = 'manage newsletter' | 'manage subscribers';

const newsletterStatus: TabType[] = ['manage newsletter', 'manage subscribers']


export const AdminNewsletter = () => {
  //const [data, setData] = useState<Newsletter[] | Subscriber[]>(Data)
  const [activeTab, setActiveTab] = useState<TabType>('manage newsletter')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  //const [selectedAppointment, setSelectedAppointment] = useState(null);
  //const [sideMenuOpen, setSideMenuOpen] = useState(false)
  //const [sideMenuContent, setSideMenuContent] = useState<'form' | 'detail'>('form')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)

  const navigate = useNavigate()

  // Newsletter columns
  const newsletterColumns: ColumnDef<Newsletter>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "status",
      header: "Status",
      cell: ({row}) => (
        <Badge className={cn('bg-white hover:bg-white text-xs', row.original.status === 'Sent' ? 'border-[#03713A] text-[#03713A]': 'border-[#E2E4E9] text-[#525866]')}>
          {row.original.status}
        </Badge>
      )
     },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "recipients", header: "Recipients" },
    { accessorKey: "scheduled", header: "scheduled" },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <span className='flex gap-2 items-center text-center' onClick={() => console.log(row.original)}>
          <EyeLineIcon />
          view
        </span>
      ),
    },
  ]

  const subscriberColumns: ColumnDef<Subscriber>[] = [
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "status",
      header: "Status",
      cell: ({row}) => (

        <Badge className={cn('bg-white hover:bg-white border-[#03713A] text-[#03713A]', row.original.status === 'Inactive' ? 'border-[#CC0000] text-[#CC0000]' : '')}>
          {row.original.status}
        </Badge>
      )
       },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <span  onClick={() => console.log('Edit', row.original)}>
            <PencilLineIcon />
          </span>
          <span onClick={() => console.log('Delete', row.original)}>
            <DeleteLineIcon />
          </span>
        </div>
      ),
    },
  ]

  const columns = useMemo(() => 
    activeTab === 'manage newsletter' ? newsletterColumns : subscriberColumns, 
    [activeTab]
  )
  
  const data = useMemo(() => 
    activeTab === 'manage newsletter' ? newsLetterData : subscriberData,
    [activeTab]
  )

  useEffect(() => {
    // Fetch your data here
    const fetchData = async () => {
      const response = await fetch('/api/applications')
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const filterFn: FilterFn<Newsletter | Subscriber> = (row, columnId, filterValue) => {
    if (filterValue === "") return true;
    return row.getValue(columnId) === filterValue;
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
      filterFn
    },
    //globalFilterFn: hasTimeValue,
  })

  const handleOpenEditor = () => {
    setOpenEditor(true)
    navigate('/newsletter/create-newsletter')
  }

  const handleSearch = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    setIsSearching(true)
    // You might want to debounce this for better performance
    setGlobalFilter(value)
  }


  useEffect(() => {
    // Initially set the filter to show all applications
    table.getColumn('status')?.setFilterValue(undefined)
  }, [table])

    return(
      <>
      {!openEditor ? (
      <div className='w-auto p-4 font-hubot space-y-6'>
      <header className='flex justify-between'>
        <div>
          <h2 className='text-lg font-medium'>Newsletter</h2>
          <p className='text-sm font-normal'>
            Create, manage, and analyze newsletters to effectively engage your audience.
          </p>
        </div>
        <div className='flex items-center gap-2'>
        <Button disabled variant={'outline'} className='rounded-xl text-black gap-2 capitalize' onClick={handleOpenEditor}>
          <PlusIcon width={12} height={12} />
          add new subscriber
        </Button>
        <Button className='rounded-xl bg-[#C1FA6B] text-black gap-2 capitalize hover:text-white' onClick={handleOpenEditor}>
          <PlusIcon width={12} height={12} />
          create newsletter
        </Button>
        </div>
      </header>
      <div className='space-y-8 pt-4'>
        {/* Tabs */}
        <div className='flex justify-between'>
          <div className='flex space-x-2 bg-[#F6F8FA] p-1 rounded-md'>
              {newsletterStatus. map((status) => (
                <span
                onClick={() => setActiveTab(status as TabType)}
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
                       value={searchTerm}
                       onChange={handleSearch}
                       onFocus={() => setIsSearching(true)}
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
        ) : (
          <NewsletterEditor onClose={() => setOpenEditor(false)} />
        )
      }
    </>
    )
  }