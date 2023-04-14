import './ProductPage.scss';
import { useParams } from "react-router-dom";
import products from '../../sources/assets/products.json';
import Header from '../components/header/Header';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';

const ProductPage = () => {
  const params = useParams();
  const productId = Number(params.id) ?? 0;
  const productData = products.find(product=>product.id === Number(productId));

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({id: productId}))
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
        <button className='product__add' onPointerDown={handleAddToCart}>Добавить в корзину</button>
      </article>
    </main>
  )
}

export default ProductPage;