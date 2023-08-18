import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
   name: 'header',
   initialState: {
      backBtn: {
         enable: false,
         to: '',
      },
   },
   reducers: {
      setShowBackBtn(state, action) {
         state.backBtn = { ...state.backBtn, ...action.payload };
      },
   },
});

export default headerSlice;
