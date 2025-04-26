import { useState, useCallback, useRef, useContext } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.sass';
import { SearchContext } from '../../App';
import { GreyCloseIcon } from '../../constants/icons';

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
        <GreyCloseIcon
          className={styles.clearIcon}
          onClick={() => {
            onClickClear();
          }}
        />
      )}
    </div>
  );
}

export default Search;
