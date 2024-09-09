import clsx from 'clsx'
import { useEffect, useState, useMemo } from 'react'
import { X } from 'lucide-react'
import { DataTable } from '../../Table/data-table'
import { Button } from '../../../../components/ui/button'
import { SearchIcon, FilterIcon, SortDesc, ArrowDown,} from '../../icons'
import { PlusIcon } from 'lucide-react'
import { Input } from '../../../../components/ui/input'
import { blogData as Data } from '../../mock/blog-data'

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
import { AppointmentSideMenu } from '../appointment/appointment-side-menu'
import BlogEditor from './blog-editor'
//import { ApplicationReview } from './application-review'

// This type should match your data structure
type Application = {
  title: string
  author: string
  status: string
  views: number
  likes: number
  comments: number
  category: string
  date: string
}

type Status = 'all' | 'published' | 'draft' | 'archived' ;

const appointmentStatus: Status[] = ['all', 'published', 'draft', 'archived']


export const AdminBlog = () => {
  const [data, setData] = useState<Application[]>(Data)
  const [activeTab, setActiveTab] = useState('all')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [sideMenuContent, setSideMenuContent] = useState<'form' | 'detail'>('form')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)

  const columns: ColumnDef<Application>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "category",
      header: "category",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "views",
      header: "views",
      cell: ({ row }) => row.original.views,
    },
    {
      accessorKey: "likes",
      header: "Likes",
      cell: ({ row }) => row.original.likes,
    },
    {
      accessorKey: "comments",
      header: "Comments",
      cell: ({ row }) => row.original.views,
    },
    {
      header: "actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" onClick={() => {
            setSelectedAppointment(row.original)
            setSideMenuContent('detail')
            setSideMenuOpen(true)
          }}>
            View
          </Button>
        )
      },
    },
  ]
  
  console.log("Selected appointment: ", selectedAppointment)

  useEffect(() => {
    // Fetch your data here
    const fetchData = async () => {
      const response = await fetch('/api/applications')
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])

  const filterFn: FilterFn<Application> = (row, columnId, filterValue) => {
    if (filterValue === 'all') return true;
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

  const handleTabChange = (tab: Status) => {
    setActiveTab(tab)
    if (tab === 'all') {
      table.getColumn('status')?.setFilterValue(undefined)
    } else {
      table.getColumn('status')?.setFilterValue(tab)
    }
    table.setPageIndex(0)
  }

  const handleOpenEditor = () => {
    setOpenEditor(true)
  }

  const handleSearch = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    setIsSearching(true)
    // You might want to debounce this for better performance
    setGlobalFilter(value)
  }

  const handleClientSelect = (client) => {
    setSelectedClient(client)
    setSearchTerm(client.author)
    setIsSearching(false)
    // You might want to update the form or filter the table based on the selected client
  }

  const clearSelectedClient = () => {
    setSelectedClient(null)
    setSearchTerm('')
    setGlobalFilter('')
  }

  const filteredClients = useMemo(() => {
    if (!searchTerm) return []
    return data.filter(client => 
      client.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data, searchTerm])

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
          <h2 className='text-lg font-medium'>Blog</h2>
          <p className='text-sm font-normal'>
            View, manage, and create blogs for your application..
          </p>
        </div>
        <Button className='rounded-xl bg-[#C1FA6B] text-black gap-2' onClick={handleOpenEditor}>
          <PlusIcon width={12} height={12} />
          New Blog Post
        </Button>
      </header>
      <div className='space-y-8 pt-4'>
        {/* Tabs */}
        <div className='flex justify-between'>
          <div className='flex space-x-2 bg-[#F6F8FA] p-1 rounded-md'>
              {appointmentStatus.map((status) => (
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
                       value={searchTerm}
                       onChange={handleSearch}
                       onFocus={() => setIsSearching(true)}
                        className="pl-10 pr-4 md:w-64" // Add left padding to make room for the icon
                    />
                    {selectedClient && (
                    <button
                      onClick={clearSelectedClient}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <X width={16} height={16} />
                    </button>
                    )}
                    {isSearching && filteredClients.length > 0 && (
                    <div className="absolute z-10 w-full bg-white mt-1 border border-gray-200 rounded-md shadow-lg">
                      {filteredClients.map((client) => (
                        <div
                          key={client.appointmentId}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleClientSelect(client)}
                        >
                          {client.companyName}
                        </div>
                      ))}
                    </div>
                    )}
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
      <AppointmentSideMenu
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        appointmentData={selectedAppointment}
        content={sideMenuContent}
      />
    </div>
        ) : (
          <BlogEditor onClose={() => setOpenEditor(false)} />
        )
      }
    </>
    )
  }