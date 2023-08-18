import { createSlice } from '@reduxjs/toolkit';

const editVideoSlice = createSlice({
   name: 'editVideo',
   initialState: {
      formData: {
         name: '',
         description: '',
         videoId: '',
      },
   },
   reducers: {
      setName(state, action) {
         state.formData.name = action.payload;
      },
      setDescription(state, action) {
         state.formData.description = action.payload;
      },
      setVideoId(state, action) {
         state.formData.videoId = action.payload;
      },
      resetFormData(state) {
         state.formData = {
            name: '',
            description: '',
            videoId: '',
         };
      },
   },
});

export default editVideoSlice;
