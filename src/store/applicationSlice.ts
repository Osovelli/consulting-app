import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { RootState } from ".";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
      applicationId: '',
      status: 'draft',
      submissionDate: null,
    },
    reducers: {
    createNewApplication: (state) => {
        state.applicationId = uuidv4();
        state.status = 'draft';
        state.submissionDate = null;
    },
      setStatus: (state, action) => {
        state.status = action.payload;
      },
      setSubmissionDate: (state, action) => {
        state.submissionDate = action.payload;
      },
    },
  });

export const { createNewApplication, setStatus, setSubmissionDate } = applicationSlice.actions;
export default applicationSlice.reducer;