
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { X } from 'lucide-react'

export default function CreateNewClientMenu({ onClose }) {
  return (
    <div className="absolute md:right-0 inset-y-0 bg-white p-6  shadow-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Create new client</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="user@debusinessconsulting.com" />
          <p className="text-xs text-green-600">A verification mail will be sent to this address</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" placeholder="0810 000 0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" placeholder="DD / MM / YYYY" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company's name</Label>
          <Input id="company" placeholder="Tesla Inc" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional information</Label>
          <Textarea 
            id="additionalInfo" 
            placeholder="Placeholder text..." 
            className="resize-none h-24"
          />
          <div className="text-xs text-gray-500 text-right">0/200</div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button className="flex-1" variant="outline">Cancel</Button>
          <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white px-8">
            Create client
          </Button>
        </div>
      </form>
    </div>
  )
}