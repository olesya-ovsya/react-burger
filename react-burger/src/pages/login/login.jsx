import { 
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';

export default function LoginPage() {
    return (
      <div className={styles.loginContainer}>
            <form className='mt-20'>
                <h1 className='text_type_main-medium mb-6'>Вход</h1>
                <div>
                    <EmailInput extraClass='mb-6' />
                    <PasswordInput extraClass='mb-6' />
                    <Button size='large' extraClass='mb-20 pr-15 pl-15'>Войти</Button>
                </div>
                <p className='mb-4'>Вы - новый пользователь? <a>Зарегистрироваться</a></p>
                <p>Забыли пароль? <a>Восстановить пароль</a></p>
            </form>
        </div>
    );
}