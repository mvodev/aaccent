import './ProductPage.scss';
import { useParams } from "react-router-dom";
import products from '../../sources/assets/products.json';
import Header from '../components/header/Header';

const ProductPage = () => {
  const params = useParams();
  const productId = params.id ?? 0;
  const productData = products.find(product=>product.id === Number(productId));
  console.log(productData)
  return (
    <main className="product">
      <h1 className='product__title'>Карточка товара</h1>
      <Header />
      <article className='product__card'>
        <h2 className='product__subtitle'>{productData?.title}</h2>
        <div className="product__img">
          <img src={`../sources/assets${productData?.image}`} alt="изображение товара" />
        </div>
        <div className='product__price'>
          <span>{productData?.regular_price.value}</span>
          <span>&nbsp;</span>
          <span>{productData?.regular_price.currency}</span>
        </div>
      </article>
    </main>
  )
}

export default ProductPage;