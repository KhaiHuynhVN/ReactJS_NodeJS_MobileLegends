import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
   name: 'home',
   initialState: {
      datas: [],
      hasMore: true,
      startIndex: 0,
      perPage: 8,
      datasPending: false,
      loadingMore: false,
   },
   reducers: {
      setDatas(state, action) {
         state.datas = action.payload;
      },
      setHasMore(state, action) {
         state.hasMore = action.payload;
      },
      setStartIndex(state, action) {
         state.startIndex = action.payload;
      },
      setDatasPending(state, action) {
         state.datasPending = action.payload;
      },
      setLoadingMore(state, action) {
         state.loadingMore = action.payload;
      },
   },
});

export default homeSlice;
