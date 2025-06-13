import React, { useEffect, useRef, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSort, setSortType, SortObj } from '../../redux/slices/filterSlice';
import { BlackUpArrowIcon } from '../../assets/icons';

export const sortList: SortObj[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

interface SortProps {
  value: SortObj;
  onClickSort: (sort: SortObj) => void;
}

const Sort: React.FC<SortProps> = ({ value, onClickSort }) => {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickSelectedItem = (sortBy: SortObj) => {
    dispatch(setSortType(sortBy));
    setOpen(false);
  };

  useEffect(() => {
    const noSortClick = (event: Event) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
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
};
export default Sort;
