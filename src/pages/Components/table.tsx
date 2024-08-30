import clsx from "clsx"
import React, { useState, useEffect, useRef } from "react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"


import { 
  Pagination, 
  PaginationContent,  
  PaginationEllipsis, 
  PaginationItem, 
  } from "../../components/ui/pagination"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from  "../../components/ui/table"


type Status = 'submitted' | 'processing' | 'successful' | 'declined';

const pageSizeOptions = [5, 10, 20, 30, 50, 100];

export type ServiceCol = {
    id: string
    services: Array<string>
    documents: number
    date: string
    status: Status
    //action: string || "view",
  }
  
  /*const StaticData: ServiceCol[] = [
    {
      id: "#1234567890",
      services: ["financial analysis", 'business formation'],
      documents: 14,
      date: "July 15, 2023",
      status: "submitted",
    },
    {
      id: "#1234567890",
      services: ["financial analysis", 'business formation'],
      documents: 14,
      date: "July 15, 2023",
      status: "submitted",
    },
    {
      id: "#1234567890",
      services: ["financial analysis", 'business formation'],
      documents: 14,
      date: "July 15, 2023",
      status: "submitted",
    },
    {
      id: "#1234567890",
      services: ["financial analysis", 'business formation'],
      documents: 14,
      date: "July 15, 2023",
      status: "submitted",
      action: null
    },
    {
      id: "#1234567890",
      services: ["financial analysis", 'business formation'],
      documents: 14,
      date: "July 15, 2023",
      status: "submitted",
    },
    {
      id: "#1234567890",
      services: ["financial analysis", 'business formation'],
      documents: 14,
      date: "July 15, 2023",
      status: "submitted",
    },
    // Add more data...
  ]*/

  const serviceColors = {
    "Accounting and book-keeping": "bg-[#cc3e4f]",
    "Financial Analysis": "bg-[#F8F0E5]",
    "Business formation": "bg-[#FFDAC2]",
    "Payroll": "bg-[#FFDAe4]",
    "Business and Individual Taxes": "bg-[#AC5Ae4]",
    "Non-for-Profit Organizations": "bg-yellow-400"
    
    // Add more service-color mappings as needed
  };
  

  const RowsPerPageDropdown = ({ table, pageSizeOptions }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
  
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
            buttonRef.current && !buttonRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleOptionClick = (pageSize, event) => {
      event.stopPropagation();
      table.setPageSize(pageSize);
      setIsDropdownOpen(false);
    };
  
    return (
      <div className="relative inline-block text-left">
        <button 
          ref={buttonRef}
          type="button" 
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" 
          onClick={toggleDropdown}
        >
          {table.getState().pagination.pageSize} / page
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isDropdownOpen && (
          <div 
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            style={{
              bottom: buttonRef.current && 
                      window.innerHeight - buttonRef.current.getBoundingClientRect().top > 200 ? 
                      'auto' : 'calc(100% + 10px)'
            }}
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {pageSizeOptions.map(pageSize => (
                <a
                  key={pageSize}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={(e) => handleOptionClick(pageSize, e)}
                >
                  {pageSize} / page
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const SortIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1667 7.91667L10 3.75L5.83333 7.91667H14.1667ZM14.1667 12.0833L10 16.25L5.83333 12.0833H14.1667Z" fill="#868C98"/>
    </svg>
  );

  const SearchIcon = () => {
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.25 2.5C12.976 2.5 16 5.524 16 9.25C16 12.976 12.976 16 9.25 16C5.524 16 2.5 12.976 2.5 9.25C2.5 5.524 5.524 2.5 9.25 2.5ZM9.25 14.5C12.1502 14.5 14.5 12.1502 14.5 9.25C14.5 6.349 12.1502 4 9.25 4C6.349 4 4 6.349 4 9.25C4 12.1502 6.349 14.5 9.25 14.5ZM15.6137 14.5532L17.7355 16.6742L16.6742 17.7355L14.5532 15.6137L15.6137 14.5532Z" fill="#868C98"/>
        </svg>     
    )
  }

  const FilterIcon = () => {
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 14.5H11.5V13H8.5V14.5ZM3.25 5.5V7H16.75V5.5H3.25ZM5.5 10.75H14.5V9.25H5.5V10.75Z" fill="#525866"/>
        </svg>
    )
    
  }

  const SortDesc = () => {
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4V13H18.25L15.25 16.75L12.25 13H14.5V4H16ZM10 14.5V16H3.25V14.5H10ZM11.5 9.25V10.75H3.25V9.25H11.5ZM11.5 4V5.5H3.25V4H11.5Z" fill="#868C98"/>
        </svg>
    )
    
  }
  const ArrowDown = () => {
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99999 10.879L13.7125 7.1665L14.773 8.227L9.99999 13L5.22699 8.227L6.28749 7.1665L9.99999 10.879Z" fill="#868C98"/>
        </svg>
    )
    
  }

  const EyeIcon = () => {
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99999 3.25C14.044 3.25 17.4085 6.16 18.1142 10C17.4092 13.84 14.044 16.75 9.99999 16.75C5.95599 16.75 2.59149 13.84 1.88574 10C2.59074 6.16 5.95599 3.25 9.99999 3.25ZM9.99999 15.25C11.5296 15.2497 13.0138 14.7301 14.2096 13.7764C15.4055 12.8226 16.2422 11.4912 16.5827 10C16.2409 8.50998 15.4037 7.18 14.208 6.22752C13.0122 5.27504 11.5287 4.7564 9.99999 4.7564C8.47126 4.7564 6.98776 5.27504 5.79202 6.22752C4.59629 7.18 3.75907 8.50998 3.41724 10C3.75781 11.4912 4.5945 12.8226 5.79035 13.7764C6.9862 14.7301 8.47039 15.2497 9.99999 15.25ZM9.99999 13.375C9.10489 13.375 8.24644 13.0194 7.61351 12.3865C6.98057 11.7535 6.62499 10.8951 6.62499 10C6.62499 9.10489 6.98057 8.24645 7.61351 7.61351C8.24644 6.98058 9.10489 6.625 9.99999 6.625C10.8951 6.625 11.7535 6.98058 12.3865 7.61351C13.0194 8.24645 13.375 9.10489 13.375 10C13.375 10.8951 13.0194 11.7535 12.3865 12.3865C11.7535 13.0194 10.8951 13.375 9.99999 13.375ZM9.99999 11.875C10.4973 11.875 10.9742 11.6775 11.3258 11.3258C11.6774 10.9742 11.875 10.4973 11.875 10C11.875 9.50272 11.6774 9.02581 11.3258 8.67417C10.9742 8.32254 10.4973 8.125 9.99999 8.125C9.50271 8.125 9.0258 8.32254 8.67417 8.67417C8.32254 9.02581 8.12499 9.50272 8.12499 10C8.12499 10.4973 8.32254 10.9742 8.67417 11.3258C9.0258 11.6775 9.50271 11.875 9.99999 11.875Z" fill="#525866"/>
        </svg>
    )
  }

  const StatusIcons = {
    submitted: () => (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10C7.7614 10 10 7.7614 10 5C10 2.23857 7.7614 0 5 0C2.23857 0 0 2.23857 0 5C0 7.7614 2.23857 10 5 10Z" fill="#868C98"/>
        </svg>
    ),
    processing: () => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8.6 8V5H7.4V9.2H11V8H8.6Z" fill="#F27B2C"/>
        </svg>
    ),
    successful: () => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#1C7F4E"/>
        </svg>
    ),
    declined: () => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#FF0000"/>
        </svg>
    ),
    confirmed: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#1C7F4E"/>
      </svg>
    ),
    completed: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.76122 9.05581L8.60842 9.90301L13.688 4.82341L14.5364 5.67181L8.60842 11.5998L4.79002 7.78141L5.63842 6.93301L6.91342 8.20801L7.76122 9.05521V9.05581ZM7.76242 7.35901L10.7336 4.38721L11.5796 5.23321L8.60842 8.20501L7.76242 7.35901ZM6.06623 10.752L5.21842 11.5998L1.40002 7.78141L2.24842 6.93301L3.09622 7.78081L3.09562 7.78141L6.06623 10.752Z" fill="#1C7F4E"/>
      </svg>
    ),
    cancelled: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#FF0000"/>
      </svg>
    )
  };

  export function DataTable({ onRowClick, applicationData = [], tableStatus, showDocumentsColumn = true }: { onRowClick: (row: any) => void, applicationData, tableStatus: Array<string>, showDocumentsColumn?: boolean}) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    })

    const columns: ColumnDef<ServiceCol>[] = [
      {
        accessorKey: "id",
        header: "Application ID",
      },
      {
        accessorKey: "services",
        header: "Services",
        cell: ({ getValue }) => {
          const services = getValue() as string[];
          const displayedServices = services.slice(0, 2);
          const remainingCount = Math.max(0, services.length - 2);
          return (
            <div className="flex flex-wrap gap-1">
              {displayedServices.map((service, index) => (
                <span
                  key={index}
                  className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium capitalize",
                    serviceColors[service] || "bg-gray-100 text-gray-800"
                  )}
                >
                  {service}
                </span>
              ))}
              {remainingCount > 0 && <span className="bg-[#F6F8FA] rounded-full  px-2 flex items-center">{remainingCount}+</span>}
            </div>
          );
        },
      },
      ...(showDocumentsColumn ? [{
        accessorKey: "documents",
        header: "Documents Attached",
      }] : []),
      {
        accessorKey: "date",
        header: "Date of Submission",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue() as Status;
          const StatusIcon = StatusIcons[status];
          return (
            <div className={clsx(
              "inline-flex items-center gap-2 px-2 py-1 border border-[#E2E4E9] text-xs font-medium capitalize",
              //status === "submitted" && "bg-yellow-100 text-yellow-800",
              //status === "processing" && "bg-blue-100 text-blue-800",
              //status === "successful" && "bg-green-100 text-green-800",
              //status === "declined" && "bg-red-100 text-red-800"
            )}>
              <StatusIcon />
              <span>{status}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ getValue }) => {
          const action = getValue() as String
          return (
            <div className={clsx(
              "inline-flex items-center gap-2 py-1 text-xs font-medium capitalize",
            )}>
              <EyeIcon />
              <span>view</span>
            </div>
          );
        },
      },
    ]

  
    const table = useReactTable({
      data: applicationData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onGlobalFilterChange: setGlobalFilter,
      getPaginationRowModel: getPaginationRowModel(),
      state: {
        sorting,
        columnFilters,
        globalFilter,
        pagination,
      },
      onPaginationChange: setPagination
    })

    const handleFilterClick = () => {
        // TODO: Implement filter dropdown or modal
        console.log('Filter button clicked');
    };
  
    return (
      <div className="bg-white rounded-md p-2">
        <div className="flex flex-col md:flex-row gap-1 md:gap-0 items-center justify-between py-4">
            <div className="flex space-x-2 bg-[#F6F8FA] p-1 rounded-md">
            {tableStatus.map((status) => (
                <span
                key={status}
                onClick={() => setStatusFilter(status as Status | 'all')}
                className={clsx(
                    'px-3 py-1 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200',
                    statusFilter === status
                    ? 'bg-white text-[#01170C] font-medium'
                    : 'bg-transparent text-[#868C98] hover:bg-gray-200'
                )}
                >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            ))}
            </div>
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
                onClick={handleFilterClick}
                variant="outline"
                className="flex items-center space-x-2"
                >
                    <FilterIcon />
                    <span>Filter</span>
                </Button>
                <Button
                onClick={handleFilterClick}
                variant="outline"
                className="flex items-center space-x-2"
                >
                    <SortDesc />
                    <span>Sort by</span>
                    <ArrowDown />
                </Button>
            </div>
            
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="bg-[#F6F8FA]">
                        {header.isPlaceholder
                          ? null
                          : 
                          <div className="flex items-center space-x-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <SortIcon />
                        </div>}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                  className=""
                    onClick={() => {onRowClick(
                      {
                        row,
                        id: row.id,
                        index: row.index,
                        original: row.original,
                        // any other properties you need
                      }
                    )}}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="border-b-2">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={showDocumentsColumn ? columns.length : columns.length - 1} className="h-24 text-center">
                    No applications submitted yet. Complete the application process to see data here.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {table.getRowModel().rows.length > 0 ? <Pagination className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <PaginationContent className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <PaginationItem>
                <p className="text-sm text-gray-700">
                  Page{' '}
                  <span className="font-medium">
                    {Math.min((table.getState().pagination.pageIndex + 1) * 5, table.getFilteredRowModel().rows.length)}
                  </span>
                  {' '}of{' '}
                  <span className="font-medium">{table.getFilteredRowModel().rows.length}</span>
                </p>
              </PaginationItem>
              <PaginationItem className="flex gap-2">
              <Button onClick={()=> table.firstPage} className="border-none hover:bg-slate-200 bg-white text-black">
                {"<<"}
              </Button>
              <nav className="inline-flex -space-x-px gap-1 rounded-md shadow-sm" aria-label="Pagination">
                <button
                  className="inline-flex items-center p-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Previous</span>
                  {'<'}
                </button>
                {(() => {
                  const currentPage = table.getState().pagination.pageIndex + 1;
                  const totalPages = table.getPageCount();
                  const pageNumbers = [];
          
                  if (totalPages <= 5) {
                    for (let i = 1; i <= totalPages; i++) {
                      pageNumbers.push(i);
                    }
                  } else {
                    if (currentPage <= 3) {
                      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
                    } else if (currentPage >= totalPages - 2) {
                      pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                    } else {
                      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                    }
                  }

                return pageNumbers.map((page, index) => (
                  page === '...' ? (
                    <PaginationEllipsis key={`ellipsis-${index}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</PaginationEllipsis>
                  ) : (
                    <Button
                      key={page}
                      className={clsx(
                        "inline-flex items-center px-4 py-2 text-sm font-semibold text-[#01170C] hover:bg-[#E2E4E9] bg-white border",
                        table.getState().pagination.pageIndex === Number(page) - 1 && " text-[#01170C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      )}
                      onClick={() => table.setPageIndex(Number(page) - 1)}
                    >
                      {page}
                    </Button>
                  )
                ));
                })()}
                <button
                  className="inline-flex items-center p-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Next</span>
                  {">"}
                </button>
              </nav>
              <Button onClick={() => table.lastPage} className="border-none hover:bg-slate-200 bg-white text-black">
                {">>"}
              </Button>
            </PaginationItem>
            <PaginationItem>
              <RowsPerPageDropdown table={table} pageSizeOptions={pageSizeOptions} />
            </PaginationItem>
          </PaginationContent>
        </Pagination> : null }
        </div>
      </div>
    )
  }