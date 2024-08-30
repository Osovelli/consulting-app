import { useEffect, useState } from 'react';
import AppLayout from './Components/appLayout'
import { ProgressBar } from './Components/progressSteps'
import { SelectService } from './Components/service';
import { ReviewDocument } from './Components/reviewDocument';
import { Link } from 'react-router-dom';
import { ProgressFooter } from './Components/progressFooter';
import { Step } from './Components/progressSteps';
import UploadDocument from './Components/uploadDocument';
//import { services } from './Components/service';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, addCompletedStep, removeCompletedStep } from '../store/progressSlice';
import { RootState } from '../store';
import PaymentForm from './Components/payment';

export default function NewApplication() {
    const dispatch = useDispatch();
    const { currentStep, completedSteps, selectedServices, totalPrice} = useSelector((state: RootState) => state.progress)

    useEffect(() => {
      // You can perform any initial setup here if needed
  }, []);

  const nextStep = () => {
      dispatch(addCompletedStep(currentStep));
      dispatch(setCurrentStep(Math.min(currentStep + 1, 4) as Step));
  };

  const previousStep = () => {
      if (currentStep > 1) {
          dispatch(setCurrentStep((currentStep - 1) as Step));
          dispatch(removeCompletedStep(currentStep - 1));
      }
  };

    const renderStepContent = () => {
        switch (currentStep) {
          case 1:
            return (
              <SelectService />
            );
          case 2:
            return <UploadDocument  />;
          case 3:
            return <ReviewDocument  />;
          case 4:
            return <PaymentForm />;
          default:
            return null;
        }
      };

  return (
    <AppLayout>
        <div className='py-4'>
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
            <ProgressBar />
            {renderStepContent()}
        </div>
        <ProgressFooter />
    </AppLayout>
  )
}
