//import { useState, useEffect } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export type Service = {
  id: string;
  name: string;
  desc: string;
  cost: number;
}

export const services: Service[] = [
  {
    id: "1",
    name: 'Accounting and book-keeping',
    desc: 'Ensure your financial records are accurate and up-to-date with our professional accounting and bookkeeping services.',
    cost: 100
  },
  {
    id: "2",
    name: 'Financial Analysis',
    desc: 'Gain valuable insights into your financial health and make informed decisions with our detailed financial analysis services',
    cost: 100
  },
  {
    id: "3",
    name: 'Payroll',
    desc: 'Gain valuable insights into your financial health and make informed decisions with our detailed financial analysis services',
    cost: 100
  },
  {
    id: "4",
    name: 'Business and Individual Taxes',
    desc: 'Optimize your tax returns and ensure compliance with the latest tax regulations for both businesses and individuals',
    cost: 100
  },
  {
    id: "5",
    name: 'Business formation',
    desc: 'Start your business on the right foot with our comprehensive business formation services, from registration to compliance.',
    cost: 100
  },
  {
    id: "6",
    name: 'Non-for-Profit Organizations',
    desc: 'Get specialized financial and regulatory support tailored for non-for-profit organizations to help you achieve your mission.',
    cost: 100
  }
]

type SelectServiceProps = {
  selectedServices: string[];
  onServiceSelect: (services: Service[]) => void;
}

export function SelectService({selectedServices=[], onServiceSelect}: SelectServiceProps) {

  const handleServiceToggle = (checked:boolean,  service: Service) => {
    let updatedServices: Service[];
    if (checked) {
      updatedServices = [...selectedServices.map(id => services.find(s => s.id === id) as Service), service];
    } else {
      updatedServices = selectedServices.map(id => services.find(s => s.id === id) as Service).filter(s => s.id !== service.id);
    }
    onServiceSelect(updatedServices)
  };

    return (
      <div className="font-hubot space-y-4 bg-[#F6F8FA] px-8 pt-2 pb-16">
        <h2 className="text-2xl text-[#868C98] font-medium mb-4 text-center">Select Service(s)</h2>
        {/* Add your service selection form here */}
        <div className="flex flex-wrap gap-2">
          {services.map((service) => {
            const {id, name, desc, cost} = service
            console.log("id no: ", id)
            const isSelected = selectedServices.includes(id);
            //const Key = key.toString()
            return(
            <div className="inline-flex max-w-2xl bg-white border rounded p-2 gap-2 items-start" id={id}>
              <Checkbox
              id={`service-${id}`}
              checked={isSelected}
              onCheckedChange={(checked) => handleServiceToggle(checked === true, service)}
              />
              <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-start">
                <h3 className="text-base font-medium leading-none">{name}</h3>
                <span className="text-xs font-medium text-[#525866] rounded-xl px-1 bg-[#F6F8FA] border ">{cost} USD</span>
              </div>
              <p className="text-sm text-[#868C98]">{desc}</p>
              <Link to={"#"} className="flex items-center gap-2 mt-6">
                <p className="text-sm text-[#AEE160] leading-none">More details</p>
                <svg width="21" height="21" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2958 9.99932L7.58331 6.28682L8.64381 5.22632L13.4168 9.99932L8.64381 14.7723L7.58331 13.7118L11.2958 9.99932Z" fill="#AEE160"/>
                </svg>
              </Link>
            </div>
          </div>)
          })}
          
        </div>
        {/*<button onClick={onNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>*/}
      </div>
    );
  }


  {/* onServicesSelected,
  onTotalCostChange,
  initialSelectedServices,
  initialTotalCost = 0 */}