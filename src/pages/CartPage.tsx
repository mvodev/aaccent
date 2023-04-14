import { useEffect, useState } from 'react';
import { addToCart, removeFromCart, selectCart } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import products from '../../sources/assets/products.json';
import './CartPage.scss';
import ShortProductCard from '../components/short-product-card/ShortProductCard';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';

const CartPage = () => {
  const dispatch = useAppDispatch();
  let productsMap:Map<number,number> = new Map();
  const cart = useAppSelector(selectCart);
  const [productsCounters,setProductsCounters] = useState<JSX.Element[]>();
  const [total,setTotal] = useState(0);

  const handlePay = () => {

  }

  const handleDeleteProduct = (counter:number,id:number) => {
    for (let i=0;i<counter;i++) {
      dispatch(removeFromCart({id}));
    }
  }

  const handleCounterChange = (counter:number,id:number) =>{
    const oldPNumberProductsInCart = productsMap.get(id);
    if (oldPNumberProductsInCart && oldPNumberProductsInCart < counter) {
      dispatch(addToCart({id}));
    } else if (oldPNumberProductsInCart && oldPNumberProductsInCart > counter) {
      dispatch(removeFromCart({id}));
    }
  }

  useEffect(()=>{
    let currentTotalPrice = 0;
    productsMap = new Map();
    cart.forEach(id => {
      if (productsMap.has(id)) {
        const oldNumberOfProduct = productsMap.get(id);
        if (oldNumberOfProduct !== undefined) productsMap.set(id, oldNumberOfProduct + 1);
      } else productsMap.set(id, 1);
    })

    let productsArray = [];
    for (let productNumber of productsMap){
      console.log(productNumber)
      const id = productNumber[0];
      const quantity = productNumber[1];
      const fullDescription = products.find(data=>data.id === id);
      const price = fullDescription?.regular_price.value ?? 0;
      currentTotalPrice += price * quantity;
      if (fullDescription) productsArray.push(
      <ShortProductCard 
        handleDeleteButtonClick={handleDeleteProduct}
        handleCounterChange={handleCounterChange}
        counterOfProducts={quantity} 
        key={id}
        id={id} />
      )
    }
    setProductsCounters(productsArray);
    setTotal(+currentTotalPrice.toFixed(2));
  },[cart]);

  return (
    <main className='cart-page'>
      <h1 className='cart-page__title'>Корзина</h1>
      <BreadCrumbs links={[
          {link:'/',name:'Главная страница'},
          {link: '/',name:'Корзина',actual:true}
        ]}/>
      {productsCounters}
      <span className='cart-page__total'>Итого: {total}</span>
      <button 
        className='cart-page__pay'
        onPointerDown={handlePay}  
      >Оформить</button>
    </main>
  )
}

export default CartPage;