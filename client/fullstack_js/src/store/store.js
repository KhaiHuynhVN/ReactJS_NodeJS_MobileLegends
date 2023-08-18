import { configureStore } from '@reduxjs/toolkit';
import createVideoSlice from '~/page/CreateVideo/createVideoSlice';
import headerSlice from '~/layouts/components/Header/headerSlice';
import meStoredVideosSlice from '~/page/MeStoredVideos/meStoredVideosSlice';
import editVideoSlice from '~/page/EditVideo/editVideoSlice';
import meTrashVideosSlice from '~/page/MeTrashVideos/meTrashVideosSlice';
import homeSlice from '~/page/Home/homeSlice';

const store = configureStore({
   reducer: {
      createVideo: createVideoSlice.reducer,
      header: headerSlice.reducer,
      meStoredVideos: meStoredVideosSlice.reducer,
      editVideo: editVideoSlice.reducer,
      meTrashVideos: meTrashVideosSlice.reducer,
      home: homeSlice.reducer,
   },
});

export default store;
