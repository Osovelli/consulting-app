import { createSelector } from '@reduxjs/toolkit';
import { RootState } from "../../store";
import { v4 as uuid } from 'uuid';


export const selectApplicationData = createSelector(
  (state: RootState) => state.progress.uploadedDocuments,
  (state: RootState) => state.progress.serviceInfos,
  (state: RootState) => state.progress.selectedServices,
  (state: RootState) => state.services.allServices,
  (uploadedDocuments, serviceInfos, selectedServices, allServices) => {
    const applicationId = uuid();
    
    const services = selectedServices.map(serviceId => {
      const service = allServices.find(s => s.id === serviceId);
      return service?.name || '';
    });

    const totalDocuments = uploadedDocuments.filter(doc => 
      selectedServices.includes(doc.serviceId)
    ).length;

    const additionalInfos = serviceInfos
      .filter(info => selectedServices.includes(info.serviceId))
      .map(info => info.additionalInfo)
      .filter(info => info) // Remove empty strings
      .join('; ');
      
      return [{
        id: applicationId.slice(0,8),
        services: services,
        documents: totalDocuments,
        date: new Date().toLocaleDateString(), // You might want to store submission date in your state
        status: 'submitted', // You might want to manage this status in your state
        additionalInfo: additionalInfos || ''
      }];
    });