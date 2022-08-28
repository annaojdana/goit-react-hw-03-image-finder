import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    filter: '',
  };

  // onSubmit = ({ name, number }) => {
  //   const { contacts } = this.state;
  //   const newContact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };

  //   if (contacts.some(contact => contact.name === name)) {
  //     alert(`${name} is already in contacts`);
  //     return;
  //   }
  //   if (contacts.some(contact => contact.number === number)) {
  //     const filteredNumber = contacts.filter(
  //       contact => contact.number === number
  //     )[0].name;
  //     console.log(filteredNumber);
  //     alert(`${number} is already in contact with ${filteredNumber} `);
  //     return;
  //   }
  //   this.setState(({ contacts }) => ({
  //     contacts: [newContact, ...contacts],
  //   }));
  // };

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
