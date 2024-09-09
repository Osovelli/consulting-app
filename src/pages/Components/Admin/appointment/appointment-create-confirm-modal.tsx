import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";

type ConfirmAppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clientName: string;
  date: string;
  time: string;
};

export function ConfirmAppointmentModal({
  isOpen,
  onClose,
  onConfirm,
  clientName,
  date,
  time
}: ConfirmAppointmentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#22C55E"/>
              </svg>
            </div>
            Confirm Client Appointment
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to schedule an appointment with {clientName} at {date} and {time}?
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#C1FA6B] text-black hover:bg-[#A8E05A]" onClick={onConfirm}>
            Schedule Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}