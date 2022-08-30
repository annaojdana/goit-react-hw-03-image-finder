import styles from './ImageGalleryItem.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {

  render() {

    const { imageData, openModal } = this.props;
    const { item, image } = styles;
    const { webformatURL, tags, largeImageURL } = imageData;

    return (
      <li className={item}>
        <img
          className={image}
          src={webformatURL}
          alt={tags}
          onClick={() => openModal(largeImageURL, tags)}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageData: PropTypes.object,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;