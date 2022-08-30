import styles from './App.module.css';
import React, { Component } from 'react';
import getImages from 'services/getImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';

const INITIAL_STATE = {
  query: '',
  images: [],
  limitImages: 12,
  numberOfHits: 0,
  openModal: false,
  isLoading: false,
  errorMessage: '',
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

  handleModal = (urlLargeImage, altForLargeImage) => {
    console.log(`Url: ${urlLargeImage} alt: ${altForLargeImage} `);
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
    const { images, numberOfHits, isLoading, errorMessage } = this.state;
    console.log(this.state);
    return (
      <div className={container}>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          images.length > 0 && (
            <>
              <ImageGallery imagesData={images} openModal={this.handleModal} />
              {images.length < numberOfHits && (
                <Button onClick={this.loadMore} />
              )}
            </>
          )
        )}
        {errorMessage && <div className={error}>{errorMessage}</div>}
        {}
      </div>
    );
  }
}

export default App;
