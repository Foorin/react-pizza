import React from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const onClickCategory = (index) => {
    setActiveCategory(index);
  };
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li onClick={() => onClickCategory(index)} className={activeCategory === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
