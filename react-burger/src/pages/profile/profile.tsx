import '../../index.css';
import styles from './profile.module.css';
import { Outlet } from "react-router-dom";
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { logout } from '../../services/actions/user';
import { Loader } from '../../components/loader/loader';
import { Message } from '../../components/message/message';
import { FC } from 'react';

export const ProfilePage: FC = () => {

    const location = useLocation();
    const pathname = location.pathname;

    const dispatch = useDispatch();
    const logoutRequest = useSelector(store => store.user.logoutRequest);
    const logoutFailed = useSelector(store => store.user.logoutFailed);

    const signOut = () => {
        dispatch(logout());
    };

    if (logoutRequest) {
        return <Loader text='Выход из системы...' />;
    }

    return (
        <div className={styles.container}>
            {logoutFailed && <Message type='error' text='Не удалось выйти из системы. Повторите попытку.'/>}
            <div className={styles.profileContainer}>
            <div className='mt-20 mr-15'>
                <ul className={`${styles.menu} text_type_main-medium`}>
                    <li className='pt-5 pb-5'>
                        <Link to='/profile'
                            className={`${styles.link}${pathname === '/profile' ? '.active' : ''}`}>
                            Профиль
                        </Link>
                    </li>
                    <li className='pt-5 pb-5'>
                        <Link to='/profile/orders' className={`${styles.link}${pathname === '/profile/orders' ? '.active' : ''}`}>
                            История заказов
                        </Link>
                    </li>
                    <li className='pt-5 pb-5'>
                        <span className={styles.link} onClick={signOut}>
                            Выход
                        </span>
                    </li>
                </ul>
                <p className={`text_type_main-default mt-20 pl-10 ${styles.info}`}>
                    В этом разделе вы можете < br/> изменить свои персональные данные
                </p>
            </div>
            <Outlet />
          </div>
        </div>
    );
}