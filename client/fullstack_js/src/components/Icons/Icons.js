import classNames from 'classnames';

const BackIcon = ({ className, onClick, ...props }) => (
   <i
      className={classNames('fa-regular fa-chevron-left', className)}
      {...props}
      onClick={onClick}
   ></i>
);

const NavBarToggleIcon = ({ className, onClick, ...props }) => (
   <i className={classNames('fa-solid fa-bars', className)} {...props} onClick={onClick}></i>
);

const TrashIcon = ({ className, onClick, ...props }) => (
   <i className={classNames('fa-solid fa-trash-xmark', className)} {...props} onClick={onClick}></i>
);

const DefaultSortIcon = ({ className, onClick, ...props }) => (
   <i
      style={{ display: 'block', color: 'blue', fontSize: '20px' }}
      className={classNames('fa-duotone fa-circle-sort', className)}
      {...props}
      onClick={onClick}
   ></i>
);

const AscSortIcon = ({ className, onClick, ...props }) => (
   <i
      style={{ display: 'block', color: 'blue', fontSize: '20px' }}
      className={classNames('fa-regular fa-arrow-down-short-wide', className)}
      {...props}
      onClick={onClick}
   ></i>
);

const DescSortIcon = ({ className, onClick, ...props }) => (
   <i
      style={{ display: 'block', color: 'blue', fontSize: '20px' }}
      className={classNames('fa-regular fa-arrow-up-short-wide', className)}
      {...props}
      onClick={onClick}
   ></i>
);

const SearchIcon = ({ className, onClick, ...props }) => (
   <i
      className={classNames('fa-regular fa-magnifying-glass', className)}
      {...props}
      onClick={onClick}
   ></i>
);

const LoadingSearchIcon = ({ className, onClick, ...props }) => (
   <i
      className={classNames('fa-duotone fa-spinner-third fa-spin', className)}
      {...props}
      onClick={onClick}
   ></i>
);

const BoostrapLoadingIcon = ({ className, onClick, ...props }) => (
   <div
      {...props}
      style={{ height: '50px', width: '50px', borderWidth: '6px' }}
      className={classNames('spinner-border text-primary', className)}
      role="status"
      onClick={onClick}
   >
      <span className="visually-hidden">Loading...</span>
   </div>
);

export {
   BackIcon,
   NavBarToggleIcon,
   TrashIcon,
   DefaultSortIcon,
   AscSortIcon,
   DescSortIcon,
   SearchIcon,
   LoadingSearchIcon,
   BoostrapLoadingIcon,
};
