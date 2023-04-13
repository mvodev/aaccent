import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductCard, { ProductCardPropsType } from '../components/product-card/ProductCard';
import './MainPage.scss';
import products from '../../sources/assets/products.json';

const MainPage = ()=> {
  const [ cards, setCards ] = useState<Array<ProductCardPropsType>>(products.sort(
    (a, b) => a.title > b.title ? 1 : -1));
  const PRODUCTS_PER_PAGE = 6;
  const [ itemOffset, setItemOffset ] = useState(0);
  const endOffset = itemOffset + PRODUCTS_PER_PAGE;
  const currentItems = cards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cards.length / PRODUCTS_PER_PAGE);

  const handlePaginationClick = (event:{selected:number}) => {
    const newOffset = (event.selected * PRODUCTS_PER_PAGE) % cards.length;
    setItemOffset(newOffset);
  };

  return (
    <main className="main-page">
      <h1>Тестовое задание интернет магазин</h1>
      {
        currentItems.map((product) => {
          return <ProductCard key={product.id} {...product} />
        })
      }
      <div className="main-page__pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePaginationClick}
          pageRangeDisplayed={PRODUCTS_PER_PAGE}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={() => null}
        />
      </div>
    </main>
  )
}

export default MainPage;
