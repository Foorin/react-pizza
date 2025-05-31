import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PizzaPage() {
  const navigate = useNavigate();

  const [pizza, setPizza] = useState();
  const { pizzaId } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://67e5ce1418194932a5874a0d.mockapi.io/pizzasItems/${pizzaId}`,
        );
        setPizza(data);
      } catch (error) {
        alert('ошибка при получении пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, [pizzaId]);

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }
  return (
    <div className="container">
      <img className="pizza-block__image" src={pizza.imageURL} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}

export default PizzaPage;
