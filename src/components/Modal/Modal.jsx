import styles from './Modal.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  render() {
    const { overlay, modal } = styles;
    const { src, alt } = this.props;

    return (
      <div className={overlay}>
        <div className={modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

export default Modal;
