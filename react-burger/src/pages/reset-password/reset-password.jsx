import React from "react";
import { 
    Input,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../utils/request-helper";

export default function ResetPasswordPage() {

    const [state, setState] = React.useState({
        password: '',
        token: ''
    });

    const navigate = useNavigate();

    const onChangeForm = e => {
        setState({...state, [e.target.name]: e.target.value });
    };

    const onClick = e => {

        e.preventDefault(); // не даем странице перезагрузиться

        const requestInfo = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(state)
        };

        sendRequest('password-reset/reset', requestInfo)
        .then((model) => {
            if (model && model.success) {
                navigate('/', { replace: true });
            } else {
              throw new Error('Failed to receive data from the server. In the response model "success":false');
            }
          })
        .catch(e => {});
    };
    
    return (
        <div className='form-container'>
              <form className='mt-20'>
                  <h1 className='text_type_main-medium mb-6'>Восстановление пароля</h1>
                  <div>
                      <PasswordInput name='password'
                        placeholder='Введите новый пароль'
                        onChange={onChangeForm}
                        extraClass='mb-6' />
                      <Input name='token'
                        placeholder='Введите код из письма'
                        onChange={onChangeForm}
                        extraClass="mb-6" />
                      <Button htmlType='submit'
                        size='large'
                        onClick={onClick}
                        extraClass='mb-20 pr-15 pl-15'>Сохранить</Button>
                  </div>
                  <p className='text_type_main-default text_color_inactive'>
                    Вспомнили пароль?  <Link className='link-text' to='/login'>Войти</Link>
                  </p>
              </form>
          </div>
    );
}