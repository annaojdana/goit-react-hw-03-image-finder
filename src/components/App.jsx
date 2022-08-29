import styles from './App.module.css';
import React, { Component } from 'react';
import getImages from 'services/getImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Button } from './Button/Button';

const INITIAL_STATE = {
  query: '',
  images: [],
  limitImages: 12,
  numberOfHits: 0,
  modal: false,
};
class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  onSubmit = e => {
    e.preventDefault();
    const { queryInput } = e.target.elements;
    const queryValue = queryInput.value;
    const initialImagesLimit = 12;
    const { limitImages } = this.state;
    getImages(queryValue, initialImagesLimit)
      .then(data => {
        data.totalHits === 0
          ? alert(
              'Sorry, there are no images matching your search query. Please try again.'
            )
          : alert(`Hooray! We found ${data.totalHits} images.`);
        return this.setState(oldState => ({
          ...oldState,
          images: data.hits,
          numberOfHits: data.totalHits,
          query: queryValue,
          limitImages:initialImagesLimit,
        }));
      })
      .catch(error => console.log(error));
  };

  handleModal = (urlLargeImage, altForLargeImage) => {
    console.log(`Url: ${urlLargeImage} alt: ${altForLargeImage} `);
  };

  loadMore = () => {
    const { limitImages, query } = this.state;
    return getImages(query, limitImages+12)
      .then(data => {
        return this.setState(oldState => ({
          ...oldState,
          images: data.hits,
          limitImages:limitImages+12,
        }));
      })
      .catch(error => console.log(error));
  };

  render() {
    const { container } = styles;
    const { images, numberOfHits } = this.state;
    console.log(this.state);
    return (
      <div className={container}>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && (
          <>
            <ImageGallery imagesData={images} openModal={this.handleModal} />
            {images.length < numberOfHits && <Button onClick={this.loadMore} />}
          </>
        )}
        {}
      </div>
    );
}
}

export default App;
