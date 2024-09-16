
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { ArrowLeft, Paperclip, Send } from "lucide-react"
import { RejectionModal } from "./rejection-modal"
import { useState } from "react"
import ApproveModal from "./application-approval-modal"
import ConfirmModal from "./application-confirm-modal"

export function ApplicationReview({/*application, onClose,*/}) {
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [fileToApprove, setFileToApprove] = useState(null)
  
  const handleReject = (reason) => {
    console.log('Application rejected with reason:', reason)
    setRejectModalOpen(false)
    // Add any additional logic for rejection here
  }

  const handleApprove = (file) => {
    console.log('Application marked as completed with file:', file)
    setFileToApprove(file)
    setApproveModalOpen(false)
    setConfirmModalOpen(true)
    
    // Add any additional logic for completion here
  }

  const handleConfirmApproval = () => {
    console.log('Application approved with file:', fileToApprove)
    setConfirmModalOpen(false)
    // Add any additional logic for approval here
  }

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex items-center gap-4 justify-between mb-6">
        <div className="flex items-center">
          <ArrowLeft className="mr-2" onClick={() => {}} />
          <h1 className="text-xl font-semibold">{'#35466327'}</h1>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" onClick={() => setRejectModalOpen(true)}>Reject application</Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => setApproveModalOpen(true)}>Approve application</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">SUBMITTED</Badge>
              <p className="text-sm text-gray-500">July 15, 2023, 12:22</p>
            </div>
            <div className="space-y-1 text-center">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">IN REVIEW</Badge>
              <p className="text-sm text-gray-500">N/A</p>
            </div>
            <div className="space-y-1 text-right">
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">DECISION</Badge>
              <p className="text-sm text-gray-500">N/A</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">SERVICE 1: FINANCIAL ANALYSIS</h2>
              <div className="space-y-2">
                <p className="text-sm font-medium">Attached files:</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-red-500"><Paperclip className="w-4 h-4 mr-1" /> Handcrafted Granite Fish.pdf</Badge>
                  <Badge variant="secondary" className="text-green-500"><Paperclip className="w-4 h-4 mr-1" /> Rustic Soft Hat.pdf</Badge>
                  <Badge variant="secondary" className="text-blue-500"><Paperclip className="w-4 h-4 mr-1" /> Intelligent Soft Ball.pdf</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Pricing is attached to services based on client's needs. (each service will have their own price tag). Payment will be made after filling the application upon submission.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">SERVICE 2: ACCOUNTING AND BOOKKEEPING SERVICE</h2>
              <div className="space-y-2">
                <p className="text-sm font-medium">Attached files:</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-red-500"><Paperclip className="w-4 h-4 mr-1" /> Handcrafted Granite Fish.pdf</Badge>
                  <Badge variant="secondary" className="text-green-500"><Paperclip className="w-4 h-4 mr-1" /> Rustic Soft Hat.pdf</Badge>
                  <Badge variant="secondary" className="text-blue-500"><Paperclip className="w-4 h-4 mr-1" /> Intelligent Soft Ball.pdf</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Pricing is attached to services based on client's needs. (each service will have their own price tag). Payment will be made after filling the application upon submission.
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Application information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Company's name</span>
                <span className="font-medium">{'clientName'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client name</span>
                <span className="font-medium">Angel Workman</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client's Email</span>
                <span className="font-medium">user@tesla.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client's Phone No.</span>
                <span className="font-medium">+3166083946855</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date submitted</span>
                <span className="font-medium">July 15, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">{'status'}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Services</span>
                <Badge>3 SERVICES</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Messages (1 new)</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="bg-green-100 rounded-lg p-2 max-w-[80%]">
                  <p className="text-sm">Hey there, ive had a look at the latest revisions and i think we are nearly there.</p>
                  <p className="text-xs text-gray-500 mt-1">Amanda Klien • 27.12.2024</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 justify-end">
                <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
                  <p className="text-sm">Yeah ive already spoken to them and i think its going to;</p>
                  <p className="text-xs text-gray-500 mt-1">Admin ([Firstname_lastname]) • 27.12.2024</p>
                </div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Input placeholder="Enter text here..." className="flex-grow" />
              <Button size="icon" className="ml-2">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <RejectionModal 
        open={rejectModalOpen} 
        onOpenChange={setRejectModalOpen}
        onReject={handleReject}
      />
      <ApproveModal
        open={approveModalOpen} 
        onOpenChange={setApproveModalOpen}
        onApprove={handleApprove}
      />
      <ConfirmModal
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={handleConfirmApproval}
        approvalNumber={() => {'applicationId'}}
      />
    </div>
  )
}