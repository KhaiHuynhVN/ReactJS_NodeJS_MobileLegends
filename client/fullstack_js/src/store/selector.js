import { createSelector } from '@reduxjs/toolkit';

import { sortLibrary } from '~/vendors';

// create video
const nameValue = (state) => state.createVideo.formData.name;
const descriptionValue = (state) => state.createVideo.formData.description;
const videoIdValue = (state) => state.createVideo.formData.videoId;
const formData = (state) => state.createVideo.formData;

// edit video
const nameValueEditVideo = (state) => state.editVideo.formData.name;
const descriptionValueEditVideo = (state) => state.editVideo.formData.description;
const videoIdValueEditVideo = (state) => state.editVideo.formData.videoId;
const formDataEditVideo = (state) => state.editVideo.formData;

// show video
const backBtn = (state) => state.header.backBtn;

// me stored videos
const meStoredVideosSelectValue = (state) => state.meStoredVideos.selectValue;
const sortCol = (state) => state.meStoredVideos.sortVideos.col;
const sortType = (state) => state.meStoredVideos.sortVideos.type;
const sortValue = (state) => state.meStoredVideos.sortVideos.value;
const sortVideos = (state) => state.meStoredVideos.sortVideos;
const checkbox = (state) => state.meStoredVideos.checkbox;
const checkboxAll = (state) => state.meStoredVideos.checkboxAll;
const disableExecBtn = (state) => state.meStoredVideos.disableExecBtn;
const videoCounter = (state) => state.meStoredVideos.videoCounter;
const videoCounterAll = (state) => state.meStoredVideos.videoCounterAll;
const deletedVideoCounter = (state) => state.meStoredVideos.deletedVideoCounter;
const meStoredVideoDatas = (state) => state.meStoredVideos.datas;
const deleteVideoModal = (state) => state.meStoredVideos.deleteVideoModal;
const meStoredVideosReRender = (state) => state.meStoredVideos.reRender;
const meStoredVideosCurrPage = (state) => state.meStoredVideos.currPage;
const meStoredVideosTotalPages = (state) => state.meStoredVideos.totalPages;
const meStoredVideosPerPages = (state) => state.meStoredVideos.perPage;
const loadingVideoItems = (state) => state.meStoredVideos.loadingVideoItems;
const meStoredVideosSearchValue = (state) => state.meStoredVideos.searchValue;
const meStoredVideosShowLoadingSearchIcon = (state) => state.meStoredVideos.showLoadingSearchIcon;
const meStoredVideoSortedDatas = createSelector(
   sortCol,
   sortType,
   sortValue,
   meStoredVideoDatas,
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
   nameValue,
   descriptionValue,
   videoIdValue,
   formData,
   backBtn,
   meStoredVideosSelectValue,
   sortCol,
   sortType,
   sortValue,
   sortVideos,
   checkbox,
   checkboxAll,
   disableExecBtn,
   nameValueEditVideo,
   descriptionValueEditVideo,
   videoIdValueEditVideo,
   formDataEditVideo,
   videoCounter,
   deletedVideoCounter,
   meStoredVideoDatas,
   meStoredVideoSortedDatas,
   deleteVideoModal,
   meStoredVideosReRender,
   meStoredVideosCurrPage,
   meStoredVideosTotalPages,
   meStoredVideosPerPages,
   loadingVideoItems,
   meStoredVideosSearchValue,
   meStoredVideosShowLoadingSearchIcon,
   videoCounterAll,
};
