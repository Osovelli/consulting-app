import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";

export function ConfirmAppointmentModal({ isOpen, onClose, onConfirm, clientName, date, time }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Confirm Appointment with {clientName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {clientName} has requested an appointment on {date} at {time}. Confirm to accept and schedule the appointment.
          </p>
        </div>
        <div className="mt-6 flex w-full justify-center space-x-4">
          <Button variant="outline" onClick={onClose}>
            Decline Appointment
          </Button>
          <Button className="bg-[#C1FA6B] text-black hover:bg-[#A8E05A]" onClick={onConfirm}>
            Confirm Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}