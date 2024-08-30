import { useSelector } from "react-redux"
import { PdfIcon, ImageIcon, ExcelIcon } from "./icons"
import { RootState } from "../../store"

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  switch (extension) {
    case 'pdf':
      return <PdfIcon  />;
    case 'jpeg' :
    case 'png':
      return <ImageIcon />;
    case 'xlsx':
    case 'docx':
      return <ExcelIcon />;
    default:
      return <PdfIcon />; // Default icon, you can create a generic file icon for this
  }
};


export const ReviewDocument = () => {
  const { totalPrice, selectedServices, uploadedDocuments, serviceInfos } = useSelector((state: RootState) => state.progress)
  const services = useSelector((state: RootState) => state.services.allServices);

  return (
    <div className="font-hubot">
      <div className="mx-auto py-8 min-h-screen bg-[#F6F8FA] border rounded-lg space-y-4">
        <h3 className="text-sm text-[#868C98] font-medium uppercase text-center">
          Review services and supporting document
        </h3>
        <div className="relative h-full  md:h-[95%] text-center py-4 md:mx-64 bg-white">
          <div className="">
            <p className="text-xs font-normal">application fee</p>
            <h4 className="text-3xl font-medium text-[#01170C]">${totalPrice.toFixed(2)}</h4>
          </div> 
            {selectedServices.map((serviceId) => {
              const service = services.find(s => s.id === serviceId);
              if (!service) return null; // Skip if service not found
              // Filter documents for this specific service
              const serviceDocuments = uploadedDocuments.filter(doc => doc.serviceId === serviceId);
            
              // Find additional info for this specific service
              const serviceInfo = serviceInfos.find(info => info.serviceId === serviceId);

              return (
                <div className="mt-6 px-2 text-start space-y-3" >
                  <h5 className="text-xs font-medium text-[#868C98] text-start leading-6 uppercase tracking-wide bg-[#F6F8FA]" >{service.name}</h5>
                  <div className="">
                    <div className="">
                      <p className="text-xs text-[#7F7D83] my-1">Attached Files</p>
                      {serviceDocuments.map(doc => {
                        return(
                          <div key={doc.id} className="space-y-2">
                            <div className="flex gap-2">
                              {getFileIcon(doc.file.name)}
                              <p className=" text-sm font-normal">{doc.file.name}</p>
                            </div>
                          </div>
                        )
                      })}
                      <div className="md:my-10">
                        <div>
                            <h5 className="text-sm font-normal text-[#7F7D83]">Additional Information</h5>
                            <p className="text-sm font-normal">{serviceInfo?.additionalInfo || "No additional info"}</p>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="bg-black py-4 rounded-b-xl absolute inset-x-0 bottom-0">
              <p className="text-xs text-white text-center">Please review and confirm the details above before making a payment.</p>
            </div>            
        </div>
      </div>
    </div>
  )
}
