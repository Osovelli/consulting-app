import clsx from 'clsx'
import React, { useEffect, useState, useMemo } from 'react'
import { X } from 'lucide-react'
import { DataTable } from '../../Components/Table/data-table'
import { Button } from '../../../components/ui/button'
import { SearchIcon, FilterIcon, SortDesc, ArrowDown,} from '../../Components/icons'
import { DeleteLineIcon, PencilLineIcon } from '../../Components/icons'
import { PlusIcon } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { servicesData as Data } from '../../Components/mock/services-data'

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
import { ServiceMenu } from './service-menu'
//import { TestimonialSideMenu } from './testimonial-sidemenu'
//import { ApplicationReview } from './application-review'

// This type should match your data structure
type Application = {
  id: string
  testimonial: string
  date: string
}


export const AdminServices = () => {
  const [data, setData] = useState<Application[]>(Data)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedService, setSelectedService] = useState(null);
  const [sideMenuContent, setSideMenuContent] = useState<'form' | 'detail'>('form')
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  //const [sideMenuContent, setSideMenuContent] = useState<'form' | 'detail'>('form')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  

  const columns: ColumnDef<Application>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "serviceName",
      header: "Service name",
    },
    {
      accessorKey: "cost",
      header: "Cost",
    },
    {
        accessorKey: "shortDesc",
        header: "Short Desc",
    },
    {
        accessorKey: "description",
        header: "Desc",
    },
    {
      header: "actions",
      id: "actions",
      cell: ({ row }) => {
        const handleSelectRow = () => {
            setSideMenuContent('detail')
            setSideMenuOpen(true)
            setSelectedService(row.original)

        }
        return (
          <div className='flex gap-4'>
            <span className=' cursor-pointer'>
              <DeleteLineIcon />
            </span>
            <span className='cursor-pointer' onClick={handleSelectRow}>
              <PencilLineIcon />
            </span>
          </div>
        )
      },
    },
  ]
  
  console.log("Selected appointment: ", selectedService)

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

  const handlesideOpen = () => {
    setSideMenuOpen(true)
    setSideMenuContent('form')
  }

  const handlesideClose = () => {
    setSideMenuOpen(false)
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
      <div className='w-auto p-4 font-hubot space-y-6'>
      <header className='flex justify-between'>
        <div>
          <h2 className='text-lg font-medium'>Services</h2>
          <p className='text-sm font-normal'>
            Create and manage your application services.
          </p>
        </div>
        <Button className='rounded-xl hover:text-white bg-[#C1FA6B] text-black gap-2 capitalize' onClick={handlesideOpen}>
          <PlusIcon width={12} height={12} />
          create service
        </Button>
      </header>
      <div className='space-y-8 pt-4'>
        <div className='flex justify-between'>
        {/* Filter and Sort Controls */}
        <div className="flex gap-1 w-full">
          <div className="relative flex-1 w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon  />
            </div>
            <Input
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsSearching(true)}
                placeholder='Search'
                className="pl-10 pr-4 md:w-full" // Add left padding to make room for the icon
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
          className="flex flex-3 items-center space-x-2"
          >
            <FilterIcon />
            <span>Filter</span>
          </Button>
          <Button
          onClick={() => {table.getColumn('date')?.toggleSorting()}}
          variant="outline"
          className="flex items-center flex-3 space-x-2"
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
      <ServiceMenu isOpen={sideMenuOpen} content={sideMenuContent} onClose={handlesideClose} data={selectedService}  />
    </div>
    )
  }