//import Header from "./Components/header_application";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "./Components/appLayout";
import { DataTable, } from "./Components/table";
import ApplicationDetails from "./Components/application_detail";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { selectApplicationData } from "./Components/applicationData";
import { resetApplication } from "../store/progressSlice";
import Modal from "./Components/modal";

export default function Application() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    //const [applicationData, setApplicationData] = useState<ServiceCol[]>([]);
    const location = useLocation();
    const applicationData = useSelector(selectApplicationData)
    console.log(applicationData)

    const appStatus = ['submitted', 'processing', 'successful', 'declined']
    

    console.log("applicationData: ", applicationData)

    const dispatch = useDispatch();

    /*const handleNewApplication = () => {
        dispatch(createNewApplication());
        setApplicationData(data)
        // Navigate to the first step of your application process
    };*/

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

    const handleOpenDetails = (applicationData) => {
        setSelectedApplication(applicationData);
        setIsDetailsOpen(true);
    };

    console.log(isDetailsOpen)
    return(
        <AppLayout>
            {/*<Header />*/}
            <div className="relative">
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h5 className="text-2xl font-medium">Applications</h5>
                        <button className="p-2 bg-black text-white  rounded-lg text-sm" onClick={handleNewApplication} >
                            <Link to={"/application/create"} className="flex items-center gap-1">
                                <span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z" fill="white"/>
                                    </svg>
                                </span>
                                New application
                            </Link>
                        </button>
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap gap-4">
                        <div className="p-3 bg-[#C1FA6B] w-full rounded-lg space-y-8">
                            <div className="p-2 rounded-full inline-block bg-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.2 21H4.80002C4.56133 21 4.33241 20.9052 4.16363 20.7364C3.99485 20.5676 3.90002 20.3387 3.90002 20.1V3.9C3.90002 3.66131 3.99485 3.43239 4.16363 3.2636C4.33241 3.09482 4.56133 3 4.80002 3H19.2C19.4387 3 19.6676 3.09482 19.8364 3.2636C20.0052 3.43239 20.1 3.66131 20.1 3.9V20.1C20.1 20.3387 20.0052 20.5676 19.8364 20.7364C19.6676 20.9052 19.4387 21 19.2 21ZM18.3 19.2V4.8H5.70002V19.2H18.3ZM8.40002 7.5H15.6V9.3H8.40002V7.5ZM8.40002 11.1H15.6V12.9H8.40002V11.1ZM8.40002 14.7H12.9V16.5H8.40002V14.7Z" fill="#01170C"/>
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm">Total Submitted Applications</p>
                                <h4 className="text-3xl font-medium">204</h4>
                            </div>
                        </div>
                        <div className="p-3 border border-[#E2E4E9] w-full rounded-lg space-y-8 bg-white">
                            <div className="p-3 rounded-full inline-block border border-[#FFDAC2] bg-white">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2C10.0615 2 11.8812 3.0397 12.9617 4.625H11V6.125H15.5V1.625H14V3.49952C12.6321 1.67875 10.4543 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8H2C2 4.68629 4.68629 2 8 2ZM14 8C14 11.3137 11.3137 14 8 14C5.93858 14 4.11881 12.9603 3.03832 11.375H5V9.875H0.5V14.375H2V12.5005C3.36786 14.3212 5.54573 15.5 8 15.5C12.1421 15.5 15.5 12.1421 15.5 8H14Z" fill="#F27B2C"/>
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-[#F17B2C]">Applications In Review</p>
                                <h4 className="text-3xl font-medium">11</h4>
                            </div>
                        </div>
                        <div className="p-3 border border-[#E2E4E9] w-full rounded-lg space-y-8 bg-white">
                            <div className="p-2 rounded-full inline-block border border-[#CDE3D8] bg-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2 14.8548L18.4728 6.58105L19.7463 7.85365L10.2 17.4L4.4724 11.6724L5.745 10.3998L10.2 14.8548Z" fill="#1C7F4E"/>
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-[#1C7F4E]">Successful Applications</p>
                                <h4 className="text-3xl font-medium">189</h4>
                            </div>
                        </div>
                        <div className="p-3 border border-[#E2E4E9] w-full rounded-lg space-y-8 bg-white">
                            <div className="p-2 rounded-full inline-block border border-[#F8C9C9] bg-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 10.7275L16.455 6.27246L17.7276 7.54506L13.2726 12.0001L17.7276 16.4551L16.455 17.7277L12 13.2727L7.545 17.7277L6.2724 16.4551L10.7274 12.0001L6.2724 7.54506L7.545 6.27246L12 10.7275Z" fill="#FF0000"/>
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-[#FF0000]">Declined Applications</p>
                                <h4 className="text-3xl font-medium">4</h4>
                            </div>
                        </div>
                    </div>
                    <DataTable onRowClick={handleOpenDetails} applicationData={applicationData} tableStatus={appStatus}  />
                </div>
            </div>
            {isDetailsOpen  && 
            <div className=" absolute inset-0 bg-black bg-opacity-50  items-center justify-center z-50 flex">
                
                    <ApplicationDetails 
                        isOpen={isDetailsOpen}
                        onClose={() => setIsDetailsOpen(false)}
                        applicationData={applicationData}
                    />
                
            </div>}
        </AppLayout>
    )
}