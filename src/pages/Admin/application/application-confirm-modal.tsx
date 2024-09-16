import { CheckCircle } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"

export default function ConfirmModal({ open, onOpenChange, onConfirm, approvalNumber }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <DialogTitle>Confirm application approval</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base">
          Are you sure you want to approve application with{approvalNumber}? This action cannot be reversed.
        </DialogDescription>
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button className="w-full bg-green-500 hover:bg-green-600 sm:w-auto" onClick={() => onConfirm}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}