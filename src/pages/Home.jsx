import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import {
  setFilterId,
  setCurrentPage,
  setBackString,
  setSortType,
} from '../redux/slices/filterSlice';
import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sortType = useSelector((state) => state.filter.sortType);
  const filterId = useSelector((state) => state.filter.filterId);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeFilter = (id) => {
    dispatch(setFilterId(id));
  };
  const onChangePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = React.useContext(SearchContext);

  const fetchPizzas = () => {
    setIsLoading(true);
    const category = filterId > 0 ? `filter=${filterId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://67e5ce1418194932a5874a0d.mockapi.io/pizzasItems?page=${currentPage}&${category}${search}&sortBy=${sortType.sortProperty}&order=asc`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  // если изменили параметры и был первый рендер, то делаем эту проверку
  useEffect(() => {
    if (isMounted.current) {
      const stringToBack = qs.stringify({
        currentPage,
        filterId,
        sortProperty: sortType.sortProperty,
      });
      navigate(`?${stringToBack}`);
    }
    isMounted.current = true;
  }, [filterId, sortType.sortProperty, currentPage]);

  // если был первый рендер, то проверяем url-параметры и сохраняем их в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      const sortType = sortList.find((property) => property.sortProperty === params.sortProperty);
      dispatch(
        setBackString({
          ...params,
          sortType,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // если был первый рендер,то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [filterId, sortType.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={filterId} onClickCategory={(id) => onChangeFilter(id)} />
          <Sort value={sortType} onClickSort={(sort) => dispatch(setSortType(sort))} />
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
