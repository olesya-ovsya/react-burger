import { 
    Input,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from 'react-router-dom';

export default function ResetPasswordPage() {
    return (
        <div className='form-container'>
              <form className='mt-20'>
                  <h1 className='text_type_main-medium mb-6'>Восстановление пароля</h1>
                  <div>
                      <PasswordInput extraClass='mb-6' placeholder='Введите новый пароль' />
                      <Input extraClass="mb-6" placeholder='Введите код из письма' />
                      <Button size='large' extraClass='mb-20 pr-15 pl-15'>Сохранить</Button>
                  </div>
                  <p className='text_type_main-default text_color_inactive'>
                    Вспомнили пароль?  <Link className='link-text' to='/login'>Войти</Link>
                  </p>
              </form>
          </div>
    );
}