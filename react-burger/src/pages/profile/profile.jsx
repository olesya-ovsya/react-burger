import React from "react";
import { 
    Input,
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import styles from './profile.module.css';

export default function ProfilePage() {

    const [state, setState] = React.useState({
        email: 'lesya667@yandex.ru',
        password: '',
        name: 'Олеся'
    });

    const onChangeForm = e => {
        setState({...state, [e.target.name]: e.target.value });
    };

    const submit = e => {
        e.preventDefault(); // не даем странице перезагрузиться
    };

    const cancel = () => {

    };

    return (
        <div className={styles.profileContainer}>
            <div className='mt-20 mr-15'>
                <ul className={`${styles.menu} text_type_main-medium`}>
                    <li className='pt-5 pb-5'><a className={`${styles.link}.active`}>Профиль</a></li>
                    <li className='pt-5 pb-5'><a className={styles.link}>История заказов</a></li>
                    <li className='pt-5 pb-5'><a className={styles.link}>Выход</a></li>
                </ul>
                <p className={`text_type_main-default mt-20 pl-10 ${styles.info}`}>
                    В этом разделе вы можете < br/> изменить свои персональные данные
                </p>
            </div>
              <form className='mt-20'>
                  <div>
                      <NameEditInput name='name' 
                        value={state.name} 
                        placeholder='Имя'
                        onChange={onChangeForm}
                        isIcon={true}
                        extraClass="mb-6" />  
                      <EmailInput name='email'
                        value={state.email}
                        onChange={onChangeForm}
                        isIcon={true}
                        extraClass='mb-6' />
                      <PasswordInput
                        name='password'
                        onChange={onChangeForm}
                        value={state.password}
                        icon='EditIcon' />
                  </div>
                  <div className={`${styles.buttonsContainer} mt-10`}>
                    <Button htmlType='reset'
                        type='secondary'
                        size='medium'
                        onClick={cancel}
                        extraClass='mr-5'>
                            Отмена
                    </Button>
                    <Button htmlType='submit'
                        type='primary'
                        size='medium'
                        onClick={submit}>
                            Сохранить
                    </Button>
                  </div>
              </form>
          </div>
    );
}

const NameEditInput = ({
    placeholder,
    value,
    isIcon,
    extraClass,
    onChange }) => {
    const [fieldDisabled, setDisabled] = React.useState(isIcon);

    const [error, setError] = React.useState(false);

    const inputRef = React.useRef(null);

    const onIconClick = () => {
        setDisabled(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = (e) => {
        isIcon && setDisabled(true);
    };

    return <Input
        placeholder={placeholder}
        icon='EditIcon'
        value={value}
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        error={error}
        disabled={fieldDisabled}
        onIconClick={onIconClick}
        extraClass={extraClass}
        errorText={'Ой, произошла ошибка!'} />
}