import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';

import {
  setFilterId,
  setCurrentPage,
  setBackString,
  setSortType,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzasType, selectPizza } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination/Pagination';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sortType, filterId, currentPage, searchValue } = useSelector(selectFilter);

  const { pizzas, status } = useSelector(selectPizza);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeFilter = (id: number) => {
    dispatch(setFilterId(id));
  };
  const onChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };
  const [isLoading, setIsLoading] = useState(true);

  const loadingPizzas = async () => {
    setIsLoading(true);

    const category = filterId > 0 ? `category=${filterId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ category, search, currentPage, sortType }));
  };

  // если изменили параметры и был первый рендер, то в url ставим параметры из редакса и ставим метку, что компонент единожды был вмонтирован
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

  // при первом рендере проверяем url-параметры и сохраняем их в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzasType;
      const sortType = sortList.find((sortListObj) => sortListObj === params.sortType);
      dispatch(
        setBackString({
          searchValue: params.search,
          filterId: Number(params.category),
          currentPage: params.currentPage,
          sortType: sortType || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // парсим параметры при первом рендере
  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!isSearch.current) {
    loadingPizzas();
    // }
    // isSearch.current = false;
  }, [filterId, sortType.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={filterId} onClickCategory={onChangeFilter} />
          <Sort value={sortType} onClickSort={(sort) => dispatch(setSortType(sort))} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте позже</p>
          </div>
        ) : (
          <div className="content__items">
            {status === 'loading'
              ? skeletons
              : pizzas.map((pizza) => {
                  return (
                      <PizzaBlock {...pizza} />
                  );
                })}
          </div>
        )}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
