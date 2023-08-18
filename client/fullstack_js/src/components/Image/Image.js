import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import images from '~/assets/images';

import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = forwardRef(
   ({ src = images.defaultImage, className, alt = 'Mobile-Legends_image', ...props }, ref) => {
      const classes = cx('wrapper', className);

      return (
         <img
            className={classes}
            ref={ref}
            alt={alt}
            {...props}
            src={src}
            onError={(e) => (e.target.src = images.defaultImage)}
         />
      );
   },
);

Image.propTypes = {
   src: PropTypes.string,
   className: PropTypes.string,
   alt: PropTypes.string,
};

export default Image;
