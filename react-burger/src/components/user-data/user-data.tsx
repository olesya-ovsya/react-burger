import { 
    Input,
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../index.css';
import styles from './user-data.module.css';
import { useSelector, useDispatch } from "../../services/hooks";
import { useEffect, useState, useRef, SyntheticEvent, BaseSyntheticEvent, ChangeEventHandler } from "react";
import { getCurrentUser, updateUserData } from "../../services/actions/user";
import { Loader } from "../loader/loader";
import { Message } from "../message/message";
import { FC } from "react";
import { IUserDataModel } from "../../utils/shared-prop-types";

export const UserData: FC = () => {

    const getUserRequest = useSelector(store => store.user.getUserRequest);
    const getUserFailed = useSelector(store => store.user.getUserFailed);
    const updateUserDataRequest = useSelector(store => store.user.updateUserDataRequest);
    const updateUserDataFailed = useSelector(store => store.user.updateUserDataFailed);
    const email = useSelector(store => store.user.email);
    const name = useSelector(store => store.user.name);

    const [form, setForm] = useState<IUserDataModel>({
        email: '',
        password: '',
        name: ''
    });

    const [errorText, setErrorText] = useState<string | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        setForm({ ...form, email: email ?? '', name: name ?? '' });
    }, [name, email]);

    useEffect(() => {
        if (updateUserDataFailed) {
            setErrorText('Не удалось обновить данные пользователя');
        } else if (getUserFailed) {
            setErrorText('Не удалось получить данные пользователя');
        } else {
            setErrorText(null);
        }
    }, [updateUserDataFailed, getUserFailed])

    const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUserData(form));
    };

    const cancel = () => {
        setForm({...form, password: '', email: email ?? '', name: name ?? '' });
    };

    if (getUserRequest) {
        return <Loader text='Загружаем информацию о пользователе...' />
    }

    if (updateUserDataRequest) {
        return <Loader text='Обновляем информацию о пользователе...' />
    }

    return (
        <div>
            {errorText && <Message type='error' text={errorText} />}
            <form className='mt-20' onSubmit={submit}>
                  <div>
                      <NameInput name='name' 
                        value={form.name ?? ''} 
                        onChange={onChangeForm}
                        isIcon={true}
                        extraClass="mb-6" />  
                      <EmailInput name='email'
                        value={form.email ?? ''}
                        onChange={onChangeForm}
                        isIcon={true}
                        extraClass='mb-6' />
                      <PasswordInput
                        name='password'
                        onChange={onChangeForm}
                        value={form.password}
                        icon='EditIcon' />
                  </div>
                  { (name !== form.name || email !== form.email || form.password?.length > 0) 
                    && <div className={`${styles.buttonsContainer} mt-10`}>
                        <Button htmlType='reset'
                            type='secondary'
                            size='medium'
                            onClick={cancel}
                            extraClass='mr-5'>
                                Отмена
                        </Button>
                        <Button htmlType='submit'
                            type='primary'
                            size='medium'>
                                Сохранить
                        </Button>
                    </div>}
              </form>
        </div>
    );
}

interface INameInputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'type' | 'ref'> {
    name: string,
    value: string,
    isIcon: boolean,
    extraClass: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const NameInput: React.FC<INameInputProps> = ({
    value,
    onChange,
    placeholder = 'Имя',
    isIcon = false,
    extraClass = '',
    ...rest
}) => {
    const [fieldDisabled, setDisabled] = useState(isIcon);

    const [error, setError] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setDisabled(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setError(false);
        isIcon && setDisabled(true);
    };
    return (
        <Input
            type='text'
            placeholder={placeholder}
            onChange={onChange}
            icon={isIcon ? 'EditIcon' : undefined}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            error={error}
            disabled={fieldDisabled}
            onIconClick={onIconClick}
            errorText={'Ой, произошла ошибка!'}
            size='default'
            extraClass={extraClass}
            {...rest}
        />
    );
};