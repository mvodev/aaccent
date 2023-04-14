import './PayForm.scss';
import { Controller, useForm } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export type Inputs =  {
  name:string,
  phone:string,
}

export type PayFormProps = {
  onSubmit:(data:Inputs) => void
}

const PayForm = (props:PayFormProps) => {
  const {onSubmit} = props;
  const { register, handleSubmit, formState: { errors },control } = useForm<Inputs>();

  return (
    <form className="pay-form" onSubmit={handleSubmit(onSubmit)}>
      <span className="pay-form__description">Имя:</span>
      <input 
        className="pay-form__input"  
        title={'Имя'}
        {...register("name",{ required: true })} 
      />
      { errors.name && <span className="pay-form__error">Обязательное поле</span> }
      <span className="pay-form__description">Телефон:</span>
      <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              value={value}
              onChange={onChange}
              defaultCountry="RU"
              id="phone"
            />
          )}
        />
        {errors.phone && <p className="error-message">Invalid Phone</p>}
      <input 
        className="pay-form__pay" 
        type="submit" 
        value={'Оплатить'}/>
    </form>
  )

}

export default PayForm;