import clsx from 'clsx'
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { DataTable } from '../../Components/Table/data-table'
import { Button } from '../../../components/ui/button'
import { SearchIcon, FilterIcon, SortDesc, ArrowDown, EyeLineIcon} from '../../Components/icons'
import { PlusIcon } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { blogData as Data } from '../../Components/mock/blog-data'

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
import { cn } from '../../../lib/utils'
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

  const navigate = useNavigate()

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
      cell: ({row}) => (

        <Badge className={cn('bg-white hover:bg-white border-[#03713A] text-[#03713A]', row.original.status === 'Archived' ? 'border-[#CC0000] text-[#CC0000]' : row.original.status === "Draft" ? 'border-[#E2E4E9] text-[#525866]' : '')}>
          {row.original.status}
        </Badge>
      )
    },
    {
      accessorKey: "views",
      header: "views",
      cell: ({ row }) => (
        <span className='flex'>
          <EyeIcon />
          {row.original.views},
        </span>
      )
    },
    {
      accessorKey: "likes",
      header: "Likes",
      cell: ({ row }) => (
        <span className='flex'>
          <HeartIcon />
          {row.original.likes}
        </span>
      ),
    },
    {
      accessorKey: "comments",
      header: "Comments",
      cell: ({ row }) => (
        <span className='flex'>
          <MessageIcon />
          {row.original.comments}
        </span>
      )
    },
    {
      header: "actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <span onClick={() => console.log(row.original)}
            className='flex gap-2'>
            <EyeLineIcon />
            View
          </span>
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
    navigate('/blog/create-blog')
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
        <div className='space-x-2'>
          <Button className='rounded-xl bg-[#C1FA6B] hover:bg-[#cdff82] text-black' onClick={() => navigate('/blog/author')}>Author</Button>
          <Button className='rounded-xl bg-[#C1FA6B] hover:bg-[#cdff82] text-black' onClick={() => navigate('/blog/category')}>Category</Button>
          <Button className='rounded-xl bg-[#C1FA6B] hover:bg-[#cdff82] text-black gap-2' onClick={handleOpenEditor}>
            <PlusIcon width={12} height={12} />
            New Blog Post
          </Button>
        </div>
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

  const EyeIcon = () => {
    return(
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3.25C14.044 3.25 17.4085 6.16 18.1143 10C17.4093 13.84 14.044 16.75 10 16.75C5.956 16.75 2.5915 13.84 1.88575 10C2.59075 6.16 5.956 3.25 10 3.25ZM10 15.25C11.5296 15.2497 13.0138 14.7301 14.2096 13.7764C15.4055 12.8226 16.2422 11.4912 16.5828 10C16.2409 8.50998 15.4037 7.18 14.208 6.22752C13.0122 5.27504 11.5287 4.7564 10 4.7564C8.47127 4.7564 6.98777 5.27504 5.79203 6.22752C4.5963 7.18 3.75908 8.50998 3.41725 10C3.75782 11.4912 4.59451 12.8226 5.79036 13.7764C6.98621 14.7301 8.4704 15.2497 10 15.25ZM10 13.375C9.10489 13.375 8.24645 13.0194 7.61351 12.3865C6.98058 11.7535 6.625 10.8951 6.625 10C6.625 9.10489 6.98058 8.24645 7.61351 7.61351C8.24645 6.98058 9.10489 6.625 10 6.625C10.8951 6.625 11.7535 6.98058 12.3865 7.61351C13.0194 8.24645 13.375 9.10489 13.375 10C13.375 10.8951 13.0194 11.7535 12.3865 12.3865C11.7535 13.0194 10.8951 13.375 10 13.375ZM10 11.875C10.4973 11.875 10.9742 11.6775 11.3258 11.3258C11.6775 10.9742 11.875 10.4973 11.875 10C11.875 9.50272 11.6775 9.02581 11.3258 8.67417C10.9742 8.32254 10.4973 8.125 10 8.125C9.50272 8.125 9.02581 8.32254 8.67417 8.67417C8.32254 9.02581 8.125 9.50272 8.125 10C8.125 10.4973 8.32254 10.9742 8.67417 11.3258C9.02581 11.6775 9.50272 11.875 10 11.875Z" fill="#525866"/>
      </svg>
    )
  }

  const HeartIcon = () => {
    return(
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.00068 3.95784C10.5863 2.53427 13.0365 2.58152 14.564 4.11174C16.0909 5.64264 16.1435 8.08074 14.7233 9.67104L8.99933 15.4031L3.27668 9.67104C1.85648 8.08074 1.9098 5.63859 3.43598 4.11174C4.96485 2.58354 7.41038 2.53224 9.00068 3.95784ZM13.6082 5.06552C12.5957 4.05167 10.9622 4.01049 9.90248 4.96224L9.00135 5.77089L8.09955 4.96292C7.03643 4.00982 5.4063 4.05167 4.3911 5.06687C3.38535 6.07262 3.33473 7.68249 4.2615 8.74629L9 13.4922L13.7385 8.74697C14.666 7.68249 14.6153 6.07464 13.6082 5.06552Z" fill="#868C98"/>
      </svg>
    )
  }

  const MessageIcon = () => {
    return(
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.25 6.97174C2.24965 6.43997 2.35419 5.91336 2.55764 5.42206C2.7611 4.93076 3.05947 4.48442 3.43567 4.10859C3.81187 3.73277 4.25851 3.43484 4.75002 3.23188C5.24152 3.02892 5.76824 2.9249 6.3 2.92579H11.7C13.9363 2.92579 15.75 4.74491 15.75 6.97174V15.0758H6.3C4.06373 15.0758 2.25 13.2567 2.25 11.0298V6.97174ZM14.4 13.7258V6.97174C14.3982 6.25657 14.113 5.57127 13.607 5.06595C13.1009 4.56064 12.4152 4.2765 11.7 4.27579H6.3C5.94552 4.2749 5.59436 4.34399 5.26664 4.47911C4.93893 4.61423 4.64111 4.81272 4.39026 5.06318C4.13942 5.31365 3.94049 5.61117 3.80488 5.93868C3.66927 6.2662 3.59964 6.61726 3.6 6.97174V11.0298C3.60179 11.745 3.88695 12.4303 4.39303 12.9356C4.89911 13.4409 5.58484 13.7251 6.3 13.7258H14.4ZM10.35 8.32579H11.7V9.67579H10.35V8.32579ZM6.3 8.32579H7.65V9.67579H6.3V8.32579Z" fill="#868C98"/>
      </svg>
    )
  }