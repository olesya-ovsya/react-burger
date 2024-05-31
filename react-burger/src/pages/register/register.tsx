import { useState, useEffect, BaseSyntheticEvent, SyntheticEvent } from "react";
import { 
    Input,
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { register } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hooks";
import { Loader } from "../../components/loader/loader";
import { Message } from "../../components/message/message";
import { FC } from "react";
import { IUserDataModel } from "../../utils/shared-prop-types";

export const RegisterPage: FC = () => {
    const registerRequest = useSelector(store => store.user.registerRequest);
    const registerFailed = useSelector(store => store.user.registerFailed);
    const authorized = useSelector(store => store.user.authorized);

    const [state, setState] = useState<IUserDataModel>({
        email: '',
        password: '',
        name: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChangeForm = (e: BaseSyntheticEvent) => {
        setState({...state, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(register(state));
    };

    useEffect(() => {
      if (authorized) {
        navigate('/', { replace: true });
      }
    }, [authorized]);

    if (registerRequest) {
      return <Loader text='Регистрируем пользователя...' />
    }

    return (
        <div className='form-container' style={{flexDirection: 'column'}}>
              {registerFailed && <Message type='error' text='Не удалось зарегистрировать пользователя' />}
              <form className='mt-20' onSubmit={onSubmit}>
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