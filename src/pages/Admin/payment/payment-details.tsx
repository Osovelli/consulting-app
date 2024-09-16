import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"

export default function PaymentDetails({ data }) {
    if (!data) return null

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h2 className="text-lg font-semibold">Payment Details</h2>
      </div>
      <div className="p-4 space-y-6">
        <section>
          <h3 className="text-xs font-medium text-gray-500 mb-2">PAYMENT DETAILS</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium text-gray-500">PAYMENT ID</h4>
              <p className="text-sm font-medium">{data.applicationId}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">AMOUNT</h4>
              <p className="text-sm font-medium">{data.amount}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">PAYMENT TYPE</h4>
              <Badge className="bg-cyan-100 text-cyan-800 rounded-full text-xs font-normal">{data.type}</Badge>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">DATE</h4>
              <p className="text-sm font-medium">{data.date} 18:00 GMT+1</p>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-xs font-medium text-gray-500 mb-2">CLIENT INFORMATION</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium text-gray-500">COMPANY'S NAME</h4>
              <p className="text-sm font-medium">{data.clientName}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">CONTACT PERSON'S NAME</h4>
              <p className="text-sm font-medium">Angel Workman</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">EMAIL ADDRESS & PHONE</h4>
              <p className="text-sm font-medium">angelworkman@domain.com +13265720206711</p>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-xs font-medium text-gray-500 mb-2">RELATED APPLICATION/ APPOINTMENT</h3>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xs font-medium text-gray-500">APPLICATION ID</h4>
              <p className="text-sm font-medium">{data.applicationId}</p>
            </div>
            <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">View details</Button>
          </div>
        </section>
      </div>
      <div className="p-4 border-t mt-16">
        <Button variant="outline" className="w-full">Close</Button>
      </div>
    </div>
  )
}