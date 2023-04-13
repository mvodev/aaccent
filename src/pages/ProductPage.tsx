import './ProductPage.scss';
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  console.log(params.id);
  return <h1>ProductPage</h1>
}

export default ProductPage;