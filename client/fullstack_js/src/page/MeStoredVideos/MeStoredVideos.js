/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import headerSlice from '../../layouts/components/Header/headerSlice';
import meStoredVideosSlice from './meStoredVideosSlice';
import * as selector from '~/store';
import * as meTrashVideosSlice from '../MeTrashVideos/meTrashVideosSlice';
import configRoutes from '~/config';
import { Pagination } from '~/components';
import {
   deleteVideoService,
   meStoredVideosFormActionsService,
   meStoredVideosService,
} from '~/services';
import {
   AscSortIcon,
   BoostrapLoadingIcon,
   DefaultSortIcon,
   DescSortIcon,
   LoadingSearchIcon,
   SearchIcon,
   TrashIcon,
} from '~/components/Icons';

import styles from './MeStoredVideos.module.scss';
import './MeStoredVideos.scss';

const cx = classNames.bind(styles);

function MeStoredVideos() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [firstRender, setFirstRender] = useState(true);
   const [deletePending, setDeletePending] = useState(false);

   const selectValue = useSelector(selector.meStoredVideosSelectValue);
   const sortCol = useSelector(selector.sortCol);
   const sortValue = useSelector(selector.sortValue);
   const sortVideos = useSelector(selector.sortVideos);
   const checkbox = useSelector(selector.checkbox);
   const checkboxAll = useSelector(selector.checkboxAll);
   const disableExecBtn = useSelector(selector.disableExecBtn);
   const videoCounter = useSelector(selector.videoCounter);
   const videoCounterAll = useSelector(selector.videoCounterAll);
   const deletedVideoCounter = useSelector(selector.deletedVideoCounter);
   const videoDatas = useSelector(selector.meStoredVideoDatas);
   const videoSortedDatas = useSelector(selector.meStoredVideoSortedDatas);
   const deleteVideoModal = useSelector(selector.deleteVideoModal);
   const reRender = useSelector(selector.meStoredVideosReRender);
   const currPage = useSelector(selector.meStoredVideosCurrPage);
   const totalPages = useSelector(selector.meStoredVideosTotalPages);
   const perPage = useSelector(selector.meStoredVideosPerPages);
   const loadingVideoItems = useSelector(selector.loadingVideoItems);
   const searchValue = useSelector(selector.meStoredVideosSearchValue);
   const showLoadingSearchIcon = useSelector(selector.meStoredVideosShowLoadingSearchIcon);

   const meTrashVideosCurrPage = useSelector(meTrashVideosSlice.currPage);

   const deleteVideoModalRef = useRef();
   const closeBtnDeleteVideoModalRef = useRef();
   const tbodyRef = useRef();
   const debounceSearchValue = useRef();

   useEffect(() => {
      document.documentElement.scrollIntoView({ behavior: 'auto' });
      dispatch(headerSlice.actions.setShowBackBtn({ enable: true, to: '/' }));
      dispatch(meStoredVideosSlice.actions.setSelectValue(''));
   }, []);

   useEffect(() => {
      const getData = async () => {
         const res = await meStoredVideosService({ currPage, perPage, searchValue });

         dispatch(meStoredVideosSlice.actions.setDatas(res?.videos));
         // currPage will set in setVideoCounter action
         dispatch(meStoredVideosSlice.actions.setVideoCounter(res?.videoCounter));
         dispatch(meStoredVideosSlice.actions.setVideoCounterAll(res?.videoCounterAll));
         dispatch(meStoredVideosSlice.actions.setDeletedVideoCounter(res?.deletedVideoCounter));

         // Hide loading when loaded datas
         dispatch(meStoredVideosSlice.actions.setLoadingVideoItems(false));

         // Hide loading search icon when loaded datas
         dispatch(meStoredVideosSlice.actions.setShowLoadingSearchIcon(false));
      };
      getData();

      dispatch(meStoredVideosSlice.actions.resetCheckBox());
      dispatch(meStoredVideosSlice.actions.setLoadingVideoItems(true));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [reRender]);

   useEffect(() => {
      checkbox.length
         ? dispatch(meStoredVideosSlice.actions.setDisableExecBtn(false))
         : dispatch(meStoredVideosSlice.actions.setDisableExecBtn(true));
   }, [checkbox]);

   useEffect(() => {
      let urlCurrPage = Number(new URLSearchParams(window.location.search).get('page'));
      if (totalPages === 0) return;

      if (urlCurrPage > totalPages) {
         navigate(`${configRoutes.meStoredVideo}?page=${totalPages}`);
      } else if (urlCurrPage <= 0 || !urlCurrPage) {
         navigate(`${configRoutes.meStoredVideo}?page=${1}`);
      }
   }, [totalPages]);

   useEffect(() => {
      if (!videoDatas?.length) return;
      tbodyRef.current.style = '';
   }, [videoDatas]);

   useEffect(() => {
      if (searchValue === '' && firstRender) return;

      debounceSearchValue.current = setTimeout(() => {
         dispatch(meStoredVideosSlice.actions.setShowLoadingSearchIcon(true));
         dispatch(meStoredVideosSlice.actions.setRerender());
      }, 700);

      return () => {
         clearTimeout(debounceSearchValue.current);
      };
   }, [searchValue]);

   const handleChangeSelectAction = (e) => {
      dispatch(meStoredVideosSlice.actions.setSelectValue(e.target.value));
   };

   const handleSort = (e, sortVideos, type) => {
      const newSort =
         sortVideos.value === 'asc' ? 'default' : sortVideos.value === 'desc' ? 'asc' : 'desc';

      if (e.target.dataset.type === sortVideos.col) {
         dispatch(
            meStoredVideosSlice.actions.setSortVideos({
               ...sortVideos,
               value: newSort,
               type,
            }),
         );
      } else {
         dispatch(
            meStoredVideosSlice.actions.setSortVideos({
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
      const allId = videoDatas.map((data) => data._id);
      dispatch(
         meStoredVideosSlice.actions.setCheckBoxAll({ checked: !checkboxAll, allId: [...allId] }),
      );
   };

   const handleCheckBox = (id) => {
      dispatch(meStoredVideosSlice.actions.setCheckBox({ id, datasLength: videoDatas.length }));
   };

   const handleShowModal = (e, name, id) => {
      e.preventDefault();
      dispatch(
         meStoredVideosSlice.actions.setDeleteVideoModal({
            ...deleteVideoModal,
            enable: true,
            title: name,
            id,
         }),
      );
   };

   const handleDeleteVideo = async (e) => {
      e.preventDefault();

      if (deletePending) return;

      const newPath = `/videos/delete/${e.target.dataset.id}`;

      if (!deleteVideoModalRef.current.classList.contains('show')) return;

      setDeletePending(true);

      await deleteVideoService(newPath);

      // Hide delete video modal after re-render
      if (deleteVideoModalRef.current.classList.contains('show')) {
         closeBtnDeleteVideoModalRef.current.click();
      }

      setDeletePending(false);
      dispatch(meStoredVideosSlice.actions.setRerender());
   };

   const handleFormActions = async (e) => {
      e.preventDefault();

      if (deletePending) return;

      const path = '/videos/form-actions';

      setDeletePending(true);

      const res = await meStoredVideosFormActionsService(path, {
         action: selectValue,
         videoIds: checkbox,
      });

      res.error && console.error(res.error);

      setDeletePending(false);
      dispatch(meStoredVideosSlice.actions.setRerender());
      dispatch(meStoredVideosSlice.actions.setSelectValue(''));
   };

   const handleChangePage = useCallback((page) => {
      tbodyRef.current.style.height = tbodyRef.current.offsetHeight + 'px';

      dispatch(meStoredVideosSlice.actions.setCurrPage(page));
      dispatch(meStoredVideosSlice.actions.setRerender());
   }, []);

   const handleChangeSearchValue = (e) => {
      dispatch(meStoredVideosSlice.actions.setSearchValue(e.target.value));
      setFirstRender(false);
   };

   return (
      <>
         <form
            style={{ padding: '24px' }}
            className="mt-4 form-container"
            onSubmit={handleFormActions}
         >
            <h1 style={{ fontSize: '250%' }}>Video của tôi</h1>
            <Link
               to={`${configRoutes.meTrashVideo}?trash-videos-page=${meTrashVideosCurrPage}`}
               className="btn btn-primary btn-lg ms-1"
            >
               <div style={{ fontSize: '1.6rem' }} className="d-flex align-items-center">
                  Thùng rác
                  <TrashIcon className="ms-2 mx-2" />
                  <div
                     style={{
                        width: '20px',
                        height: '20px',
                        color: 'blue',
                        lineHeight: '20px',
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderRadius: '1000px',
                     }}
                  >
                     {deletedVideoCounter}
                  </div>
               </div>
            </Link>

            <h3 className="mt-1">Có {videoCounter} video</h3>

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
                  <option style={{ paddingRight: '10px' }} value="delete">
                     Xóa
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
                     <th scope="col">
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
                           Thời gian tạo &nbsp;
                           <i
                              style={{ display: 'block', color: 'blue', fontSize: '20px' }}
                              data-type="createdAt"
                              className={
                                 sortCol === 'createdAt' && sortValue === 'asc'
                                    ? 'fa-regular fa-arrow-down-short-wide'
                                    : sortCol === 'createdAt' && sortValue === 'desc'
                                    ? 'fa-regular fa-arrow-up-short-wide'
                                    : 'fa-duotone fa-circle-sort'
                              }
                              onClick={(e) => handleSort(e, sortVideos, 'time')}
                           ></i>
                        </div>
                     </th>
                     <th scope="col" style={{ minWidth: '144px' }}>
                        <div className={cx('d-flex align-items-center', 'table-title')}>
                           Cập nhật lúc &nbsp;
                           <i
                              style={{ display: 'block', color: 'blue', fontSize: '20px' }}
                              data-type="updatedAt"
                              className={
                                 sortCol === 'updatedAt' && sortValue === 'asc'
                                    ? 'fa-regular fa-arrow-down-short-wide'
                                    : sortCol === 'updatedAt' && sortValue === 'desc'
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
                     videoSortedDatas?.map((data, index) => (
                        <tr key={data._id}>
                           <td style={{ display: 'flex', justifyContent: 'center' }}>
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
                           <td style={{ minWidth: '111px' }}>{formatDate(data.createdAt)}</td>
                           <td style={{ minWidth: '111px' }}>{formatDate(data.updatedAt)}</td>
                           <td style={{ display: 'flex', flexDirection: 'column' }}>
                              <Link
                                 style={{
                                    fontSize: '1.6rem',
                                 }}
                                 to={`/videos/edit/${data._id}`}
                                 className="btn btn-dark btn-lg"
                              >
                                 Sửa
                              </Link>
                              <button
                                 style={{
                                    fontSize: '1.6rem',
                                 }}
                                 data-bs-toggle="modal"
                                 data-bs-target="#deleteModal"
                                 data-bs-whatever={`{"id": "${data._id}", "name": "${data.name}"}`}
                                 className="delete-btn btn btn-danger btn-lg mt-2"
                                 onClick={(e) => handleShowModal(e, data.name, data._id)}
                              >
                                 Xóa
                              </button>
                           </td>
                        </tr>
                     ))
                  )}

                  {!loadingVideoItems && !videoSortedDatas?.length && (
                     <tr>
                        <td colSpan="6">
                           <div
                              className="d-flex"
                              style={{ alignItems: 'center', justifyContent: 'center' }}
                           >
                              <h3 style={{ marginBottom: 'unset' }}>
                                 {videoCounterAll
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

         {videoSortedDatas?.length ? (
            <Pagination
               currentPage={currPage}
               totalPages={totalPages}
               onPageChange={handleChangePage}
               params="page"
            />
         ) : (
            ''
         )}

         <div
            ref={deleteVideoModalRef}
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            aria-hidden="true"
         >
            <div className="modal-dialog modal-dialog-centered">
               <form
                  data-id={deleteVideoModal.id}
                  className="modal-content"
                  onSubmit={handleDeleteVideo}
               >
                  <div className="modal-header">
                     <h1
                        style={{ fontSize: '2rem' }}
                        className="modal-title"
                        id="exampleModalLabel"
                     >
                        Bạn có chắc muốn xóa video "{deleteVideoModal.title}"
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
                     <button style={{ fontSize: '1.6rem' }} className="btn btn-lg btn-primary">
                        Xác nhận
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default MeStoredVideos;
