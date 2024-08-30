import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Step } from '../pages/Components/progressSteps';
//import { UploadedDocument } from '../pages/Components/uploadDocument';

interface UploadedDocument {
    id: string;
    serviceId: number;
    file: File;
    additionalInfo: string;
    uploadProgress: number;
    uploadStatus: 'uploading' | 'completed' | 'failed';
}

interface ServiceInfo {
  serviceId: number;
  additionalInfo: string;
}

interface ProgressState {
  currentStep: Step;
  completedSteps: Step[];
  selectedServices: number[];
  totalPrice: number;
  uploadedDocuments: UploadedDocument[];
  serviceInfos: ServiceInfo[];
}

const initialState: ProgressState = {
  currentStep: 1,
  completedSteps: [],
  selectedServices: [],
  totalPrice: 2500, // Default price, adjust as needed
  uploadedDocuments: [],
  serviceInfos: []
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<Step>) => {
      state.currentStep = action.payload;
    },
    addCompletedStep: (state, action: PayloadAction<Step>) => {
      if (!state.completedSteps.includes(action.payload)) {
        state.completedSteps.push(action.payload);
      }
    },
    removeCompletedStep: (state, action: PayloadAction<Step>) => {
      state.completedSteps = state.completedSteps.filter(step => step !== action.payload);
    },
    setSelectedServices: (state, action: PayloadAction<number[]>) => {
        state.selectedServices = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
    state.totalPrice = action.payload;
    },
    toggleService: (state, action: PayloadAction<{ id: number; cost: number }>) => {
        const { id, cost } = action.payload;
        const index = state.selectedServices.indexOf(id);
        if (index > -1) {
          state.selectedServices.splice(index, 1);
          state.totalPrice -= cost;
        } else {
          state.selectedServices.push(id);
          state.totalPrice += cost;
        }
    },
    uploadDocument: (state, action: PayloadAction<Omit<UploadedDocument, 'uploadProgress' | 'uploadStatus'>>) => {
        const index = state.uploadedDocuments.findIndex(doc => doc.serviceId === action.payload.serviceId);
        state.uploadedDocuments.push({
          ...action.payload,
          uploadProgress: 0,
          uploadStatus: 'uploading',
        });
    },
    updateAdditionalInfo: (state, action: PayloadAction<{id: string; info: string }>) => {
        const index = state.uploadedDocuments.findIndex(doc => doc.id === action.payload.id);
        if (index > -1) {
            state.uploadedDocuments[index].additionalInfo = action.payload.info;
        }
    },
    updateUploadProgress: (state, action: PayloadAction<{id: string, progress: number}>) => {
      const document = state.uploadedDocuments.find(doc => doc.id === action.payload.id)
      if (document) {
        document.uploadProgress = action.payload.progress
      }
    },
    updateUploadStatus: (state, action: PayloadAction<{ id: string; status: 'uploading' | 'completed' | 'failed' }>) => {
      const document = state.uploadedDocuments.find(doc => doc.id === action.payload.id);
      if (document) {
        document.uploadStatus = action.payload.status;
      }
    },
    updateServiceInfo: (state, action: PayloadAction<ServiceInfo>) => {
      const existingInfo = state.serviceInfos.find(info => info.serviceId === action.payload.serviceId);
      if (existingInfo) {
        existingInfo.additionalInfo = action.payload.additionalInfo;
      } else {
        state.serviceInfos.push(action.payload);
      }
    },
    removeDocument: (state, action: PayloadAction<{id: string}>) => {
      state.uploadedDocuments = state.uploadedDocuments.filter(doc => doc.id !== action.payload.id)
    },
    resetApplication: () => {
      return initialState
    },
  },
});

export const { setCurrentStep, addCompletedStep, removeCompletedStep, toggleService, uploadDocument, updateAdditionalInfo, updateServiceInfo, resetApplication, updateUploadProgress, updateUploadStatus, removeDocument } = progressSlice.actions;
export default progressSlice.reducer


/*if (index > -1) {
  state.uploadedDocuments[index] = action.payload;
} else {
  state.uploadedDocuments.push(
    {
      ...action.payload,
      uploadProgress: 0,
      uploadStatus: 'uploading',
    }
  );
}*/