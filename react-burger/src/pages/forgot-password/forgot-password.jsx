import React from "react";
import { 
    EmailInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from 'react-router-dom';
import { sendRequest } from "../../utils/request-helper";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {

    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');

    const onClick = e => {

        e.preventDefault(); // не даем странице перезагрузиться

        const requestInfo = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email })
        };

        sendRequest("password-reset", requestInfo)
        .then((model) => {
            if (model && model.success) {
                navigate('/reset-password', { replace: true });
            } else {
              throw new Error('Failed to receive data from the server. In the response model "success":false');
            }
          })
        .catch(e => {});
    };

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    return (
        <div className='form-container'>
              <form className='mt-20'>
                  <h1 className='text_type_main-medium mb-6'>Восстановление пароля</h1>
                  <div>
                      <EmailInput value={email} onChange={onChangeEmail} extraClass='mb-6' placeholder='Укажите e-mail' />
                      <Button  htmlType='submit' size='large' onClick={onClick} extraClass='mb-20 pr-15 pl-15'>Восстановить</Button>
                  </div>
                  <p className='text_type_main-default text_color_inactive'>
                    Вспомнили пароль?  <Link className='link-text' to='/login'>Войти</Link>
                  </p>
              </form>
          </div>
    );
}