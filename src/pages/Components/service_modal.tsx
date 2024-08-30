import { X } from 'lucide-react';
import { Button } from '../../components/ui/button';

const ServiceModal = ({ isOpen, onClose, title, content, onschedule }) => {
  if (!isOpen) return null;

  return (
    <div className='absolute inset-0 bg-black bg-opacity-50'>
        <div className="fixed inset-y-0 right-0 w-full sm:w-2/5 bg-white shadow-lg z-50 flex flex-col">
            <div className="p-6 flex-grow overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[#03713A]">{title}</h2>
                    <Button variant="ghost" onClick={onClose}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <div className="text-gray-700 whitespace-pre-wrap">
                    {content}
                </div>
            </div>
            <div className="p-6 border-t">
                <Button className="w-full bg-[#C1FA6B] text-black hover:bg-[#a8e155]" onClick={onschedule}>
                    Schedule appointment
                </Button>
            </div>
        </div>    
    </div>
    
  );
};

export default ServiceModal;