import React, { memo } from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryItem, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryItem}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
