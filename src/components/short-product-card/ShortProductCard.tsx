import './ShortProductCard.scss';
import products from '../../../sources/assets/products.json';
import CounterDelete from '../counter-delete/CounterDelete';

export type ShortCardPropsType = {
  id:number,
  counterOfProducts: number,
  handleDeleteButtonClick:(counter:number,id:number)=>void,
  handleCounterChange:(counter:number,id:number)=>void,
}

const ShortProductCard = (props:ShortCardPropsType) => {
  const { id, counterOfProducts,handleCounterChange,handleDeleteButtonClick } = props;
  const product = products.find(product=>product.id===id);
  return (
    <article className='short-card'>
      <h3>{product?.title}</h3>
      <CounterDelete 
        initialCounter={counterOfProducts}
        pricePerUnit={product?.regular_price.value ?? 0}
        handleDeleteButtonClick={handleDeleteButtonClick}
        handleCounterChange = {handleCounterChange}
        id={id}
      />
    </article>
  )
}

export default ShortProductCard;