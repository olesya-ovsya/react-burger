import '../../index.css';
import styles from './profile.module.css';
import { Outlet } from "react-router-dom";
import { useLocation, Link } from 'react-router-dom';

export default function ProfilePage() {

    const location = useLocation();
    const pathname = location.pathname;

    const logout = () => {

    };

    return (
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
                        <span className={styles.link}>
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
    );
}