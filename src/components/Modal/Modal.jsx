import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEscKeydown = e => {
      const KEY_CODE = 'Escape';

      if (e.key === KEY_CODE) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKeydown);
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
      document.documentElement.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
