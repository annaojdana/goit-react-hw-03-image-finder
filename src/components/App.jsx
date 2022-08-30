import styles from './App.module.css';
import React, { Component } from 'react';
import getImages from 'services/getImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const INITIAL_STATE = {
  query: '',
  images: [],
  limitImages: 12,
  numberOfHits: 0,
  showModal: false,
  isLoading: false,
  errorMessage: '',
  modalImageUrl: '',
  modalImageAlt: '',
};
class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  setErrorMessage = errorMessage =>
    this.setState(oldState => ({
      ...oldState,
      errorMessage: errorMessage,
    }));

  setIsLoading = isLoading =>
    this.setState(oldState => ({
      ...oldState,
      isLoading: isLoading,
    }));

  setInitialState = () =>
    this.setState(oldState => ({
      ...oldState,
      ...INITIAL_STATE,
    }));

  setShowModal = (showModal, modalImageUrl, modalImageAlt) =>
    this.setState(oldState => ({
      ...oldState,
      showModal: showModal,
      modalImageUrl: modalImageUrl,
      modalImageAlt: modalImageAlt,
    }));

  handleModalClose = () => this.setShowModal(false);

  handleShowModal = (urlLargeImage, altForLargeImage) =>
    this.setShowModal(true, urlLargeImage, altForLargeImage);

  
  onSubmit = e => {
    e.preventDefault();
    this.setInitialState();
    this.setIsLoading(true);
    const { queryInput } = e.target.elements;
    const queryValue = queryInput.value;
    const initialImagesLimit = 12;
    getImages(queryValue, initialImagesLimit)
      .then(data => {
        if (data.totalHits === 0) {
          this.setIsLoading(false);
          return this.setErrorMessage(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setErrorMessage('');
        this.setIsLoading(false);
        return this.setState(oldState => ({
          ...oldState,
          images: data.hits,
          numberOfHits: data.totalHits,
          query: queryValue,
          limitImages: initialImagesLimit,
        }));
      })
      .catch(error => {
        this.setIsLoading(false);
        console.log(error);
        this.setErrorMessage('Unable to fetch images');
      });
  };

  loadMore = () => {
    const { limitImages, query } = this.state;
    return getImages(query, limitImages + 12)
      .then(data => {
        return this.setState(oldState => ({
          ...oldState,
          images: data.hits,
          limitImages: limitImages + 12,
        }));
      })
      .catch(error => console.log(error));
  };

  render() {
    const { container, error } = styles;
    const {
      images,
      numberOfHits,
      isLoading,
      errorMessage,
      showModal,
      modalImageUrl,
      modalImageAlt,
    } = this.state;
    console.log(this.state);
    return (
      <div className={container}>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          images.length > 0 && (
            <>
              <ImageGallery
                imagesData={images}
                openModal={this.handleShowModal}
              />
              {images.length < numberOfHits && (
                <Button onClick={this.loadMore} />
              )}
            </>
          )
        )}
        {errorMessage && <div className={error}>{errorMessage}</div>}
        {showModal && (
          <Modal
            src={modalImageUrl}
            alt={modalImageAlt}
            closeModal={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}

export default App;
