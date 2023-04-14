import { useState } from 'react';
import './CounterDelete.scss';

export type CounterDeletePropsType = {
  handleDeleteButtonClick: (counter:number,id:number)=>void,
  handleCounterChange:(counter:number,id:number)=>void
  initialCounter: number,
  pricePerUnit:number,
  id:number,
}

const CounterDelete = (props:CounterDeletePropsType) => {
  const {initialCounter = 0,handleDeleteButtonClick,handleCounterChange, pricePerUnit, id} = props;
  const [counter,setCounter] = useState(initialCounter);

  const handleCounter = (event:React.PointerEvent<HTMLButtonElement>) => {
    const isButtonMinusClicked = event.currentTarget.classList.contains('counter-delete__button_minus');
    let newCounterState = counter;
    if (isButtonMinusClicked) {
      if (counter > 0) newCounterState = counter-1; 
    } else newCounterState =  counter+1;
    setCounter(newCounterState);
    handleCounterChange(newCounterState, id);
  }

  return (
    <div className="counter-delete">
      <div className="counter-delete__button-wrapper">
        <button 
          type='button' 
          className='counter-delete__button counter-delete__button_minus' 
          onPointerDown={handleCounter}
        >
          -
        </button>
        <span>
          {counter}
        </span>
        <button 
          type='button' 
          className='counter-delete__button counter-delete__button_plus' 
          onPointerDown={handleCounter}
        >
          +
        </button>
        </div>
      <div className="counter-delete__price">Цена за единицу товара: {Number(pricePerUnit).toFixed(2)}</div>
      <button  
        onPointerDown={() => {
          setCounter(0);
          handleDeleteButtonClick(counter,id);
        }}/>
    </div>
  )
}

export default CounterDelete;