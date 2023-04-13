import ProductCard, { ProductCardPropsType } from '../components/product-card/ProductCard';
import './MainPage.scss';
import products from '../../sources/assets/products.json';

const props = {
    "type": "simple",
    "id": 9,
    "sku": "s9",
    "title": "Product 9",
    "regular_price": {
      "currency": "USD",
      "value": 53.40
    },
    "image": "/images/9.png",
    "brand": 2
  }

const MainPage = ()=> {
  const productsArray = products.map((product)=>{
    return <ProductCard key={product.id} {...product} />
  })

  return (
    <div className="App">
      <h1>Тестовое задание интернет магазин</h1>
      {productsArray}
    </div>
  )
}

export default MainPage;
