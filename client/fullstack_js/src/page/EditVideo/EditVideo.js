// import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import headerSlice from '~/layouts/components/Header/headerSlice';
import editVideoSlice from './editVideoSlice';
import * as selector from '~/store';
import { editVideoService, updateVideoService } from '~/services';
import configRoutes from '~/config';

// import styles from './EditVideo.module.scss';
import './EditVideo.scss';

// const cx = classNames.bind(styles);

function EditVideo() {
   const path = window.location.pathname;

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const nameValueEditVideo = useSelector(selector.nameValueEditVideo);
   const descriptionValueEditVideo = useSelector(selector.descriptionValueEditVideo);
   const videoIdValueEditVideo = useSelector(selector.videoIdValueEditVideo);
   const formDataEditVideo = useSelector(selector.formDataEditVideo);
   const meStoredVideosCurrPage = useSelector(selector.meStoredVideosCurrPage);

   useEffect(() => {
      const getData = async () => {
         const res = await editVideoService(path);
         dispatch(editVideoSlice.actions.setName(res.name));
         dispatch(editVideoSlice.actions.setDescription(res.description));
         dispatch(editVideoSlice.actions.setVideoId(res.videoId));
      };
      getData();

      document.documentElement.scrollIntoView({ behavior: 'auto' });
      dispatch(editVideoSlice.actions.resetFormData());
      dispatch(
         headerSlice.actions.setShowBackBtn({
            enable: true,
            to: `${configRoutes.meStoredVideo}?page=${meStoredVideosCurrPage}`,
         }),
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSubmitForm = async (e) => {
      e.preventDefault();
      const newPath = path.replace('edit', 'update');
      await updateVideoService(newPath, formDataEditVideo);
      navigate(`${configRoutes.meStoredVideo}?page=${meStoredVideosCurrPage}`);
   };

   const handleChangeFormData = (e, type) => {
      switch (type) {
         case 'name':
            dispatch(editVideoSlice.actions.setName(e.target.value));
            break;
         case 'description':
            dispatch(editVideoSlice.actions.setDescription(e.target.value));
            break;
         case 'videoId':
            dispatch(editVideoSlice.actions.setVideoId(e.target.value));
            break;
         default:
            throw new Error('Invalid type');
      }
   };

   return (
      <div className="edit-video-wrapper">
         <div className="mt-4 grid wide">
            <form onSubmit={handleSubmitForm}>
               <h1>Cập nhật video</h1>
               <div className="mb-3">
                  <label htmlFor="courseName" className="form-label">
                     Tiêu đề
                  </label>
                  <input
                     value={nameValueEditVideo}
                     name="name"
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
                     value={descriptionValueEditVideo}
                     name="description"
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
                     value={videoIdValueEditVideo}
                     name="videoId"
                     required
                     type="text"
                     className="form-control"
                     id="videoId"
                     onChange={(e) => handleChangeFormData(e, 'videoId')}
                  />
               </div>
               <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                     Lưu thay đổi
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default EditVideo;
