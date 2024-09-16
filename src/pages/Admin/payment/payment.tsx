import { useEffect, useState, useMemo } from 'react'
import { DataTable } from '../../Components/Table/data-table'
//import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../../../components/ui/button'
import { financialTableData as Data } from '../../Components/mock/payment-data'
import { SearchIcon, FilterIcon, SortDesc, ArrowDown, EyeLineIcon } from '../../Components/icons'
import { Input } from '../../../components/ui/input'
import { PaymentSideMenu } from './payment-side-menu'

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
import { Badge } from '../../../components/ui/badge'
import { cn } from '../../../lib/utils'

// This type should match your data structure
type Application = {
  applicationId: string
  clientName: string
  type: string
  amount: string
  date: string
}

export const AdminPayment = () => {
  const [data, setData] = useState<Application[]>(Data)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  //const [globalFilter, setGlobalFilter] = useState('')

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
      accessorKey: "type",
      header: "Payment Type",
      cell: ({getValue}) => {
        const status = getValue() as string
        return(
          <Badge className={cn('text-xs', status === 'Appointment' ? 'bg-[#35B9E9]' : 'bg-[#1C7F4E]')}>
            {status}
          </Badge>
        )
      }
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      header: "actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <span className='flex items-center gap-2' onClick={() => {
            setSelectedPayment(row.original)
            setSideMenuOpen(true)
          }}>
            <EyeLineIcon />
            View
          </span>
        )
      },
    },
  ]

  useEffect(() => {
    // Fetch your data here
    const fetchData = async () => {
      const response = await fetch('/api/applications')
      const result = await response.json()
      setData(result)
    }
    fetchData()
  }, [])


  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    //onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //globalFilterFn: hasTimeValue,
  })

  return (
    <div className='w-auto p-4 font-hubot space-y-6 '>
      <header>
        <h2 className='text-lg font-medium'>Payment</h2>
        <p className='text-sm font-normal'>Monitor and manage all incoming payments from applications and appointment fees in one central location..</p>
      </header>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="p-3 border border-[#E2E4E9] w-full rounded-lg space-y-4 bg-[#AEE160]">
            <div className="p-2 rounded-full inline-block border border-[#E2E4E9] bg-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.4 7.4999H20.1C20.3387 7.4999 20.5676 7.59472 20.7364 7.76351C20.9052 7.93229 21 8.16121 21 8.3999V19.1999C21 19.4386 20.9052 19.6675 20.7364 19.8363C20.5676 20.0051 20.3387 20.0999 20.1 20.0999H3.9C3.66131 20.0999 3.43239 20.0051 3.2636 19.8363C3.09482 19.6675 3 19.4386 3 19.1999V4.7999C3 4.56121 3.09482 4.33229 3.2636 4.16351C3.43239 3.99472 3.66131 3.8999 3.9 3.8999H17.4V7.4999ZM4.8 9.2999V18.2999H19.2V9.2999H4.8ZM4.8 5.6999V7.4999H15.6V5.6999H4.8ZM14.7 12.8999H17.4V14.6999H14.7V12.8999Z" fill="#525866"/>
              </svg>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-normal capitalize">Total payments received</p>
                <h4 className="text-3xl font-medium">$ 204,534.00</h4>
            </div>
        </div>
        <div className="p-3 border border-[#E2E4E9] w-full rounded-lg space-y-4 bg-white">
            <div className="p-2 rounded-full inline-block border border-[#E2E4E9] bg-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21.0001C3 19.0905 3.75857 17.2592 5.10883 15.9089C6.45909 14.5587 8.29044 13.8001 10.2 13.8001C12.1096 13.8001 13.9409 14.5587 15.2912 15.9089C16.6414 17.2592 17.4 19.0905 17.4 21.0001H15.6C15.6 19.5679 15.0311 18.1944 14.0184 17.1817C13.0057 16.169 11.6322 15.6001 10.2 15.6001C8.76783 15.6001 7.39432 16.169 6.38162 17.1817C5.36893 18.1944 4.8 19.5679 4.8 21.0001H3ZM10.2 12.9001C7.2165 12.9001 4.8 10.4836 4.8 7.5001C4.8 4.5166 7.2165 2.1001 10.2 2.1001C13.1835 2.1001 15.6 4.5166 15.6 7.5001C15.6 10.4836 13.1835 12.9001 10.2 12.9001ZM10.2 11.1001C12.189 11.1001 13.8 9.4891 13.8 7.5001C13.8 5.5111 12.189 3.9001 10.2 3.9001C8.211 3.9001 6.6 5.5111 6.6 7.5001C6.6 9.4891 8.211 11.1001 10.2 11.1001ZM17.6556 14.4328C18.9204 15.0024 19.9938 15.9252 20.7467 17.0902C21.4997 18.2553 21.9001 19.6129 21.9 21.0001H20.1C20.1002 19.9597 19.7999 18.9413 19.2352 18.0675C18.6705 17.1937 17.8654 16.5016 16.9167 16.0744L17.6547 14.4328H17.6556ZM17.0364 4.2718C17.9432 4.64557 18.7185 5.28028 19.2639 6.0954C19.8094 6.91053 20.1004 7.86931 20.1 8.8501C20.1004 10.0852 19.6389 11.2758 18.8063 12.188C17.9736 13.1003 16.83 13.6682 15.6 13.7803V11.9686C16.2668 11.8731 16.8855 11.5663 17.3652 11.0933C17.8448 10.6203 18.1602 10.006 18.265 9.34054C18.3699 8.67509 18.2586 7.99357 17.9475 7.39602C17.6365 6.79847 17.1421 6.31637 16.5369 6.0205L17.0364 4.2718Z" fill="#525866"/>
              </svg>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-normal capitalize">Total application payment</p>
                <h4 className="text-3xl font-medium">$ 110,122.00</h4>
            </div>
        </div>
        <div className="p-3 border border-[#E2E4E9] w-full rounded-lg space-y-4 bg-white">
            <div className="p-2 rounded-full inline-block border border-[#E2E4E9] bg-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0562 6.5713L18.3639 5.2636L19.6365 6.5362L18.3288 7.8439C19.621 9.46135 20.2448 11.5122 20.0722 13.5752C19.8995 15.6382 18.9435 17.5569 17.4004 18.937C15.8574 20.3172 13.8444 21.0542 11.775 20.9966C9.70555 20.939 7.73671 20.0912 6.27283 18.6273C4.80895 17.1634 3.96114 15.1946 3.90353 13.1251C3.84592 11.0557 4.58288 9.04271 5.96306 7.49966C7.34323 5.9566 9.26185 5.00057 11.3249 4.82792C13.3879 4.65527 15.4388 5.2791 17.0562 6.5713ZM12 19.2001C12.8273 19.2001 13.6466 19.0371 14.4109 18.7205C15.1753 18.4039 15.8698 17.9399 16.4548 17.3549C17.0398 16.7699 17.5038 16.0754 17.8204 15.311C18.1371 14.5467 18.3 13.7274 18.3 12.9001C18.3 12.0728 18.1371 11.2535 17.8204 10.4892C17.5038 9.72484 17.0398 9.03033 16.4548 8.44532C15.8698 7.86032 15.1753 7.39626 14.4109 7.07966C13.6466 6.76305 12.8273 6.6001 12 6.6001C10.3291 6.6001 8.72671 7.26385 7.54523 8.44532C6.36375 9.6268 5.7 11.2292 5.7 12.9001C5.7 14.571 6.36375 16.1734 7.54523 17.3549C8.72671 18.5363 10.3291 19.2001 12 19.2001ZM11.1 8.4001H12.9V13.8001H11.1V8.4001ZM8.4 2.1001H15.6V3.9001H8.4V2.1001Z" fill="#525866"/>
              </svg>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-normal capitalize">Total appointment fees</p>
                <h4 className="text-3xl font-medium">$ 40,553.00</h4>
            </div>
        </div>
      </div>
      <div className='space-y-8 pt-4'>
        {/* sort and search buttons */}
        <div className="flex gap-2 justify-stretch">
          <div className="relative flex-1 max-w-5xl">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon  />
            </div>
            <Input
                placeholder="Searching..."
                value={""}
                onChange={() => {}}
                className="pl-10 pr-4" // Add left padding to make room for the icon
            />
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
          className="flex flex-3 items-center space-x-2"
          >
            <SortDesc />
            <span>Sort by</span>
            <ArrowDown />
          </Button>
        </div>
        <DataTable 
        table={table}
        columns={columns}
        />
      </div>
      <PaymentSideMenu
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        paymentData={selectedPayment}
      />
    </div>
  )
}