//import Header from "./Components/header_application";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "./Components/appLayout";
//import { DataTable, } from "./Components/table";
import { DataTable } from "./Components/Table/data-table";
import ScheduleAppointment from "./Components/schedule_appointment";
import Modal from "./Components/modal";
import { appointmentData as Data } from "./Components/mock/appointment-data";

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
import { ActionIcon } from "./Components/icons";

  // This type should match your data structure
type Application = {
    appointmentId: string
    companyName: string
    services: string[]
    status: string
    time: string
    date: string
  }

export default function Appointment() {
    const [isSchedulesOpen, setIsScheduleOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    //const [applicationData, setApplicationData] = useState<ServiceCol[]>([]);
    const location = useLocation();

    console.log("applicationData: ", Data)

    /*const handleNewApplication = () => {
        dispatch(createNewApplication());
        setApplicationData(data)
        // Navigate to the first step of your application process
    };*/

    const appointmentStatus = ['Confirmed', 'Completed', 'Cancelled']

    const columns: ColumnDef<Application>[] = [
        {
          accessorKey: "appointmentId",
          header: "Application ID",
        },
        {
          accessorKey: "companyName",
          header: "Company Name",
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
          accessorKey: "time",
          header: "Time",
        },
        {
          accessorKey: "date",
          header: "Date",
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: ({getValue}) => {
            const status = getValue() as String;
            return(
              <span className='flex gap-1 item-center justify-center text-xs font-medium border border-[#E2E4E9] py-1 rounded-md'>
              {
                status === 'Completed' ? (
                  <ActionIcon />  
                ) : status === 'Upcoming' ? (
                  < />
                ) : status === 'Cancelled' ? (
                  <InactiveIcon />
                ) : (
                  <NewIcon />
                )
              }
              {status}
            </span>
            )
            
          }
        },
        {
          header: "actions",
          id: "actions",
          cell: ({ row }) => {
            return (
              <span className='flex gap-2 items-center'  onClick={() => {
                setSelectedAppointment(row.original)
                setSideMenuContent('detail')
                setSideMenuOpen(true)
              }}>
                <EyeLineIcon />
                View
              </span>
            )
          }
          ,
        },
      ]

     // Check if we should open the details panel based on the location state
     useEffect(() => {
        if (location.state && location.state.openDetails) {
            setIsDetailsOpen(true);
            setSelectedApplication(location.state.applicationData);
        }
    }, [location]);

    const handleScheduleOpen = (applicationData) => {
        setSelectedApplication(applicationData);
        setIsScheduleOpen(true);
    };
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
        filterFns: {
          filterByTabAndTime
        },
        //globalFilterFn: hasTimeValue,
      })

    return(
        <AppLayout>
            {/*<Header />*/}
            <div className="relative">
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h5 className="text-2xl font-medium">Appointments</h5>
                        <button className="p-2 bg-black text-white  rounded-lg text-sm" onClick={handleScheduleOpen} >
                            <Link to={""} className="flex items-center gap-1">
                                <span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z" fill="white"/>
                                    </svg>
                                </span>
                                Schedule Appointments
                            </Link>
                        </button>
                    </div>
                    {/*<DataTable onRowClick={handleScheduleOpen} applicationData={Data} tableStatus={appointmentStatus} showDocumentsColumn={false} />*/}
                    <DataTable table={} columns={}  />
                </div>
                {isModalOpen && 
                <Modal>
                </Modal>}
            </div>
            {isSchedulesOpen  && 
            <div className=" absolute inset-0 bg-black bg-opacity-50  items-center justify-center z-50 flex">
                <ScheduleAppointment isOpen={handleScheduleOpen} applicationData={Data} onClose={() => setIsScheduleOpen(false)} />
            </div>}
        </AppLayout>
    )
}