//import Header from "./Components/header_application";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "./Components/appLayout";
import { DataTable, } from "./Components/table";
import ScheduleAppointment from "./Components/schedule_appointment";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { selectApplicationData } from "./Components/applicationData";
import { resetApplication } from "../store/progressSlice";
import Modal from "./Components/modal";

export default function Appointment() {
    const [isSchedulesOpen, setIsScheduleOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    //const [applicationData, setApplicationData] = useState<ServiceCol[]>([]);
    const location = useLocation();
    const applicationData = useSelector(selectApplicationData)
    console.log(applicationData)
    

    console.log("applicationData: ", applicationData)

    const dispatch = useDispatch();

    /*const handleNewApplication = () => {
        dispatch(createNewApplication());
        setApplicationData(data)
        // Navigate to the first step of your application process
    };*/

    const appointmentStatus = ['Confirmed', 'Completed', 'Cancelled']

    const handleNewApplication = () => {
        dispatch(resetApplication());
        // Any other logic needed for starting a new application
      };

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
                    <DataTable onRowClick={handleScheduleOpen} applicationData={applicationData} tableStatus={appointmentStatus} showDocumentsColumn={false} />
                </div>
                {isModalOpen && 
                <Modal>
                </Modal>}
            </div>
            {isSchedulesOpen  && 
            <div className=" absolute inset-0 bg-black bg-opacity-50  items-center justify-center z-50 flex">
                <ScheduleAppointment isOpen={handleScheduleOpen} applicationData={applicationData} onClose={() => setIsScheduleOpen(false)} />
            </div>}
        </AppLayout>
    )
}