import { CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";
import { addToCart, clearCart, removeFromCart, selectCart, sendCart } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import products from '../../sources/assets/products.json';
import './CartPage.scss';
import ShortProductCard from '../components/short-product-card/ShortProductCard';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import PayForm, { Inputs } from '../components/pay-form/PayForm';
import Modal from '../components/modal/Modal';

const CartPage = () => {
  const dispatch = useAppDispatch();
  let productsMap:Map<number,number> = new Map();
  const cart = useAppSelector(selectCart);
  const navigate = useNavigate();
  const {error,status} = useAppSelector(state=>state.cart);
  const [showModal,setShowModal] = useState(false);
  const [productsCounters,setProductsCounters] = useState<JSX.Element[]>();
  const [total,setTotal] = useState(0);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

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
  },[cart,status]);

  const handlePay = (data:Inputs) => {
    let dataToSend:{
      name:string,
      phone:string,
      cart:Array<{
        id:number,
        quantity:number
      }>
    } = {...data,cart:[]};
    if ( cart.length > 0 ) {
      for (let productNumber of productsMap){
      const id = productNumber[0];
      const quantity = productNumber[1];
      dataToSend.cart.push({
        id,quantity
      })
    }
      dispatch(sendCart(JSON.stringify(dataToSend)));
      setShowModal(true);
    }
  }

  const handleModal = () => {
    setShowModal(false);
    dispatch(clearCart());
    navigate('/');
  }


  return (
    <main className='cart-page'>
      <h1 className='cart-page__title'>Корзина</h1>
      <BreadCrumbs links={[
          {link:'/',name:'Главная страница'},
          {link: '/',name:'Корзина',actual:true}
        ]}/>
      {productsCounters}
      <span className='cart-page__total'>Итого: {total}</span>
      <PayForm onSubmit={handlePay}/>

      {
      status ==='loading' && 
      <FadeLoader
        color={'#aa1665'}
        loading={status ==='loading'}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      }

      {
        status === 'resolved' && showModal &&
        <Modal handleClose={handleModal} header='Спасибо за ваш заказ' body=''/>
      }

      {
        status==='rejected' && showModal &&
        <Modal handleClose={handleModal} header='Произошла ошибка' body={JSON.stringify(error)}/>
      }

    </main>
  )
}

export default CartPage;