import styles from './Searchbar.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import svg from '../../images/search.svg#search';

class Searchbar extends React.Component {
  render() {
    const { onChange, onSubmit } = this.props;
    const { form, input, button, icon } = styles;
    return (
      <form className={form} id="search-form">
        <input
          key={nanoid()}
          className={input}
          type="text"
          name="searchQuery"
          autoComplete="off"
          placeholder="Search images..."
          onChange={onChange}
        />
        <button type="submit" className={button} onSubmit={onSubmit}>
          <svg className={icon}>
            <use href={svg}></use>
          </svg>
        </button>
      </form>
    );
  }
}

export default Searchbar;
Searchbar.propTypes = {
  onChange: PropTypes.func,
};
