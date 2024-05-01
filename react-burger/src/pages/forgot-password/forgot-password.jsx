import React from "react";
import { 
    EmailInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { postCheckPasswordResetAvailable } from "../../utils/api";
import { Loader } from "../../components/loader/loader";
import { Message } from "../../components/message/message";

export default function ForgotPasswordPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);
        postCheckPasswordResetAvailable(email)
        .then((model) => {
            if (model && model.success) {
                navigate('/reset-password', { replace: true, state: { from: location.pathname} });
            } else {
                setLoading(false);
              throw new Error('Failed to receive data from the server. In the response model "success":false');
            }
          })
        .catch(e => {
            setError('Не удалось проверить почту для сброса пароля');
            setLoading(false);
        });
    };

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    if (loading) {
        return <Loader text='Проверяем почту...' />
    }

    return (
        <div className='form-container'>
            {error && <Message type='error' text={error} />}
              <form className='mt-20' onSubmit={onSubmit}>
                  <h1 className='text_type_main-medium mb-6'>Восстановление пароля</h1>
                  <div>
                      <EmailInput value={email} onChange={onChangeEmail} extraClass='mb-6' placeholder='Укажите e-mail' />
                      <Button  htmlType='submit' size='large' extraClass='mb-20 pr-15 pl-15'>Восстановить</Button>
                  </div>
                  <p className='text_type_main-default text_color_inactive'>
                    Вспомнили пароль?  <Link className='link-text' to='/login'>Войти</Link>
                  </p>
              </form>
          </div>
    );
}