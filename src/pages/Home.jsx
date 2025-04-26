import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setFilterId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

function Home() {
  const dispatch = useDispatch();

  const sortType = useSelector((state) => state.filter.sortType.sortProperty);
  const filterId = useSelector((state) => state.filter.filterId);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const onChangeFilter = (id) => {
    dispatch(setFilterId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = React.useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);
    const category = filterId > 0 ? `category=${filterId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://67e5ce1418194932a5874a0d.mockapi.io/pizzasItems?page=${currentPage}&${category}${search}&sortBy=${sortType}&order=asc`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [filterId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={filterId} onClickCategory={(id) => onChangeFilter(id)} />
          <Sort value={sortType} onClickSort={(id) => sortType(id)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading ? skeletons : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
