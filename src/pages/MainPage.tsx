import { ChangeEvent, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductCard, { ProductCardPropsType } from '../components/product-card/ProductCard';
import './MainPage.scss';
import products from '../../sources/assets/products.json';
import brands from '../../sources/assets/brands.json';
import ProductCardsOrder from '../components/products-order/ProductCardsOrder';
import BrandsFilterForm from '../components/brands-filter-form/BrandsFilterForm';

const MainPage = ()=> {
  const [ cards, setCards ] = useState<Array<ProductCardPropsType>>(products.sort(
    (a, b) => a.title > b.title ? 1 : -1));
  
  const [ sortBy, setSortBy ] = useState<
    'nameIncrease'  |
    'nameDecrease'  |
    'priceIncrease' |
    'priceDecrease'
  >('nameIncrease');

  const [brandsFilters,setBrandsFilters] = useState<string[]>([]);

  const PRODUCTS_PER_PAGE = 6;
  const [ itemOffset, setItemOffset ] = useState(0);
  const endOffset = itemOffset + PRODUCTS_PER_PAGE;
  const currentItems = cards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cards.length / PRODUCTS_PER_PAGE);
  const handlePaginationClick = (event:{selected:number}) => {
    const newOffset = (event.selected * PRODUCTS_PER_PAGE) % cards.length;
    setItemOffset(newOffset);
  };

  const handleSort = (event:ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value as 'nameIncrease' | 'nameDecrease' | 'priceIncrease' | 'priceDecrease';
    setSortBy(sortBy);
  }

    useEffect(()=>{
    let copyOfProducts = [...products];
    if (brandsFilters.length > 0) {
      let tempFiltered:ProductCardPropsType[] = [];
      brandsFilters.forEach((brandId)=>{
        let copyOfProductsFiltered = copyOfProducts.filter(product=>product.brand===+brandId)
        tempFiltered.push(...copyOfProductsFiltered);
      })
      copyOfProducts = [...tempFiltered];
    }
    copyOfProducts = sortByParams(sortBy,copyOfProducts);
    setCards(copyOfProducts);
    
  },[sortBy,brandsFilters]);

  const sortByParams = (sortBy:'priceDecrease'|'priceIncrease'|'nameDecrease'|'nameIncrease', arrayToSort:Array<ProductCardPropsType>) => {
    const copyArray = [...arrayToSort];
    switch(sortBy) {
      case 'nameIncrease': 
        copyArray.sort(
          (a, b) => a.title > b.title ? 1 : -1);
        return copyArray;
      case 'nameDecrease': 
        copyArray.sort(
          (a, b) => a.title < b.title ? 1 : -1);
        return copyArray;
      case 'priceIncrease': 
        copyArray.sort(
          (a, b) => (a.regular_price.value) > (b.regular_price.value) ? 1 : -1);
        return copyArray;
      case 'priceDecrease': 
        copyArray.sort(
          (a, b) => (a.regular_price.value) < (b.regular_price.value) ? 1 : -1);
        return copyArray;
  }}

  const handleBrandsForm = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let brands = [];
    for(const pair of data.entries()) {
      brands.push(pair[0]);
    }
    setBrandsFilters(brands);
  }

  const handleResetForm = () => {
    setBrandsFilters([]);
  }

  return (
    <main className="main-page">
      <h1 className='main-page__title'>Тестовое задание интернет магазин</h1>
      <div className="main-page__products-order">
        <span>Сортировка:</span>
        <ProductCardsOrder onChange={handleSort}/>
      </div>
      <div className="main-page__wrapper">
        <aside className='main-page__filters'>
          <BrandsFilterForm 
            brands={brands} 
            handleForm={handleBrandsForm} 
            handleResetForm={handleResetForm}
          />
        </aside>
        <div className="main-page__products-wrapper">
        {
          currentItems.map((product) => {
            return <ProductCard key={product.id} {...product} />
          })
        }
        </div>
      </div>
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
