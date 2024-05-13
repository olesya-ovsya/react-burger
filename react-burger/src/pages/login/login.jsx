import { 
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../components/message/message";
import { useState, useEffect } from 'react';
import { login } from "../../services/actions/user";
import { Loader } from "../../components/loader/loader";
import { isAuthorized } from "../../utils/utils";

export default function LoginPage() {

    const [form, setForm] = useState({ email: '', password: '' });

    const loginFailed = useSelector(store => store.user.loginFailed);
    const loginRequest = useSelector(store => store.user.loginRequest);
    const authorized = isAuthorized();

    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form.email, form.password));
    };

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (authorized) {
            if (location?.state?.from) {
                navigate(location.state.from, {replace: true});
            } else {
                navigate('/');
            }
        }
    }, [authorized]);

    if (loginRequest) {
        return <Loader text='Авторизация...'/>
    }

    return (
      <div className='form-container mt-20' style={{flexDirection: 'column'}}>
            {loginFailed && <Message type='error' text='Не удалось авторизоваться в системе' />}
            <form onSubmit={onSubmit}>
                <h1 className='text_type_main-medium mb-6'>Вход</h1>
                <div>
                    <EmailInput name='email'
                        value={form.email}
                        onChange={onChangeForm}
                        extraClass='mb-6' />
                    <PasswordInput name='password'
                        value={form.password}
                        onChange={onChangeForm}
                        extraClass='mb-6' />
                    <Button htmlType='submit'
                        size='large'
                        extraClass='mb-20 pr-15 pl-15'>
                            Войти
                    </Button>
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