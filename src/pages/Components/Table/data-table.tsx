import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

 
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
 } from '../../../components/ui/table'

import {
     DropdownMenu,
     DropdownMenuCheckboxItem,
     DropdownMenuContent,
     DropdownMenuTrigger, 
} from '../../../components/ui/dropdown-menu'

import { 
    Pagination,
    PaginationContent,  
    PaginationEllipsis, 
    PaginationItem, 
} from '../../../components/ui/pagination'

import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

const pageSizeOptions = [5, 10, 20, 30, 50, 100];

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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter clients..."
          value={(table.getColumn("clientName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("clientName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
  )
}


const SortIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1667 7.91667L10 3.75L5.83333 7.91667H14.1667ZM14.1667 12.0833L10 16.25L5.83333 12.0833H14.1667Z" fill="#868C98"/>
    </svg>
  );