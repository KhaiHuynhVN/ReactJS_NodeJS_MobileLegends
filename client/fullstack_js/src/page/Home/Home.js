/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
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

   useEffect(() => {
      const getData = async () => {
         const res = await allVideoService();
         dispatch(homeSlice.actions.setDatas(res));
      };
      getData();

      document.documentElement.scrollIntoView({ behavior: 'auto' });
      dispatch(showVideoSlice.actions.setShowBackBtn({ enable: false }));
   }, []);

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

   return (
      <>
         <div className={cx('home-wrapper', 'wrapper', 'grid mt-4')}>
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
         </div>
         <Image alt="logo-background" className={cx('logo-background')} src={images.background} />
      </>
   );
}

export default Home;
