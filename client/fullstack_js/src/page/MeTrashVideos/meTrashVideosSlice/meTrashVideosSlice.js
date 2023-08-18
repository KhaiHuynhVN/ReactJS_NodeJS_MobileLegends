import { createSlice } from '@reduxjs/toolkit';

const meTrashVideosSlice = createSlice({
   name: 'meTrashVideos',
   initialState: {
      datas: [],
      selectValue: '',
      checkbox: [],
      checkboxAll: false,
      disableExecBtn: true,
      deletedVideoCounterAll: 0,
      deletedVideoCounter: 0,
      reRender: false,
      currPage: Number(new URLSearchParams(window.location.search).get('trash-videos-page')) || 1,
      totalPages: 0,
      perPage: 5,
      loadingVideoItems: false,
      searchValue: '',
      showLoadingSearchIcon: false,
      videoModal: {
         enable: false,
         title: '',
         id: '',
         type: '',
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
      setDeletedVideoCounter(state, action) {
         state.deletedVideoCounter = action.payload;

         // When switching pages, reset currPage from urlCurrPage
         const totalPages = Math.ceil(action.payload / state.perPage);
         let urlCurrPage = Number(
            new URLSearchParams(window.location.search).get('trash-videos-page'),
         );

         state.totalPages = totalPages;

         if (!urlCurrPage || urlCurrPage < 1) {
            urlCurrPage = 1;
         } else if (urlCurrPage > totalPages) {
            urlCurrPage = totalPages;
         }

         state.currPage = urlCurrPage;
      },
      setDeletedVideoCounterAll(state, action) {
         state.deletedVideoCounterAll = action.payload;
      },
      setVideoModal(state, action) {
         state.videoModal = {
            ...action.payload,
         };
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

export default meTrashVideosSlice;
