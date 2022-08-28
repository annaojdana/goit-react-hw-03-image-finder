import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ type,title, onClick, style }) => {
  const { primary } = styles;

  return (
    <button className={`${style} ${primary}`} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.string
};
