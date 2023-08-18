import { createSelector } from '@reduxjs/toolkit';

import { sortLibrary } from '~/vendors';

const selectValue = (state) => state.meTrashVideos.selectValue;
const sortCol = (state) => state.meTrashVideos.sortVideos.col;
const sortType = (state) => state.meTrashVideos.sortVideos.type;
const sortValue = (state) => state.meTrashVideos.sortVideos.value;
const sortVideos = (state) => state.meTrashVideos.sortVideos;
const checkbox = (state) => state.meTrashVideos.checkbox;
const checkboxAll = (state) => state.meTrashVideos.checkboxAll;
const disableExecBtn = (state) => state.meTrashVideos.disableExecBtn;
const deletedVideoCounterAll = (state) => state.meTrashVideos.deletedVideoCounterAll;
const deletedVideoCounter = (state) => state.meTrashVideos.deletedVideoCounter;
const datas = (state) => state.meTrashVideos.datas;
const videoModal = (state) => state.meTrashVideos.videoModal;
const reRender = (state) => state.meTrashVideos.reRender;
const currPage = (state) => state.meTrashVideos.currPage;
const totalPages = (state) => state.meTrashVideos.totalPages;
const perPage = (state) => state.meTrashVideos.perPage;
const loadingVideoItems = (state) => state.meTrashVideos.loadingVideoItems;
const searchValue = (state) => state.meTrashVideos.searchValue;
const showLoadingSearchIcon = (state) => state.meTrashVideos.showLoadingSearchIcon;
const sortedDatas = createSelector(
   sortCol,
   sortType,
   sortValue,
   datas,
   (col, type, value, datas) => {
      if (!datas) return;
      let newDatas = [...datas];
      if (value !== 'default') {
         newDatas = sortLibrary(newDatas, type, value, col);
      } else {
         newDatas = [...datas];
      }
      return newDatas;
   },
);

export {
   selectValue,
   sortCol,
   sortType,
   sortValue,
   sortVideos,
   checkbox,
   checkboxAll,
   disableExecBtn,
   deletedVideoCounter,
   datas,
   sortedDatas,
   videoModal,
   reRender,
   currPage,
   totalPages,
   perPage,
   loadingVideoItems,
   searchValue,
   showLoadingSearchIcon,
   deletedVideoCounterAll,
};
