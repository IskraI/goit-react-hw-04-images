import PropTypes from 'prop-types';
import React, { useState } from 'react';

import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setshowModal] = useState(false);

  const toogleModal = () => {
    setshowModal(prev => !prev);
  };

  return (
    <>
      <li className={css.galleryItem}>
        <img
          className={css.galleryItemImg}
          src={webformatURL}
          alt={tags}
          onClick={toogleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={toogleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
