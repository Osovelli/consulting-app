import { Button } from "../../components/ui/button"
import { Service } from "./service";
import { Step } from "./progressSteps";


type ProgressFooterProps = {
  currentStep: number;
  selectedServices: Service[];
  totalPrice: number;
  onNext: () => void;
  onPrevious: () => void;
};

export const ProgressFooter = ({
  currentStep,
  selectedServices,
  totalPrice,
  onNext,
  onPrevious
}: ProgressFooterProps) => {
 
  const numberOfSelectedService = selectedServices.length
  console.log('no of selected service: ', numberOfSelectedService)

  return (
    <div className='px-6 py-2 flex font-hubot justify-between border mt-2'>
      <Button onClick={onPrevious} disabled={currentStep === 1} className=" disabled:bg-[#F6F8FA] disabled:text-[#CDD0D5] gap-2 rounded-md shadow-inner">
        <span>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.20431 4.99907L5.91681 8.71157L4.85631 9.77207L0.083313 4.99907L4.85631 0.226074L5.91681 1.28657L2.20431 4.99907Z" fill="#CDD0D5"/>
          </svg>
        </span>
        Previous
      </Button>
      <div className="flex items-center gap-2 justify-center flex-wrap">
        <p className="text-sm font-normal text-center">Your application will include</p>
        <span className="bg-[#EFFEDA] px-2 flex items-center gap-1 rounded-full">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2.7999V0.999902C3 0.840772 3.06321 0.68816 3.17574 0.575638C3.28826 0.463116 3.44087 0.399902 3.6 0.399902H8.4C8.55913 0.399902 8.71174 0.463116 8.82426 0.575638C8.93679 0.68816 9 0.840772 9 0.999902V2.7999H11.4C11.5591 2.7999 11.7117 2.86312 11.8243 2.97564C11.9368 3.08816 12 3.24077 12 3.3999V11.7999C12 11.959 11.9368 12.1116 11.8243 12.2242C11.7117 12.3367 11.5591 12.3999 11.4 12.3999H0.6C0.44087 12.3999 0.288258 12.3367 0.175736 12.2242C0.0632141 12.1116 0 11.959 0 11.7999V3.3999C0 3.24077 0.0632141 3.08816 0.175736 2.97564C0.288258 2.86312 0.44087 2.7999 0.6 2.7999H3ZM10.8 7.5999H1.2V11.1999H10.8V7.5999ZM10.8 3.9999H1.2V6.3999H3V5.1999H4.2V6.3999H7.8V5.1999H9V6.3999H10.8V3.9999ZM4.2 1.5999V2.7999H7.8V1.5999H4.2Z" fill="#1C7F4E"/>
          </svg>
          <p className="text-[#025A2E] text-sm font-medium">
            <span className="mx-1">{numberOfSelectedService}</span>
            Service(s)
          </p>
        </span>
        <p className="text-sm font-normal text-center">and will be processed for <b className="font-medium">&#36;{""}{totalPrice}</b></p>
      </div>
      {currentStep < 4 && 
      <Button onClick={onNext} disabled={selectedServices.length === 0} className="bg-[#C1FA6B] text-black disabled:bg-[#F6F8FA] disabled:text-[#CDD0D5] gap-2 items-center rounded-md shadow-inner">
        <span className="flex item-center">
          Next
          <svg className="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7958 9.99907L7.08325 6.28657L8.14375 5.22607L12.9168 9.99907L8.14375 14.7721L7.08325 13.7116L10.7958 9.99907Z" fill={"#01170C"}/>
          </svg>
        </span>
      </Button>
      }
    </div>
  )
}
