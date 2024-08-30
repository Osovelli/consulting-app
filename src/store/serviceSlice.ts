// src/store/servicesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../pages/Components/service';

interface ServiceState {
  allServices: Service[];
  selectedServices: String[];
  totalCost: number;
}

const initialState: ServiceState = {
  allServices: [],
  selectedServices: [],
  totalCost: 0,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setAllServices: (state, action: PayloadAction<Service[]>) => {
      state.allServices = action.payload;
    },
    toggleService: (state, action: PayloadAction<String>) => {
      const serviceId = action.payload;
      if (state.selectedServices.includes(serviceId)) {
        state.selectedServices = state.selectedServices.filter(id => id !== serviceId);
      } else {
        state.selectedServices.push(serviceId);
      }
    },
    setSelectedServices: (state, action: PayloadAction<string[]>) => {
      state.selectedServices = action.payload;
    },
    clearSelectedServices: (state) => {
      state.selectedServices = [];
      state.totalCost = 0;
    },
  },
});

export const { setAllServices, setSelectedServices, toggleService, clearSelectedServices } = serviceSlice.actions;

export default serviceSlice.reducer