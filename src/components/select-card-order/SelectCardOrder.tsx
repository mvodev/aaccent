import './SelectCardOrder.scss';

const options = [
  { value: 'nameIncrease', label: 'Названия по возрастанию'},
  { value: 'nameDecrease', label: 'Названия по убыванию'},
  { value: 'priceIncrease', label: 'Цена по возрастанию'},
  { value: 'priceDecrease', label: 'Цена по убыванию'},
]

const SelectCardOrder = (props:React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select className='select-order' name="cardOrder" {...props}>
      {options.map(option=>{
        return <option value={option.value} key={option.value}>{option.label}</option>
      })}
    </select>
  )
}

export default SelectCardOrder;
