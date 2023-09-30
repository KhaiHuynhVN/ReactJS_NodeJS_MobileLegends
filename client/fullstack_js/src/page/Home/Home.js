/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { allVideoService } from '~/services';
import showVideoSlice from '../../layouts/components/Header/headerSlice';
import { Image } from '~/components';
import homeSlice from './homeSlice';
import * as selector from './homeSlice';

import { images } from '~/assets';
import styles from './Home.module.scss';
import './Home.scss';

const cx = classNames.bind(styles);

function Home() {
   const dispatch = useDispatch();

   const datas = useSelector(selector.datas);
   const hasMore = useSelector(selector.hasMore);
   const startIndex = useSelector(selector.startIndex);
   const perPage = useSelector(selector.perPage);
   const datasPending = useSelector(selector.datasPending);
   const loadingMore = useSelector(selector.loadingMore);

   const wrapperRef = useRef();

   let lastScrollTop = 0;

   useEffect(() => {
      const getData = async () => {
         const res = await allVideoService(0, perPage);
         dispatch(homeSlice.actions.setDatas(res));
         dispatch(homeSlice.actions.setStartIndex(res.length));
      };
      getData();

      window.document.documentElement.scrollIntoView({ behavior: 'auto' });
      dispatch(showVideoSlice.actions.setShowBackBtn({ enable: false }));
   }, []);

   useEffect(() => {
      window.document.addEventListener('scroll', handleLoadMore);

      return () => {
         window.document.removeEventListener('scroll', handleLoadMore);
      };
   });

   const emptyEls = () => {
      const quantity = 12;
      const arr = [];

      for (let i = 0; i < quantity; i++) arr.push(i);
      return arr.map((item, index) => (
         <div key={index} className={cx('col d-flex', 'pointer-none')}>
            <div className="card">
               <a href="/" className={cx('img-link', 'd-flex justify-content-center')}>
                  <Image />
               </a>
               <div className="card-body d-flex flex-column">
                  <a href="/">
                     <h5 className={cx('card-title text-center', 'fill-bg-color')}>123</h5>
                  </a>
                  <p className={cx('card-body-description', 'clamp-text clpt-2', 'fill-bg-color')}>
                     123
                  </p>
                  <a href="/" className={cx('btn btn-primary mt-auto', 'fill-bg-color')}>
                     Xem ngay
                  </a>
               </div>
            </div>
         </div>
      ));
   };

   const handleLoadMore = async () => {
      const endPoint = wrapperRef.current.offsetTop + wrapperRef.current.offsetHeight;
      const startPoint = document.documentElement.scrollTop + window.innerHeight;

      const condition = startPoint - 100 > endPoint;

      let st = window.scrollY || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
         if (condition) {
            if (datasPending || !hasMore) return;

            dispatch(homeSlice.actions.setLoadingMore(true));
            dispatch(homeSlice.actions.setDatasPending(true));
            const res = await allVideoService(startIndex, perPage);

            if (res.length) {
               dispatch(homeSlice.actions.setDatas([...datas, ...res]));
               dispatch(homeSlice.actions.setStartIndex(datas.length + res.length));
            } else {
               dispatch(homeSlice.actions.setHasMore(false));
            }
            dispatch(homeSlice.actions.setDatasPending(false));
            dispatch(homeSlice.actions.setLoadingMore(false));
         }
      } else if (st < lastScrollTop) {
         if (!condition) {
            dispatch(homeSlice.actions.setHasMore(true));
         }
      }
      lastScrollTop = st;
   };

   return (
      <>
         <div ref={wrapperRef} className={cx('home-wrapper', 'wrapper', 'grid mt-4')}>
            <h1
               style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '6rem',
                  color: '#b39700',
               }}
               className="mb-4"
            >
               Nguồn: Tốp Mỡ
            </h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">
               {datas?.map((data) => (
                  <div key={data._id} className="col d-flex">
                     <div className="card">
                        <Link
                           className={cx('img-link', 'd-flex justify-content-center')}
                           to={`/videos/${data.slug}`}
                        >
                           <Image src={data.img} alt={data.name} />
                        </Link>
                        <div className="card-body d-flex flex-column">
                           <Link to={`/videos/${data.slug}`}>
                              <h5 className="card-title text-center">{data.name}</h5>
                           </Link>
                           <p className={cx('card-body-description', 'clamp-text clpt-2')}>
                              {data.description}
                           </p>
                           <Link to={`/videos/${data.slug}`} className="btn btn-primary mt-auto">
                              Xem ngay
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
               {!datas?.length && emptyEls()}
            </div>
            {loadingMore && (
               <div className={cx('spiner-container')}>
                  <div
                     style={{ animationDelay: '0.1s' }}
                     className="spinner-grow text-primary"
                     role="status"
                  >
                     <span className="visually-hidden">Loading...</span>
                  </div>
                  <div
                     style={{ animationDelay: '0.2s' }}
                     className="spinner-grow text-secondary"
                     role="status"
                  >
                     <span className="visually-hidden">Loading...</span>
                  </div>
                  <div
                     style={{ animationDelay: '0.3s' }}
                     className="spinner-grow text-success"
                     role="status"
                  >
                     <span className="visually-hidden">Loading...</span>
                  </div>
                  <div
                     style={{ animationDelay: '0.4s' }}
                     className="spinner-grow text-danger"
                     role="status"
                  >
                     <span className="visually-hidden">Loading...</span>
                  </div>
                  <div
                     style={{ animationDelay: '0.5s' }}
                     className="spinner-grow text-warning"
                     role="status"
                  >
                     <span className="visually-hidden">Loading...</span>
                  </div>
                  <div
                     style={{ animationDelay: '0.6s' }}
                     className="spinner-grow text-info"
                     role="status"
                  >
                     <span className="visually-hidden">Loading...</span>
                  </div>
               </div>
            )}
         </div>
         <Image alt="logo-background" className={cx('logo-background')} src={images.background} />
      </>
   );
}

export default Home;
