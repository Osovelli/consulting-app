import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { useState } from "react"
//import { Textarea } from "../../../components/ui/textarea"
import { Label } from "../../../components/ui/label"
import { useNavigate } from "react-router-dom"

export const CategoryForm = () => {
    const [showError, setShowError] = useState(false)
    const  navigate = useNavigate()
  
    const onSubmit = (data) => {
      // Open the confirmation modal instead of immediately submitting
    };

    return(
        <div className="w-full rounded-lg my-6">
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <h2 className="text-lg font-semibold capitalize">Create Category</h2>
            </div>
            <form onSubmit={onSubmit} className="space-y-32 p-4">
                <div className="py-2">
                    <div className="space-y-2">
                        <Label>Category name</Label>
                        <Input type="text" placeholder="Category name" className="rounded-r-none " />
                    </div>
                </div>
                {showError && (
                <p className="text-red-500 text-sm">
                    Appointments must be scheduled at least 24 hours in advance. Please select a different time.
                </p>
                )}
                <div className="flex gap-1 justify-between">
                    <Button className='w-full' type="button" variant="outline" onClick={() => navigate('/blog')}>Cancel</Button>
                    <Button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-black">Create service</Button>
                </div>
            </form>
        </div>      
    )
}