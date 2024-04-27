import { 
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
      <div className='form-container'>
            <form className='mt-20'>
                <h1 className='text_type_main-medium mb-6'>Вход</h1>
                <div>
                    <EmailInput extraClass='mb-6' />
                    <PasswordInput extraClass='mb-6' />
                    <Button size='large' extraClass='mb-20 pr-15 pl-15'>Войти</Button>
                </div>
                <p className='mb-4 text_type_main-default text_color_inactive'>
                    Вы - новый пользователь?  <Link className='link-text' to='/register'>Зарегистрироваться</Link>
                </p>
                <p className='mb-4 text_type_main-default text_color_inactive'>
                    Забыли пароль?  <Link className='link-text' to='/forgot-password'>Восстановить пароль</Link>
                </p>
            </form>
        </div>
    );
}