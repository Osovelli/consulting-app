import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { DatePicker } from './datepicker';

const AppointmentBookingModal = ({ isOpen, onClose }) => {
    const [selectedValue, setSelectedValue] = useState("");
    if (!isOpen) return null;

  return (
    <div className='absolute bg-black bg-opacity-50 flex inset-0 '>
        <div className='fixed inset-y-0 z-50 right-0 items-center justify-center'>
      <div className="bg-[#071D12] text-white w-full max-w-md p-6 rounded-lg  h-full overflow-y-scroll">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-2xl font-bold text-[#C1FA6B]">Book Appointment</h2>
                <p className="mb-4">Reserve Your Appointment</p>
            </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6 text-[#C1FA6B]" />
          </Button>
        </div>
        <form className="space-y-4 border p-4 rounded-lg">
            <div>
                <h2>Schedule Appointment</h2>
            </div>
            <div className='bg-[#013d1d] -mx-4 px-4 text-[#C1FA6B]'>Appointment Details</div>
            <div className="grid grid-cols-2 gap-4">
                <div className='space-y-1'>
                    <label htmlFor="firstName">First name</label>
                    <Input id="firstName" placeholder="E.g John" className="bg-[#013d1d] border-[#025e2c]" />
                </div>
            <div className='space-y-1'>
              <label htmlFor="lastName">Last name</label>
              <Input id="lastName" placeholder="E.g Doe" className="bg-[#013d1d] border-[#025e2c]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className='space-y-1'>
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="hello@example.com" className="bg-[#013d1d] border-[#025e2c]" />
            </div>
            <div className='space-y-1'>
              <label htmlFor="phone">Phone number</label>
              <Input id="phone" placeholder="0810 000 0000" className="bg-[#013d1d] border-[#025e2c]" />
            </div>
          </div>
          <div className='bg-[#013d1d] -mx-4 px-4 text-[#C1FA6B]'>Appointment Details</div>
          <div className='mt-8'>
            <label>Select services</label>
              <Select value={selectedValue} onValueChange={(value) => setSelectedValue(value)}>
                <SelectTrigger className="bg-[#013d1d] border-[#025e2c]">
                <button className="flex items-center justify-between w-full">
                    <span>{selectedValue || "Select service"}</span>
                </button>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Financial anaysis">Financial anaysis</SelectItem>
                    <SelectItem value="Payroll">Payroll</SelectItem>
                    <SelectItem value="Business idea">Business idea</SelectItem>
                </SelectContent>
              </Select>
          </div>
          <div className='space-y-1'>
            <label htmlFor="date">Date</label>
            <Input id="date" type="date" placeholder="DD / MM / YYYY" className="bg-[#013d1d] border-[#025e2c]" />
          </div>
          <div className="flex items-center">
            <div className="flex-1 border-collapse">
              <label htmlFor="time">Time</label>
              <Select>
                <SelectTrigger className="bg-[#013d1d] border-[#025e2c] rounded-r-none">
                    <button className="flex items-center justify-between w-full">
                        <span>{selectedValue || "Select service"}</span>
                    </button>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="11:00">11:00</SelectItem> 
                </SelectContent>
              </Select>
            </div>
            <div className="flex-2">
              <label htmlFor="timezone">Timezone</label>
              <Select>
                <SelectTrigger className="bg-[#013d1d] border-[#025e2c] rounded-l-none">
                    <button className="flex items-center justify-between w-full">
                        <span>GMT</span>
                    </button>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="GMT+1">GMT+1</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='space-y-1'>
            <label htmlFor="additionalInfo">Additional information</label>
            <Textarea 
              id="additionalInfo" 
              placeholder="Kindly input additional information if any to prepare us ahead of the appointment." 
              className="bg-[#013d1d] border-[#025e2c]"
            />
          </div>
          <Button className="w-full bg-[#C1FA6B] text-black hover:bg-[#a8e155]">
            Book Appointment
          </Button>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default AppointmentBookingModal;