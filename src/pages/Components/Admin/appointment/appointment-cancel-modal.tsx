import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";

export function CancelAppointmentModal({ isOpen, onClose, onConfirm, clientName, date, time }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center capitalize">Confirm appointment cancellation</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Are you sure you want to cancel the appointment with {clientName} scheduled for {date} and {time}?
          </p>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#FF0000] text-white hover:bg-[#e54747]" onClick={onConfirm}>
            Cancel Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}