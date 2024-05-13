import { useEffect, useState } from "react";
import { 
    Input,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { postResetPassword } from "../../utils/api";
import { Loader } from "../../components/loader/loader";
import { Message } from "../../components/message/message";

export default function ResetPasswordPage() {

    const [form, setForm] = useState({
        password: '',
        token: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (location.state?.from !== '/forgot-password') {
        navigate('/forgot-password', { replace: true });
      }
    }, [location, navigate]);

    const onChangeForm = e => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);
        postResetPassword(form)
        .then((model) => {
            if (model && model.success) {
                navigate('/', { replace: true });
            } else {
              setLoading(false);
              throw new Error('Failed to receive data from the server. In the response model "success":false');
            }
          })
        .catch(e => {
          setError('Не удалось сменить пароль');
          setLoading(false);
        });
    };

    if (loading) {
      return <Loader text='Смена пароля...' />
    }
    
    return (
        <div className='form-container'>
              {error && <Message type='error' text={error} />}
              <form className='mt-20' onSubmit={onSubmit}>
                  <h1 className='text_type_main-medium mb-6'>Восстановление пароля</h1>
                  <div>
                      <PasswordInput name='password'
                        value={form.password}
                        placeholder='Введите новый пароль'
                        onChange={onChangeForm}
                        extraClass='mb-6' />
                      <Input name='token'
                        value={form.token}
                        placeholder='Введите код из письма'
                        onChange={onChangeForm}
                        extraClass="mb-6" />
                      <Button htmlType='submit'
                        size='large'
                        extraClass='mb-20 pr-15 pl-15'>Сохранить</Button>
                  </div>
                  <p className='text_type_main-default text_color_inactive'>
                    Вспомнили пароль?  <Link className='link-text' to='/login'>Войти</Link>
                  </p>
              </form>
          </div>
    );
}