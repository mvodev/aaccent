import './BrandsFilterForm.scss';

export type Brand = {
  id:number,
  title:string,
  sort:string,
  code:string,
}  

export type FilterFormPropsType = {
  brands:Brand[],
  handleForm: (event:React.FormEvent<HTMLFormElement>)=>void
}  

const BrandsFilterForm = (props:FilterFormPropsType) => {
  const {brands,handleForm} = props;
  return (
    <form className="brand-filters" onSubmit={handleForm}>
      <h3 className='brand-filters'>Бренды</h3>
      <div className="brand-filters__inputs">
        {brands.map((brand) => {
          return (
            <div key={brand.id} className='brand-filters__input'>
              <input name={`${brand.id}`} type="checkbox" id={`${brand.id}`}/>
              <label htmlFor={`${brand.id}`}>{brand.title}</label>
            </div>
          )
        })}
      </div>
      <button className='brand-filters__submit' type='submit'>Применить</button>
      <button className='brand-filters__reset'>Сбросить</button>
    </form>
  )
}

export default BrandsFilterForm;