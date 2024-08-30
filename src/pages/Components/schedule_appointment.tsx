import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { DatePicker } from "./datepicker";
import TimeSelect from "./time_select";
import { Button } from "../../components/ui/button";

const ScheduleAppointment = ({ isOpen, onClose, applicationData }) => {
  
  if (!isOpen || !applicationData || applicationData === 0) return null;

  const application = applicationData[0];

  return (
    <div className="flex">
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 py-2 overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Schedule Appointment</h2>
          <div className="flex gap-1">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
        </div>
        <h4 className="-mx-6 px-6 bg-[#F6F8FA] text-[#868C98] text-sm font-normal font-hubot tracking-wide">Select Service</h4>      
        <div className="space-y-4 py-3">
          <div className="flex gap-2 items-center ">
            <Checkbox />
            <p className="text-sm text-[#01170C] leading-tight">Accounting and bookkeeping</p>
          </div>
          <div className="flex gap-2 items-center ">
            <Checkbox />
            <p className="text-sm text-[#01170C] leading-tight">Payroll</p>
          </div>
          <div className="flex gap-2 items-center ">
            <Checkbox />
            <p className="text-sm text-[#01170C] leading-tight">Financial analysis</p>
          </div>
          <div className="flex gap-2 items-center ">
            <Checkbox />
            <p className="text-sm text-[#01170C] leading-tight">Business formation</p>
          </div>
          <div className="flex gap-2 items-center ">
            <Checkbox />
            <p className="text-sm text-[#01170C] leading-tight">Business and Individual Taxes</p>
          </div>
          <div className="flex gap-2 items-center ">
            <Checkbox />
            <p className="text-sm text-[#01170C] leading-tight">Non-for-Profit Organizations</p>
          </div>
        </div>
        <h4 className="-mx-6 px-6 bg-[#F6F8FA] text-[#868C98] text-sm font-normal font-hubot tracking-wide my-2">Appointment details</h4>
        <div className="space-y-2">
            <div>
                <p className="font-semibold">Date</p>
                <div className="">
                    <DatePicker />
                </div>
            </div>
            <div>
                <p className="font-semibold">Time</p>
                <div>
                    <TimeSelect />
                </div>
            </div>
            <div className="relative">
                <h4 className="font-semibold">Additional information</h4>
                <textarea 
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="Kindly input additional information if any"
                rows={4}
                value={''}
                onChange={(e) => (e.target.value)}
                >
                </textarea>
                <p className="absolute top-24 right-1 text-right text-sm text-gray-500">{(0)}/200</p>
            </div>
        </div>
        <div className="mt-32">
            <div className="flex gap-1 justify-between">
                <Button variant={"outline"} className="flex-1">
                    Cancel
                </Button>
                <Button className="flex-1 bg-[#C1FA6B] text-black hover:text-white" onClick={(onClose)}>
                    Book Appointment
                </Button>
            </div>
        </div>
      </div>
    </div>
    
  );
};

export default ScheduleAppointment;