import './ProductPage.scss';
import { useNavigate, useParams } from "react-router-dom";
import products from '../../sources/assets/products.json';
import Header from '../components/header/Header';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import { useState } from 'react';

const ProductPage = () => {
  const params = useParams();
  const productId = Number(params.id) ?? 0;
  const navigate = useNavigate();
  const productData = products.find(product=>product.id === Number(productId));
  const handleAddToCart = () => {
    dispatch(addToCart({id: productId}));
    setButton(<button className='product__add' onPointerDown={handleMoveToCart}>Перейти в корзину</button>)
  }
  const [button,setButton] = useState(<button className='product__add' onPointerDown={handleAddToCart}>Добавить в корзину</button>)

  const dispatch = useAppDispatch();

  const handleMoveToCart = ()=>{
    navigate('/cart');
  }

  return (
    <main className="product">
      <h1 className='product__title'>Карточка товара</h1>
      <Header />
      <BreadCrumbs links={[
          {link:'/',name:'Главная страница'},
          {link: '/',name:'Карточка товара',actual:true}
        ]}/>
      <article className='product__card'>
        <h2 className='product__subtitle'>{productData?.title}</h2>
        <div className="product__img">
          <img src={`../sources/assets${productData?.image}`} alt="изображение товара" />
        </div>
        <div className='product__price'>
          <span>Цена:</span>
          <span>&nbsp;</span>
          <span>{productData?.regular_price.value}</span>
          <span>&nbsp;</span>
          <span>{productData?.regular_price.currency}</span>
        </div>
        {button}
      </article>
    </main>
  )
}

export default ProductPage;