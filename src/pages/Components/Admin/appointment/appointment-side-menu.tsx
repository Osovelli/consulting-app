import { Sheet, SheetContent } from "../../../../components/ui/sheet"
import AppointmentDetails from "./appointment-details"
import { AppointmentForm } from "./appointment-form"

type AppointmentSideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: any; // Replace 'any' with your appointment data type
  content: 'detail' | 'form';
}

export function AppointmentSideMenu({ isOpen, onClose, appointmentData, content }: AppointmentSideMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        {content === 'form' ? (
            <AppointmentForm onClose={onClose} appointmentData={appointmentData} />
          ) : (
            <AppointmentDetails data={appointmentData} />
          )}
      </SheetContent>
    </Sheet>
  )
}

