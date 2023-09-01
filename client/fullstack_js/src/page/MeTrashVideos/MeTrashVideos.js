/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import headerSlice from '../../layouts/components/Header/headerSlice';
import meTrashVideosSlice from './meTrashVideosSlice';
import * as selector from './meTrashVideosSlice';
import * as MeStoredVideosSelector from '~/store';
import configRoutes from '~/config';
import { Pagination } from '~/components';
import {
   meTrashVideosFormActionsService,
   meTrashVideosService,
   permanentlyDestroyVideoService,
   restoreVideoService,
} from '~/services';
import {
   AscSortIcon,
   BackIcon,
   BoostrapLoadingIcon,
   DefaultSortIcon,
   DescSortIcon,
   LoadingSearchIcon,
   SearchIcon,
} from '~/components/Icons';

import styles from './MeTrashVideos.module.scss';
import './MeTrashVideos.scss';

const cx = classNames.bind(styles);

function MeTrashVideos() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [firstRender, setFirstRender] = useState(true);
   const [videoModalPending, setVideoModalPending] = useState(false);

   const selectValue = useSelector(selector.selectValue);
   const sortCol = useSelector(selector.sortCol);
   const sortValue = useSelector(selector.sortValue);
   const sortVideos = useSelector(selector.sortVideos);
   const checkbox = useSelector(selector.checkbox);
   const checkboxAll = useSelector(selector.checkboxAll);
   const disableExecBtn = useSelector(selector.disableExecBtn);
   const deletedVideoCounterAll = useSelector(selector.deletedVideoCounterAll);
   const deletedVideoCounter = useSelector(selector.deletedVideoCounter);
   const datas = useSelector(selector.datas);
   const sortedDatas = useSelector(selector.sortedDatas);
   const videoModal = useSelector(selector.videoModal);
   const reRender = useSelector(selector.reRender);
   const currPage = useSelector(selector.currPage);
   const totalPages = useSelector(selector.totalPages);
   const perPage = useSelector(selector.perPage);
   const loadingVideoItems = useSelector(selector.loadingVideoItems);
   const searchValue = useSelector(selector.searchValue);
   const showLoadingSearchIcon = useSelector(selector.showLoadingSearchIcon);

   const meStoredVideosCurrPage = useSelector(MeStoredVideosSelector.meStoredVideosCurrPage);

   const videoModalRef = useRef();
   const closeBtnDeleteVideoModalRef = useRef();
   const tbodyRef = useRef();
   const debounceSearchValue = useRef();

   useEffect(() => {
      document.documentElement.scrollIntoView({ behavior: 'auto' });
      dispatch(
         headerSlice.actions.setShowBackBtn({
            enable: true,
            to: `${configRoutes.meStoredVideo}?page=${meStoredVideosCurrPage}`,
         }),
      );
      dispatch(meTrashVideosSlice.actions.setSelectValue(''));
   }, []);

   useEffect(() => {
      const getData = async () => {
         const res = await meTrashVideosService({ currPage, perPage, searchValue });

         dispatch(meTrashVideosSlice.actions.setDatas(res?.deletedVideos));
         // currPage will set in setVideoCounter action
         dispatch(meTrashVideosSlice.actions.setDeletedVideoCounter(res?.deletedVideoCounter));
         dispatch(
            meTrashVideosSlice.actions.setDeletedVideoCounterAll(res?.deletedVideoCounterAll),
         );

         // Hide loading when loaded datas
         dispatch(meTrashVideosSlice.actions.setLoadingVideoItems(false));

         // Hide loading search icon when loaded datas
         dispatch(meTrashVideosSlice.actions.setShowLoadingSearchIcon(false));
      };
      getData();

      dispatch(meTrashVideosSlice.actions.resetCheckBox());
      dispatch(meTrashVideosSlice.actions.setLoadingVideoItems(true));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [reRender]);

   useEffect(() => {
      checkbox.length
         ? dispatch(meTrashVideosSlice.actions.setDisableExecBtn(false))
         : dispatch(meTrashVideosSlice.actions.setDisableExecBtn(true));
   }, [checkbox]);

   useEffect(() => {
      let urlCurrPage = Number(
         new URLSearchParams(window.location.search).get('trash-videos-page'),
      );
      if (totalPages === 0) return;

      if (urlCurrPage > totalPages) {
         navigate(`${configRoutes.meTrashVideo}?trash-videos-page=${totalPages}`);
      } else if (urlCurrPage <= 0 || !urlCurrPage) {
         navigate(`${configRoutes.meTrashVideo}?trash-videos-page=${1}`);
      }
   }, [totalPages]);

   useEffect(() => {
      if (!datas?.length) return;
      tbodyRef.current.style = '';
   }, [datas]);

   useEffect(() => {
      if (searchValue === '' && firstRender) return;

      debounceSearchValue.current = setTimeout(() => {
         dispatch(meTrashVideosSlice.actions.setShowLoadingSearchIcon(true));
         dispatch(meTrashVideosSlice.actions.setRerender());
      }, 700);

      return () => {
         clearTimeout(debounceSearchValue.current);
      };
   }, [searchValue]);

   const handleChangeSelectAction = (e) => {
      dispatch(meTrashVideosSlice.actions.setSelectValue(e.target.value));
   };

   const handleSort = (e, sortVideos, type) => {
      const newSort =
         sortVideos.value === 'asc' ? 'default' : sortVideos.value === 'desc' ? 'asc' : 'desc';

      if (e.target.dataset.type === sortVideos.col) {
         dispatch(
            meTrashVideosSlice.actions.setSortVideos({
               ...sortVideos,
               value: newSort,
               type,
            }),
         );
      } else {
         dispatch(
            meTrashVideosSlice.actions.setSortVideos({
               ...sortVideos,
               col: e.target.dataset.type,
               value: 'desc',
               type,
            }),
         );
      }
   };

   const formatDate = (date) => {
      const oldDate = new Date(date);
      const formattedDate = `${oldDate.getDate()}/${
         oldDate.getMonth() + 1
      }/${oldDate.getFullYear()} (${oldDate.getHours()}:${oldDate.getMinutes()}:${oldDate.getSeconds()})`;
      return formattedDate;
   };

   const handleCheckBoxAll = () => {
      const allId = datas?.map((data) => data._id);
      dispatch(
         meTrashVideosSlice.actions.setCheckBoxAll({ checked: !checkboxAll, allId: [...allId] }),
      );
   };

   const handleCheckBox = (id) => {
      dispatch(meTrashVideosSlice.actions.setCheckBox({ id, datasLength: datas?.length }));
   };

   const handleShowModal = (e, name, id, type) => {
      e.preventDefault();

      dispatch(
         meTrashVideosSlice.actions.setVideoModal({
            ...videoModal,
            enable: true,
            title: name,
            id,
            type,
         }),
      );
   };

   const handleVideoModal = async (e, type) => {
      e.preventDefault();

      let newPath;

      if (type === 'restore') {
         newPath = `/videos/restore/${e.target.dataset.id}`;
      } else if (type === 'permanentlyDestroy') {
         newPath = `/videos/permanentlyDestroy/${e.target.dataset.id}`;
      }

      if (videoModalPending) return;
      if (!videoModalRef.current.classList.contains('show')) return;

      setVideoModalPending(true);

      if (type === 'restore') {
         await restoreVideoService(newPath);
      } else if (type === 'permanentlyDestroy') {
         await permanentlyDestroyVideoService(newPath);
      }

      // Hide delete video modal after re-render
      if (videoModalRef.current.classList.contains('show')) {
         closeBtnDeleteVideoModalRef.current.click();
      }

      setVideoModalPending(false);
      dispatch(meTrashVideosSlice.actions.setRerender());
   };

   const handleFormActions = async (e) => {
      e.preventDefault();

      if (videoModalPending) return;

      const path = '/videos/trash-form-actions';

      setVideoModalPending(true);

      const res = await meTrashVideosFormActionsService(path, {
         action: selectValue,
         videoIds: checkbox,
      });

      console.log(res);

      res.error && console.error(res.error);

      setVideoModalPending(false);
      dispatch(meTrashVideosSlice.actions.setRerender());
      dispatch(meTrashVideosSlice.actions.setSelectValue(''));
   };

   const handleChangePage = useCallback((page) => {
      tbodyRef.current.style.height = tbodyRef.current.offsetHeight + 'px';

      dispatch(meTrashVideosSlice.actions.setCurrPage(page));
      dispatch(meTrashVideosSlice.actions.setRerender());
   }, []);

   const handleChangeSearchValue = (e) => {
      dispatch(meTrashVideosSlice.actions.setSearchValue(e.target.value));
      setFirstRender(false);
   };

   return (
      <>
         <form
            style={{ padding: '24px' }}
            className="mt-4 form-container"
            onSubmit={handleFormActions}
         >
            <h1 style={{ fontSize: '250%' }}>Thùng rác</h1>
            <Link
               to={`${configRoutes.meStoredVideo}?page=${meStoredVideosCurrPage}`}
               className="btn btn-primary btn-lg ms-1"
            >
               <div style={{ fontSize: '1.6rem' }} className="d-flex align-items-center">
                  <BackIcon className="ms-0 mx-2" />
                  Trở về
               </div>
            </Link>

            <h3 className="mt-1">Có {deletedVideoCounter} video</h3>

            <div className="mt-4 d-flex ">
               <select
                  required
                  value={selectValue}
                  name="action"
                  id="select-action"
                  className="form-select form-select-lg"
                  style={{ width: '200px', cursor: 'pointer', fontSize: '1.6rem' }}
                  onChange={handleChangeSelectAction}
               >
                  <option value="">-- Chọn tác vụ --</option>
                  <option style={{ paddingRight: '10px' }} value="restore">
                     Khôi phục
                  </option>
                  <option style={{ paddingRight: '10px' }} value="permanentlyDestroy">
                     Xóa vĩnh viễn
                  </option>
               </select>

               <button
                  disabled={disableExecBtn}
                  style={{ fontSize: '1.6rem' }}
                  id="exec-btn"
                  className="btn btn-dark btn-lg flex-shrink-0 ms-3"
               >
                  Thực hiện
               </button>

               <div
                  style={{ flex: '1', maxWidth: '350px', display: 'flex', position: 'relative' }}
                  className="ms-3"
               >
                  <input
                     value={searchValue}
                     style={{
                        fontSize: '1.6rem',
                        paddingRight: '33px',
                     }}
                     type="text"
                     className="form-control"
                     placeholder="Tìm theo tên..."
                     onChange={handleChangeSearchValue}
                  />
                  <div className={cx('search-icon-wrapper')}>
                     {showLoadingSearchIcon ? <LoadingSearchIcon /> : <SearchIcon />}
                  </div>
               </div>
            </div>

            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">
                        <div
                           style={{ display: 'flex', justifyContent: 'center' }}
                           className="flex-shrink-0"
                        >
                           <input
                              checked={checkboxAll}
                              className="form-check-input"
                              style={{
                                 display: 'block',
                                 fontSize: '1.8rem',
                                 outline: '1px solid black',
                                 cursor: 'pointer',
                              }}
                              type="checkbox"
                              id="checkAll"
                              onChange={handleCheckBoxAll}
                           />
                        </div>
                     </th>
                     <th scope="col">#</th>
                     <th scope="col" style={{ minWidth: '112px' }}>
                        <div className={cx('d-flex align-items-center', 'table-title')}>
                           Tiêu đề &nbsp;
                           {sortCol === 'name' && sortValue === 'asc' ? (
                              <AscSortIcon
                                 data-type="name"
                                 onClick={(e) => handleSort(e, sortVideos, 'string')}
                              />
                           ) : sortCol === 'name' && sortValue === 'desc' ? (
                              <DescSortIcon
                                 data-type="name"
                                 onClick={(e) => handleSort(e, sortVideos, 'string')}
                              />
                           ) : (
                              <DefaultSortIcon
                                 data-type="name"
                                 onClick={(e) => handleSort(e, sortVideos, 'string')}
                              />
                           )}
                        </div>
                     </th>
                     <th style={{ minWidth: '81px' }} scope="col">
                        <div className={cx('d-flex align-items-center', 'table-title')}>
                           Mô tả &nbsp;
                           <i
                              style={{ display: 'block', color: 'blue', fontSize: '20px' }}
                              data-type="description"
                              className={
                                 sortCol === 'description' && sortValue === 'asc'
                                    ? 'fa-regular fa-arrow-down-short-wide'
                                    : sortCol === 'description' && sortValue === 'desc'
                                    ? 'fa-regular fa-arrow-up-short-wide'
                                    : 'fa-duotone fa-circle-sort'
                              }
                              onClick={(e) => handleSort(e, sortVideos, 'string')}
                           ></i>
                        </div>
                     </th>
                     <th scope="col" style={{ minWidth: '144px' }}>
                        <div className={cx('d-flex align-items-center', 'table-title')}>
                           Thời gian xóa &nbsp;
                           <i
                              style={{ display: 'block', color: 'blue', fontSize: '20px' }}
                              data-type="deletedAt"
                              className={
                                 sortCol === 'deletedAt' && sortValue === 'asc'
                                    ? 'fa-regular fa-arrow-down-short-wide'
                                    : sortCol === 'deletedAt' && sortValue === 'desc'
                                    ? 'fa-regular fa-arrow-up-short-wide'
                                    : 'fa-duotone fa-circle-sort'
                              }
                              onClick={(e) => handleSort(e, sortVideos, 'time')}
                           ></i>
                        </div>
                     </th>
                     <th scope="col"></th>
                  </tr>
               </thead>
               <tbody ref={tbodyRef} style={{ height: '435px' }}>
                  {loadingVideoItems ? (
                     <tr>
                        <td
                           style={{
                              height: tbodyRef.current.offsetHeight + 'px',
                           }}
                           colSpan="7"
                        >
                           <div
                              style={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 height: '100%',
                              }}
                           >
                              <BoostrapLoadingIcon />
                           </div>
                        </td>
                     </tr>
                  ) : (
                     sortedDatas?.map((data, index) => (
                        <tr key={data._id}>
                           <td>
                              <div
                                 style={{ display: 'flex', justifyContent: 'center' }}
                                 className="form-check flex-shrink-0"
                              >
                                 <input
                                    checked={checkbox.includes(data._id)}
                                    className="form-check-input"
                                    name="checkboxVideoIds[]"
                                    style={{
                                       display: 'block',
                                       outline: '1px solid black',
                                       cursor: 'pointer',
                                       fontSize: '1.8rem',
                                    }}
                                    type="checkbox"
                                    value="{{this._id}}"
                                    onChange={() => handleCheckBox(data._id)}
                                 />
                              </div>
                           </td>
                           <th scope="row">{index + 1}</th>
                           <td>{data.name}</td>
                           <td>{data.description}</td>
                           <td style={{ minWidth: '111px' }}>{formatDate(data.deletedAt)}</td>
                           <td
                              style={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'center',
                              }}
                           >
                              <button
                                 style={{
                                    fontSize: '1.6rem',
                                    minWidth: '140px',
                                 }}
                                 data-bs-toggle="modal"
                                 data-bs-target="#deleteModal"
                                 className="btn btn-dark btn-md"
                                 onClick={(e) => handleShowModal(e, data.name, data._id, 'restore')}
                              >
                                 Khôi phục
                              </button>
                              <button
                                 style={{
                                    fontSize: '1.6rem',
                                    minWidth: '140px',
                                 }}
                                 data-bs-toggle="modal"
                                 data-bs-target="#deleteModal"
                                 className="delete-btn btn btn-danger btn-md mt-2"
                                 onClick={(e) =>
                                    handleShowModal(e, data.name, data._id, 'permanentlyDestroy')
                                 }
                              >
                                 Xóa vĩnh viễn
                              </button>
                           </td>
                        </tr>
                     ))
                  )}

                  {!loadingVideoItems && !sortedDatas?.length && (
                     <tr>
                        <td colSpan="6">
                           <div
                              className="d-flex"
                              style={{ alignItems: 'center', justifyContent: 'center' }}
                           >
                              <h3 style={{ marginBottom: 'unset' }}>
                                 {deletedVideoCounterAll
                                    ? 'Không tìm thấy video :('
                                    : 'Chưa có video nào :('}
                              </h3>
                              <a
                                 style={{ fontSize: '1.6rem' }}
                                 href="/create-video"
                                 className="btn btn-dark btn-lg ms-1"
                              >
                                 Đăng video mới!
                              </a>
                           </div>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </form>

         {sortedDatas?.length ? (
            <Pagination
               currentPage={currPage}
               totalPages={totalPages}
               onPageChange={handleChangePage}
               params="trash-videos-page"
            />
         ) : (
            ''
         )}

         <div
            ref={videoModalRef}
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            aria-hidden="true"
         >
            <div className="modal-dialog modal-dialog-centered">
               <form
                  data-id={videoModal.id}
                  className="modal-content"
                  onSubmit={(e) => handleVideoModal(e, videoModal.type)}
               >
                  <div className="modal-header">
                     <h1
                        style={{ fontSize: '2rem' }}
                        className="modal-title"
                        id="exampleModalLabel"
                     >
                        Bạn có chắc muốn
                        {(videoModal.type === 'permanentlyDestroy' && ' xóa vĩnh viễn ') ||
                           (videoModal.type === 'restore' && ' khôi phục ')}
                        video "{videoModal.title}"
                     </h1>
                     <button
                        ref={closeBtnDeleteVideoModalRef}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     ></button>
                  </div>
                  <div className="modal-footer">
                     <button
                        style={{ fontSize: '1.6rem' }}
                        type="button"
                        className="btn btn-lg btn-secondary"
                        data-bs-dismiss="modal"
                     >
                        Hủy
                     </button>
                     <button
                        style={{
                           fontSize: '1.6rem',
                           color: videoModal.type === 'permanentlyDestroy' && 'white',
                           backgroundColor: videoModal.type === 'permanentlyDestroy' && 'red',
                           borderColor: videoModal.type === 'permanentlyDestroy' && 'red',
                        }}
                        className="btn btn-lg btn-primary"
                     >
                        {videoModal.type === 'permanentlyDestroy' ? 'Xóa vĩnh viễn' : 'Xác nhận'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default MeTrashVideos;
