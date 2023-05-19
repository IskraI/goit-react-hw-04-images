import PropTypes from 'prop-types';
import css from './Button.module.css';
const Button = ({ onClick, looktext }) => {
  return (
    <button type="button" onClick={onClick} className={css.button__load}>
      {looktext ? 'Loading...' : 'Load more'}
    </button>
  );
};
export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  looktext: PropTypes.bool.isRequired,
};
