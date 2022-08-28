import styles from './Searchbar.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

class Searchbar extends React.Component {
  render() {
    const { onSubmit } = this.props;
    const { form, input, button, searchbar } = styles;
    return (
      <header className={searchbar}>
        <form className={form}>
          <button type="submit" className={button} onSubmit={onSubmit}>
            <span className="button-label">Search</span>
          </button>
          <input
            key={nanoid()}
            className={input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
