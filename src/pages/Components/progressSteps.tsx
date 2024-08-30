import React from "react";
//import { CheckIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export type Step = 1 | 2 | 3 | 4;

export function ProgressBar() {

  const { currentStep, completedSteps} = useSelector((state: RootState) => state.progress)

  const steps = [
    "Select Service(s)",
    "Upload Supporting Document",
    "Review",
    "Payment"
  ];
  
  return (
    <div className="flex flex-wrap justify-center items-center space-x-4 text-sm mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`flex items-center ${index + 1 === currentStep ? 'rounded-full px-3 py-1' : 'text-gray-500'}`}>
            <span className={`mr-2 text-xs border py-[2px] rounded-full  ${index + 1 === currentStep ? 'font-semibold bg-[#C1FA6B] px-2' : completedSteps.includes(index + 1) ? 'text-green-800 ' : 'text-gray-500 px-2'}`}>
            {completedSteps.includes(index + 1) ? (
                <CheckIcon />
              ) : (
                <span className={index + 1 === currentStep ? 'font-semibold' : ''}>{index + 1}</span>
              )}
            </span>
            <span className={`text-sm ${index + 1 === currentStep ? 'font-semibold': ""}`}>{step}</span>
          </div>
          {index < steps.length - 1 && (
            <span className="text-gray-300">
                <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.29587 4.99932L0.583374 1.28682L1.64387 0.226318L6.41687 4.99932L1.64387 9.77232L0.583374 8.71182L4.29587 4.99932Z" fill="#868C98"/>
                </svg>
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}


const CheckIcon = () => {
  return(
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 10C0.5 4.47715 4.97715 0 10.5 0C16.0228 0 20.5 4.47715 20.5 10C20.5 15.5228 16.0228 20 10.5 20C4.97715 20 0.5 15.5228 0.5 10Z" fill="#1C7F4E"/>
      <path d="M15.6817 7.2726L9.3187 13.6365L5.5 9.8178L6.7726 8.5452L9.3187 11.0913L14.4091 6L15.6817 7.2726Z" fill="white"/>
    </svg>
  )
}

//{ currentStep, completedSteps }: {currentStep: Step, completedSteps: Step[]}