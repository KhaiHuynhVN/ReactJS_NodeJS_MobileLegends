// import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { createVideoService } from '~/services';
import * as selector from '~/store';
import createVideoSlice from './createVideoSlice';
import headerSlice from '../../layouts/components/Header/headerSlice';
import configRoutes from '~/config';

// import styles from './CreateVideo.module.scss';
import './CreateVideo.scss';

// const cx = classNames.bind(styles);

function CreateVideo() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const nameValue = useSelector(selector.nameValue);
   const descriptionValue = useSelector(selector.descriptionValue);
   const videoIdValue = useSelector(selector.videoIdValue);
   const formData = useSelector(selector.formData);
   const meStoredVideosCurrPage = useSelector(selector.meStoredVideosCurrPage);

   useEffect(() => {
      document.documentElement.scrollIntoView({ behavior: 'auto' });
      dispatch(createVideoSlice.actions.resetFormData());
      dispatch(headerSlice.actions.setShowBackBtn({ enable: true, to: '/' }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSubmitForm = async (e) => {
      e.preventDefault();
      await createVideoService(formData);
      navigate(`${configRoutes.meStoredVideo}?page=${meStoredVideosCurrPage}`);
   };

   const handleChangeFormData = (e, type) => {
      switch (type) {
         case 'name':
            dispatch(createVideoSlice.actions.setName(e.target.value));
            break;
         case 'description':
            dispatch(createVideoSlice.actions.setDescription(e.target.value));
            break;
         case 'videoId':
            dispatch(createVideoSlice.actions.setVideoId(e.target.value));
            break;
         default:
            throw new Error('Invalid type');
      }
   };

   return (
      <div className="create-video-wrapper">
         <div className="mt-4 grid wide">
            <form onSubmit={handleSubmitForm}>
               <h1>Đăng video</h1>
               <div className="mb-3">
                  <label htmlFor="courseName" className="form-label">
                     Tiêu đề
                  </label>
                  <input
                     value={nameValue}
                     required
                     type="text"
                     className="form-control"
                     id="courseName"
                     placeholder="Thêm tiêu đề video..."
                     onChange={(e) => handleChangeFormData(e, 'name')}
                  />
               </div>
               <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                     Mô tả
                  </label>
                  <textarea
                     value={descriptionValue}
                     required
                     className="form-control"
                     id="description"
                     placeholder="Thêm mô tả..."
                     rows="8"
                     onChange={(e) => handleChangeFormData(e, 'description')}
                  ></textarea>
               </div>
               <div className="mb-3">
                  <label htmlFor="videoId" className="form-label">
                     Video ID
                  </label>
                  <input
                     value={videoIdValue}
                     required
                     type="text"
                     className="form-control"
                     id="videoId"
                     onChange={(e) => handleChangeFormData(e, 'videoId')}
                  />
               </div>
               <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                     Đăng video
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateVideo;
