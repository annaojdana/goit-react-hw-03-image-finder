import styles from './ImageGallery.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { wrapper } = styles;
    const { images } = this.props;
    return (
      <ul className={wrapper}>
        {images.map(({ url, alt }) => {
          <ImageGalleryItem src={url} alt={alt} />;
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {};

export default ImageGallery;
