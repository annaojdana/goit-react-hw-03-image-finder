import React, { Component } from 'react';
import getImages from 'services/getImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    filter: '',
    images: [],
  };

  onSubmit = e => {
    e.preventDefault();

    const { queryInput } = e.target.elements;
    const query = queryInput.value;
    console.log(query);
    const limit = 12;

    getImages(query, limit)
      .then(data => {
        data.totalHits === 0
          ? alert(
              'Sorry, there are no images matching your search query. Please try again.'
            )
          : alert(`Hooray! We found ${data.totalHits} images.`);
       return this.setState(oldState => ({ ...oldState, images: data.hits }));

      })
      .catch(error => console.log(error));
  };

  // handleFilter = e => {
  //   this.setState({ filter: e.target.value });
  // };

  // removeContact = id => {
  //   const newContactList = this.state.contacts.filter(
  //     contact => contact.id !== id
  //   );
  //   this.setState({ ...this.state, contacts: newContactList });
  // };

  // setFilterContacts = (filterValue, contactsArray) => {
  //   if (!filterValue) {
  //     return contactsArray;
  //   } else {
  //     return contactsArray.filter(contact => {
  //       return contact.name
  //         .toLocaleLowerCase()
  //         .includes(filterValue.toLocaleLowerCase());
  //     });
  //   }
  // };

  render() {
    const { images } = this.state;
    console.log(this.state);
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery imagesData={images} />
      </>
    );
  }
}

export default App;
