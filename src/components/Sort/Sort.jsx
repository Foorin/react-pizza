import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSortType } from '../../redux/slices/filterSlice';
import { BlackUpArrowIcon } from '../../assets/icons';

export const sortList = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.filter.sortType);
  const sortRef = useRef();

  const [open, setOpen] = React.useState(false);

  const onClickSelectedItem = (obj) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  useEffect(() => {
    const noSortClick = (event) => {
      if (!sortRef.current.contains(event.target)) {
        // console.log('был клик не на сорт');
        setOpen(false);
      }
    };

    document.body.addEventListener('click', noSortClick);

    return () => document.body.removeEventListener('click', noSortClick);
  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <BlackUpArrowIcon />
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setOpen(!open);
          }}>
          {sortType.name}
        </span>
      </div>
      <div>
        {open && (
          <div className="sort__popup">
            <ul>
              {sortList.map((sortBy, index) => (
                <li
                  key={index}
                  onClick={() => onClickSelectedItem(sortBy)}
                  className={sortType.sortProperty === sortBy.sortProperty ? 'active' : ''}>
                  {sortBy.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default Sort;
