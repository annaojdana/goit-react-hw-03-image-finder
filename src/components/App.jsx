import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    filter: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.value;
    limit = 40;
    gallery.innerHTML = '';

    getPhotos(query, limit)
      .then(data => {
        data.totalHits === 0
          ? Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            )
          : Notiflix.Notify.success(
              `Hooray! We found ${data.totalHits} images.`
            );

        renderPhotosInfo(data);
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
    // const { contacts, filter } = this.state;
    return (
      <>
        <Searchbar onChange={this.handleFilter} />
        <ImageGallery>

        </ImageGallery>
      </>
    );
  }
}

export default App;
