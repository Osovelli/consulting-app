import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { useState } from "react";

import { ConfirmAppointmentModal } from "./appointment-confirm-modal";
import { CancelAppointmentModal } from "./appointment-cancel-modal";

export default function AppointmentDetails({ data }) {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

    const handleConfirmAppointment = () => {
        // Implement your confirmation logic here
        console.log("Appointment confirmed");
        setIsConfirmModalOpen(false);
      };

    const handleCancelAppointment = () => {
        // Implement your cancel logic here
        console.log("Appointment Cancelled");
        setIsCancelModalOpen(false);
      };

    if (!data) return null

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h2 className="text-lg font-semibold capitalize">appointment details</h2>
      </div>
      <div className="p-4 space-y-6">
          <h3 className="text-xs font-medium -mx-4 px-4 py-1 text-[#868C98] mb-2 uppercase bg-[#F6F8FA]">Appointment details</h3>
          <div className="space-y-4">
            <div className=" border-b-2 pb-2">
              <h4 className="text-xs font-medium text-[#868C98] uppercase">appointment ID</h4>
              <p className="text-sm font-medium">{data.appointmentId}</p>
            </div>
            <div className=" border-b-2 pb-2">
              <h4 className="text-xs font-medium text-[#868C98] uppercase">Company's name</h4>
              <p className="text-sm font-medium">{data.companyName}</p>
            </div>
            <div className=" border-b-2 pb-2">
              <h4 className="text-xs font-medium text-[#868C98] uppercase">Contact person's name</h4>
              <p className="text-sm font-medium">Angel Workman</p>
            </div>
            <div className=" border-b-2 pb-2">
              <h4 className="text-xs font-medium text-[#868C98] uppercase">email address & phone</h4>
              <div className="flex flex-wrap items-center sm:gap-2">
                <p className="text-sm font-medium">angelworkman@domain.com</p>
                <p className="text-xs font-normal">+1326572020671</p>
              </div>
            </div>
            <div className=" border-b-2 pb-2 space-y-2">
              <h4 className="text-xs font-medium text-gray-500">status</h4>
              <Badge className="bg-cyan-100 text-cyan-800 rounded-full text-xs font-normal">{data.status}</Badge>
            </div>
            <div className=" border-b-2 pb-2">
              <h4 className="text-xs font-medium text-gray-500">DATE</h4>
              <p className="text-sm font-medium">{data.date}</p>
            </div>
            <div className=" border-b-2 pb-2">
              <h4 className="text-xs font-medium text-[#868C98] uppercase">additional information</h4>
              <p className="text-sm font-medium">
                Kindly input additional information if any to prepare us ahead of the appointment.
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-[#868C98] uppercase">selected services</h4>
              <div className="flex flex-wrap gap-1 items-center">
                {data.services.map((service, key) => {
                    return(
                        <Badge id={key} color="" className="p-1">
                            {service}
                        </Badge>
                    )
                })}
              </div>
            </div>
          </div>
      </div>
      <div className="p-4 flex gap-2 border-t mt-20">
        <Button variant="outline" className="w-full text-[#525866]" onClick={() => setIsCancelModalOpen(true)}>Cancel</Button>
        <Button variant="outline" className="w-full text-[#03713A] hover:bg-[#A8E05A] hover:text-white border-[#03713A]" onClick={() => setIsConfirmModalOpen(true)}>
            Confirm appointment
        </Button>
      </div>
      <ConfirmAppointmentModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmAppointment}
        clientName={data.companyName}
        date={data.date}
        time={data.time || "N/A"} // Add time to your data structure if not present
      />
      <CancelAppointmentModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelAppointment}
        clientName={data.companyName}
        date={data.date}
        time={data.time || "N/A"} // Add time to your data structure if not present
      />
    </div>
  )
}