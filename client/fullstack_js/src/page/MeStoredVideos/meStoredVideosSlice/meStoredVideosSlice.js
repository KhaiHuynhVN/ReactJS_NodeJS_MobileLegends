import { createSlice } from '@reduxjs/toolkit';

const meStoredVideosSlice = createSlice({
   name: 'meStoredVideos',
   initialState: {
      datas: [],
      selectValue: '',
      checkbox: [],
      checkboxAll: false,
      disableExecBtn: true,
      videoCounter: 0,
      videoCounterAll: 0,
      deletedVideoCounter: 0,
      reRender: false,
      currPage: Number(new URLSearchParams(window.location.search).get('page')) || 1,
      totalPages: 0,
      perPage: 5,
      loadingVideoItems: false,
      searchValue: '',
      showLoadingSearchIcon: false,
      deleteVideoModal: {
         enable: false,
         title: '',
         id: '',
      },
      sortVideos: {
         col: '',
         value: 'default',
         type: '',
      },
   },
   reducers: {
      setDatas(state, action) {
         state.datas = action.payload;
      },
      setLoadingVideoItems(state, action) {
         state.loadingVideoItems = action.payload;
      },
      setSelectValue(state, action) {
         state.selectValue = action.payload;
      },
      setSortVideos(state, action) {
         state.sortVideos = action.payload;
      },
      setCheckBox(state, action) {
         state.checkbox.includes(action.payload.id)
            ? (state.checkbox = state.checkbox.filter((item) => item !== action.payload.id))
            : state.checkbox.push(action.payload.id);

         state.checkboxAll = action.payload.datasLength === state.checkbox.length ? true : false;
      },
      resetCheckBox(state) {
         state.checkbox = [];
         state.checkboxAll = false;
      },
      setCheckBoxAll(state, action) {
         state.checkboxAll = action.payload.checked;

         state.checkbox = state.checkboxAll ? action.payload.allId : [];
      },
      setDisableExecBtn(state, action) {
         state.disableExecBtn = action.payload;
      },
      setVideoCounter(state, action) {
         state.videoCounter = action.payload;

         // When switching pages, reset currPage from urlCurrPage
         const totalPages = Math.ceil(action.payload / state.perPage);
         let urlCurrPage = Number(new URLSearchParams(window.location.search).get('page'));

         state.totalPages = totalPages;

         if (!urlCurrPage || urlCurrPage < 1) {
            urlCurrPage = 1;
         } else if (urlCurrPage > totalPages) {
            urlCurrPage = totalPages;
         }

         state.currPage = urlCurrPage;
      },
      setVideoCounterAll(state, action) {
         state.videoCounterAll = action.payload;
      },
      setDeletedVideoCounter(state, action) {
         state.deletedVideoCounter = action.payload;
      },
      setDeleteVideoModal(state, action) {
         state.deleteVideoModal.title = action.payload.title;
         state.deleteVideoModal.id = action.payload.id;
      },
      setRerender(state) {
         state.reRender = !state.reRender;
      },
      setCurrPage(state, action) {
         state.currPage = action.payload;
      },
      setSearchValue(state, action) {
         state.searchValue = action.payload;
      },
      setShowLoadingSearchIcon(state, action) {
         state.showLoadingSearchIcon = action.payload;
      },
   },
});

export default meStoredVideosSlice;
