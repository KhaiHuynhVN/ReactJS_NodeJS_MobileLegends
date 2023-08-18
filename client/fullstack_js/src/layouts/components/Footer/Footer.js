import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
   return (
      <footer className={cx('footer', 'footer-container', 'mt-4')}>
         <div className="grid">
            <div className="row all-no-stretch">
               <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <h3>About Us</h3>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu condimentum
                     ex, sit amet scelerisque massa.
                  </p>
               </div>
               <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <h3>Contact</h3>
                  <ul>
                     <li>Address: 123 Main Street, City, Country</li>
                     <li>Phone: +1234567890</li>
                     <li>Email: info@example.com</li>
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
