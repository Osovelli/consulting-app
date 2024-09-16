import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"

export default function CategoryDetails({ data }) {

    if (!data) return null

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white shadow-sm">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h2 className="text-lg font-semibold capitalize">Category details</h2>
      </div>
      <div className="p-4 space-y-6">
        <div className="space-y-3 border-b-2 pb-2">
            <h4 className="text-xs font-medium text-[#868C98] uppercase">Category Id</h4>
            <p className="text-sm font-medium">{data.id}</p>
        </div>
        <div className="space-y-3 border-b-2 pb-2">
            <h4 className="text-xs font-medium text-[#868C98] uppercase">Category name</h4>
            <Input value={data.categoryName} />
        </div>
      </div>
      <div className="p-4 flex gap-2 border-t mt-20">
        <Button variant="outline" className="w-full text-[#03713A] hover:bg-[#A8E05A] hover:text-white border-[#03713A]">
            Edit
        </Button>
        <Button variant={'destructive'} className="w-full hover:text-[#f0fff8] hover:bg-gray-500 hover:border-1 hover:border-red-500" onClick={() => setIsConfirmModalOpen(true)}>
            Remove
        </Button>
      </div>
    </div>
  )
}