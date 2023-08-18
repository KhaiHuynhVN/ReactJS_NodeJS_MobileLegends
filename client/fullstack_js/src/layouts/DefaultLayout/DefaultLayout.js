import { Footer, Header } from '../components';
import style from './DefaultLayout.module.scss';

function DefaultLayout({ children }) {
   return (
      <div className={style.wrapper}>
         <Header />
         {children}
         <Footer />
      </div>
   );
}

export default DefaultLayout;
