import { 
    Input,
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    return (
        <div className='form-container'>
              <form className='mt-20'>
                  <h1 className='text_type_main-medium mb-6'>Регистрация</h1>
                  <div>
                      <Input extraClass="mb-6" placeholder='Имя' />  
                      <EmailInput extraClass='mb-6' />
                      <PasswordInput extraClass='mb-6' />
                      <Button size='large' extraClass='mb-20 pr-15 pl-15'>Зарегистрироваться</Button>
                  </div>
                  <p className='text_type_main-default text_color_inactive'>
                    Уже зарегистрированы?  <Link className='link-text' to='/login'>Войти</Link>
                  </p>
              </form>
          </div>
      );
}