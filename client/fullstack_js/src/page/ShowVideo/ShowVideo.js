/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showVideoService } from '~/services';
import headerSlice from '~/layouts/components/Header/headerSlice';

import styles from './ShowVideo.module.scss';
import './ShowVideo.scss';

const cx = classNames.bind(styles);

function ShowVideo() {
   const dispatch = useDispatch();
   const [data, setData] = useState({});

   useEffect(() => {
      const path = window.location.pathname;
      const getData = async () => {
         const res = await showVideoService(path);
         setData(res);
      };
      getData();

      document.documentElement.scrollIntoView({ behavior: 'auto' });
      dispatch(headerSlice.actions.setShowBackBtn({ enable: true, to: '/' }));
   }, []);

   return (
      <div className={cx('show-video-wrapper')}>
         <div className="mt-4 grid">
            <div className="row">
               <div className="col-3">
                  <div
                     className="d-flex"
                     style={{
                        justifyContent: 'center',
                     }}
                  >
                     <button
                        className="btn btn-primary d-flex"
                        style={{
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}
                     >
                        <h4 style={{ paddingTop: '5px' }} className="d-block">
                           Đăng ký ngay!
                        </h4>
                     </button>
                  </div>
               </div>
               <div className="col-9">
                  <h2>{data.name}</h2>
                  <iframe
                     style={{
                        maxWidth: '700px',
                     }}
                     width="100%"
                     height="350px"
                     src={`https://www.youtube.com/embed/${data.videoId}`}
                     title="YouTube video player"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     allowFullScreen
                  ></iframe>
                  <p>{data.description}</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ShowVideo;
