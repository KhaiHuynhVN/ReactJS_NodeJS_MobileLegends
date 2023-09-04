import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import * as selector from '~/store';
import configRoutes from '~/config';
import { Image } from '~/components';
import { BackIcon, NavBarToggleIcon } from '~/components/Icons';

import { images } from '~/assets';
import styles from './Header.module.scss';
import './Header.scss';

const cx = classNames.bind(styles);

function Header() {
   const navigate = useNavigate();

   const backBtn = useSelector(selector.backBtn);
   const meStoredVideosCurrPage = useSelector(selector.meStoredVideosCurrPage);

   return (
      <div className="header-wrapper psn-sticky">
         <nav className="navbar navbar-expand-lg">
            <div className={cx('navbar-container', 'grid')}>
               <Link className="navbar-brand" to="/">
                  <Image alt="logo" className={cx('logo')} src={images.logo} />
               </Link>
               {backBtn.enable && (
                  <Link
                     to={backBtn.to}
                     style={{
                        padding: '6px 6px 4px 4px',
                        fontSize: '1.5rem',
                     }}
                     className="btn btn-primary"
                  >
                     <BackIcon className="mx-2" />
                     Trở về
                  </Link>
               )}

               <button
                  className="navbar-toggler ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <NavBarToggleIcon />
               </button>

               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                     <li className="nav-item dropdown">
                        <div
                           className="nav-link dropdown-toggle"
                           to=""
                           role="button"
                           data-bs-toggle="dropdown"
                           aria-expanded="false"
                        >
                           <Image
                              src={images.avatar}
                              alt=""
                              className={cx('user-avatar')}
                           />
                           DemonVN
                        </div>
                        <ul className="dropdown-menu">
                           <li>
                              <Link
                                 className="dropdown-item"
                                 to={configRoutes.createVideo}
                                 onClick={() => navigate('/')}
                              >
                                 Đăng video
                              </Link>
                           </li>
                           <li>
                              <hr className="dropdown-divider" />
                           </li>
                           <li>
                              <Link
                                 className="dropdown-item"
                                 to={`${configRoutes.meStoredVideo}?page=${meStoredVideosCurrPage}`}
                                 onClick={() => navigate('/')}
                              >
                                 Video của tôi
                              </Link>
                           </li>
                        </ul>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </div>
   );
}

export default Header;
