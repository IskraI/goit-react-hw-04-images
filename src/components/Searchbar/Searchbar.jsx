import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputSubmit = event => setSearchQuery(event.target.value);

  const handleFormSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.searchForm__button}>
          <span className={css.searchForm__buttonLabel}>Search</span>
        </button>

        <input
          className={css.searchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputSubmit}
          value={searchQuery}
        />
      </form>
    </header>
  );
};
export default Searchbar;
