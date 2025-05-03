import { useState, useCallback, useRef, useContext } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.sass';
import { SearchContext } from '../../App';

function Search() {
  const [searchValueLocal, setSearchValueLocal] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setSearchValueLocal('');
    inputRef.current.focus();
  };

  const onChangeInput = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 1000),
    [],
  );
  const onChangeInputLocal = (event) => {
    setSearchValueLocal(event.target.value);
    onChangeInput(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={searchValueLocal}
        onChange={onChangeInputLocal}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {searchValueLocal && (
        <svg
          className={styles.clearIcon}
          onClick={onClickClear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
}

export default Search;
