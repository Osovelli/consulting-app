import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../../../components/ui/sheet"
import PaymentDetails from './payment-details'

export function PaymentSideMenu({ isOpen, onClose, paymentData }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <PaymentDetails data={paymentData} />
      </SheetContent>
    </Sheet>
  )
}