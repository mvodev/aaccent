import './Cart.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectCart } from '../../store/cartSlice';
import products from '../../../sources/assets/products.json';

const Cart = () => {
  const [ goodsInCart, setGoodsInCart ] = useState(0);
  const [ total, setTotal ] = useState(0);
  const cartState = useAppSelector(selectCart);

  useEffect(() => {
    let counterOfGoods = 0;
    let totalCounter = 0;
    cartState.forEach((id) => {
      products.forEach((product)=>{
        if(product.id === id) {
          counterOfGoods+=1;
          totalCounter+=product.regular_price.value;
        }
      })
    })
    setGoodsInCart(counterOfGoods);
    setTotal(+totalCounter.toFixed(2));

  },[cartState])

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