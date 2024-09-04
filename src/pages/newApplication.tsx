import { useEffect, useState } from 'react';
import AppLayout from './Components/appLayout'
import { ProgressBar } from './Components/progressSteps'
import { SelectService } from './Components/service';
import { ReviewDocument } from './Components/reviewDocument';
import { Link } from 'react-router-dom';
import { ProgressFooter } from './Components/progressFooter';
import { Step } from './Components/progressSteps';
import UploadDocument from './Components/uploadDocument';
import { Service, services } from './Components/service';
//import { services } from './Components/service';
import PaymentForm from './Components/payment';

interface UploadedDocument {
  id: string;
  serviceId: string;
  file: File;
  uploadProgress: number;
  uploadStatus: 'uploading' | 'completed' | 'failed';
}

interface ServiceInfo {
  serviceId: string;
  additionalInfo: string;
}


// Mock function to simulate API call
  const saveSelectedServices = async (services: Service[]) => {
  // In a real scenario, this would be an API call
  console.log('Saving services to API:', services);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  };



export default function NewApplication() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [serviceInfos, setServiceInfos] = useState<ServiceInfo[]>([]);

    useEffect(() => {
      // You can perform any initial setup here if needed
  }, []);

  {/*const nextStep = () => {
      dispatch(addCompletedStep(currentStep));
      dispatch(setCurrentStep(Math.min(currentStep + 1, 4) as Step));
  };*/}

  const nextStep = async () => {
    if (currentStep === 1) {
        setIsSaving(true);
        try {
            const result = await saveSelectedServices(selectedServices);
            if (result.success) {
                setCompletedSteps([...completedSteps, currentStep]);
                setCurrentStep(Math.min(currentStep + 1, 4));
            } else {
                // Handle error
                console.error('Failed to save services');
            }
        } catch (error) {
            console.error('Error saving services:', error);
        } finally {
            setIsSaving(false);
        }
    } else {
        setCompletedSteps([...completedSteps, currentStep]);
        setCurrentStep(Math.min(currentStep + 1, 4));
    }
};

const handleUpdateDocuments = (newDocuments: UploadedDocument[]) => {
  setUploadedDocuments(prevDocs => {
    const updatedDocs = [...prevDocs];
    newDocuments.forEach(newDoc => {
      const index = updatedDocs.findIndex(doc => doc.id === newDoc.id);
      if (index !== -1) {
        updatedDocs[index] = newDoc;
      } else {
        updatedDocs.push(newDoc);
      }
    });
    return updatedDocs;
  });
};

const handleUpdateAdditionalInfo = (serviceId: string, info: string) => {
  setServiceInfos(prevInfos => {
    const updatedInfos = [...prevInfos];
    const index = updatedInfos.findIndex(i => i.serviceId === serviceId);
    if (index !== -1) {
      updatedInfos[index] = { ...updatedInfos[index], additionalInfo: info };
    } else {
      updatedInfos.push({ serviceId, additionalInfo: info });
    }
    return updatedInfos;
  });
};


const previousStep = () => {
  if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCompletedSteps(completedSteps.filter(step => step !== currentStep - 1));
  }
};

  {/*const previousStep = () => {
      if (currentStep > 1) {
          dispatch(setCurrentStep((currentStep - 1) as Step));
          dispatch(removeCompletedStep(currentStep - 1));
      }
  };
*/}
  const updateSelectedServices = (services: Service[]) => {
    setSelectedServices(services);
    const newTotalPrice = services.reduce((total, service) => total + service.cost, 0);
    setTotalPrice(newTotalPrice);
};

    const renderStepContent = () => {
        switch (currentStep) {
          case 1:
            return (
              <SelectService selectedServices={selectedServices.map(s => s.id)} onServiceSelect={updateSelectedServices}  />
            );
          case 2:
            return <UploadDocument 
            selectedServices={selectedServices.map(s => s.id)}
            services={selectedServices}
            onUpdateDocuments={(documents) => {
              // Handle document updates
            }}
            onUpdateAdditionalInfo={(serviceId, info) => {
              // Handle additional info updates
            }}  />;
          case 3:
            return <ReviewDocument 
                    totalPrice={totalPrice}
                    selectedServices={selectedServices}
                    uploadedDocuments={uploadedDocuments}
                    serviceInfos={serviceInfos}
                    services={services}  
                    />;
          case 4:
            return <PaymentForm />;
          default:
            return null;
        }
      };

  return (
    <AppLayout>
        <div className='py-10'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <Link to={"/application"}
                     className='border inline-block rounded-full p-1'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.99615 9.28006H15.76V10.7201H6.99615L10.8582 14.5821L9.84015 15.6002L4.23999 10.0001L9.84015 4.3999L10.8582 5.41798L6.99615 9.28006Z" fill="#525866"/>
                        </svg>
                    </Link>
                    <h5 className='text-lg font-medium'>New Application</h5>
                </div>
                <div className=''>
                    <p className='text-sm font-medium'>Application will be processed for $0</p>
                </div>
            </div>
        </div>
        <div className="mx-auto">
            <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />
            {renderStepContent()}
        </div>
        <ProgressFooter 
        currentStep={currentStep} 
        selectedServices={selectedServices}
        totalPrice={totalPrice}
        onNext={nextStep}
        onPrevious={previousStep} />
    </AppLayout>
  )
}
