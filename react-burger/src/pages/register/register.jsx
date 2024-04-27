import React from "react";
import { 
    Input,
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../utils/request-helper";

export default function RegisterPage() {

    const [state, setState] = React.useState({
        email: '',
        password: '',
        name: ''
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

        sendRequest("auth/register", requestInfo)
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
                  <h1 className='text_type_main-medium mb-6'>Регистрация</h1>
                  <div>
                      <Input name='name' 
                        value={state.name} 
                        placeholder='Имя'
                        onChange={onChangeForm}
                        extraClass="mb-6" />  
                      <EmailInput name='email'
                        value={state.email}
                        onChange={onChangeForm}
                        extraClass='mb-6' />
                      <PasswordInput
                        name='password'
                        onChange={onChangeForm}
                        value={state.password}
                        extraClass='mb-6' />
                      <Button htmlType='submit'
                        onClick={onClick}
                        size='large'
                        extraClass='mb-20 pr-15 pl-15'>Зарегистрироваться</Button>
                  </div>
                  <p className='text_type_main-default text_color_inactive'>
                    Уже зарегистрированы?  <Link className='link-text' to='/login'>Войти</Link>
                  </p>
              </form>
          </div>
    );
}