import PropTypes from 'prop-types';
import { Component } from 'react';

import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    console.log('this.props', this.props);
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <li className={css.galleryItem}>
          <img
            className={css.galleryItemImg}
            src={webformatURL}
            alt={tags}
            onClick={this.toogleModal}
          />
        </li>
        {showModal && (
          <Modal onClose={this.toogleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
