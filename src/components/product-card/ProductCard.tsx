import './ProductCard.scss';
import { Link } from "react-router-dom";

export type ProductCardPropsType = {
  type: string,
  id: number,
  sku: string,
  title: string,
  regular_price: {
    currency: string,
    value: number
  },
  image: string,
  brand: number
}

const ProductCard = (props:ProductCardPropsType) => {
  const {title,image,regular_price,id} = props;
  const {currency,value} = regular_price;

  return (
    <div className="product-card">
      <Link to={`/${id}`}>
        <h3 className='product-card__title'>{title}</h3>
          <div className="product-card__img">
            <img src={`../sources/assets${image}`} alt="изображение товара" />
          </div>
        <div className="product-card__price">
          <span>{value}</span>
          <span>&nbsp;</span>
          <span>{currency}</span>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard;