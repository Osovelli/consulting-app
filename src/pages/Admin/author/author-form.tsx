import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { useState } from "react"
import { Label } from "../../../components/ui/label"
import { useNavigate } from "react-router-dom"

export const AuthorForm = () => {
    const [showError, setShowError] = useState(false)
    const  navigate = useNavigate()
  
    const onSubmit = (data) => {
      // Open the confirmation modal instead of immediately submitting
    };

    return(
        <div className="w-full rounded-lg my-6">
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <h2 className="text-lg font-semibold capitalize">Create new author</h2>
            </div>
            <form onSubmit={onSubmit} className="space-y-6 p-4">
                <div className=" space-y-6">
                    <div className="space-y-2">
                        <Label>Author name</Label>
                        <Input type="text" placeholder="Service name" className="rounded-r-none " />
                    </div>
                    <div className="space-y-2">
                        <Label>Job title</Label>
                        <Input type="text" placeholder="Service name" className="rounded-r-none " />
                    </div>
                    <div className="space-y-2">
                        <Label>Author Avatar link</Label>
                        <Input type="link" placeholder="Service name" className="rounded-r-none " />
                    </div>
                </div>
                {showError && (
                <p className="text-red-500 text-sm">
                    Appointments must be scheduled at least 24 hours in advance. Please select a different time.
                </p>
                )}
                <div className="flex gap-1 justify-between">
                    <Button className='w-full' type="button" variant="outline" onClick={() => {navigate('/blog')}}>Cancel</Button>
                    <Button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-black">Create service</Button>
                </div>
            </form>
        </div>      
    )
}