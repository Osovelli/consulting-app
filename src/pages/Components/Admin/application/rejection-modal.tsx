import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog"
import { Button } from '../../../../components/ui/button'
import { Textarea } from "../../../../components/ui/textarea"
import { AlertCircle } from 'lucide-react'

export function RejectionModal({ open, onOpenChange, onReject }) {
  const [reason, setReason] = useState('')

  const handleReject = () => {
    onReject(reason)
    setReason('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-base font-medium">
            <AlertCircle className="w-5 h-5 mr-2 text-destructive" />
            Reason for rejection
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Textarea
            placeholder="Placeholder text..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="text-right text-sm text-muted-foreground mt-1">
            {reason.length}/200
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" className='bg-[#FF0000]' onClick={handleReject}>
            Reject application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}