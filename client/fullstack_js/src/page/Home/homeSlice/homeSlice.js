import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
   name: 'home',
   initialState: {
      datas: [],
   },
   reducers: {
      setDatas(state, action) {
         state.datas = action.payload;
      },
   },
});

export default homeSlice;
