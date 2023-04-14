import './Cart.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [ goodsInCart, setGoodsInCart ] = useState(0);
  const [ total, setTotal ] = useState(0);

  return (
    <div className="cart">
      <Link to={'/cart'}>
        <div className="cart__img">
          <div className="cart__goods">
            {goodsInCart}
          </div>
        </div>
      </Link>
      {<Link to={'/cart'}>
        <div className="cart__total">
          <span className='cart__header'>Корзина</span>
          <span className='cart__price'>{total+' '}</span>
        </div>
      </Link>}
    </div>
  )
}

export default Cart;