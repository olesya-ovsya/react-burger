import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
    Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { FC } from 'react';

export const AppHeader: FC = () => {

    const location = useLocation();

    return (
        <Navigation>
            <NavigationBlock className={styles.blockMenu}>
                <NavigationBlockItem text='Конструктор'
                    to='/'
                    path={location.pathname}
                    icon={<BurgerIcon type='secondary' />}/>
                <NavigationBlockItem text='Лента заказов'
                    to='/orders'
                    path={location.pathname}
                    icon={<ListIcon type='secondary' />} />
            </NavigationBlock>
            <NavigationBlock className={styles.blockLogo}>
                <Logo />
            </NavigationBlock>
            <NavigationBlock className={styles.blockProfile}>
                <NavigationBlockItem text='Личный кабинет'
                    to='/profile'
                    path={location.pathname}
                    icon={<ProfileIcon type='secondary' />}/>
            </NavigationBlock>
        </Navigation>
    );
};

const Navigation : FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                {children}
            </nav>
        </header>
    );
};

const NavigationBlock : FC<{
    className: string,
    children: React.ReactNode
}> = ({ className, children }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

const NavigationBlockItem : FC<{
    icon: JSX.Element,
    text: string,
    to: string,
    path: string
}> = ({ icon, text, to, path }) => {

    const navigate = useNavigate();

    const onClick = () => {
        navigate(to);
    };

    return(
        <Button htmlType='button'
            size='medium'
            type='secondary'
            onClick={onClick}
            extraClass='p-5 mt-4 mb-4 mr-2'>
                {icon}
                <span className={`${styles.name} ml-2 ${(to === '/' ? to === path  : path.includes(to)) ? 'text_color_primary' : ''}`}>
                    {text}
                </span>
        </Button>
    );
};
