import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X, Search, Calendar } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Input } from '../../../components/ui/input'
import { Checkbox } from "../../../components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Textarea } from "../../../components/ui/textarea"
import { ConfirmAppointmentModal } from './appointment-create-confirm-modal'
import { DatePicker } from '../../Components/datepicker'

export function AppointmentForm({onClose, appointmentData}) {
  const { register, handleSubmit, watch } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false)

  const clientName = watch('clientName');
  const date = watch('date');
  const time = watch('time');

  const onSubmit = (data) => {
    // Open the confirmation modal instead of immediately submitting
    setIsModalOpen(true);
  };

  const handleConfirmAppointment = () => {
    // Here you would typically send the appointment data to your backend
    console.log("Appointment confirmed:", { clientName, date, time });
    setIsModalOpen(false);
    // Add any additional logic here (e.g., clearing the form, showing a success message)
  };

  const services = [
    "Accounting and bookkeeping",
    "Payroll",
    "Financial analysis",
    "Business formation",
    "Business and Individual Taxes",
    "Non-for-Profit Organizations"
  ]

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Schedule Appointment</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">SELECT CLIENT</h3>
          <div className="flex">
            <Input {...register('clientName')}  placeholder="Search client's name" className="rounded-r-none " />
            <Button type="button" className="rounded-l-none bg-lime-400 hover:bg-lime-500 text-black">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">SELECT SERVICES</h3>
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service} className="flex items-center">
                <Checkbox id={service} {...register(service)} />
                <label htmlFor={service} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">APPOINTMENT DETAILS</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
              <div className="relative">
                <DatePicker {...register('date')} />
              </div>
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-1">Time</label>
              <div className="flex">
                <Select {...register('time')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="11:00" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11:00">11:00</SelectItem>
                    {/* Add more time options */}
                  </SelectContent>
                </Select>
                <Select {...register('timezone')}>
                  <SelectTrigger className="w-[120px] ml-2">
                    <SelectValue placeholder="GMT +1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GMT+1">GMT +1</SelectItem>
                    {/* Add more timezone options */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {showError && (
          <p className="text-red-500 text-sm">
            Appointments must be scheduled at least 24 hours in advance. Please select a different time.
          </p>
        )}

        <div>
          <label htmlFor="additional-info" className="block text-sm font-medium mb-1">
            Additional information<span className="text-red-500">*</span>
          </label>
          <Textarea
            id="additional-info"
            {...register('additionalInfo')}
            placeholder="Kindly input additional information if any to prepare us ahead of the appointment."
            className="h-24"
          />
          <div className="text-right text-sm text-gray-500 mt-1">0/200</div>
        </div>

        <div className="flex gap-1 justify-between">
          <Button className='w-full' type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-black">Book appointment</Button>
        </div>
      </form>
      
      <ConfirmAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAppointment}
        clientName={clientName || '[Client Name]'}
        date={date || '[Date]'}
        time={time || '[Time]'}
      />
    </div>
  )
}