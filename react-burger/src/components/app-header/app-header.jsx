import React from 'react';
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
    Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';

export default class AppHeader extends React.Component {
    render() {
        return (
            <Navigation>
                <NavigationBlock className={styles.blockMenu}>
                    <NavigationBlockItem text='Конструктор' getIcon={() => <BurgerIcon type='secondary' />}/>
                    <NavigationBlockItem text='Лента заказов' getIcon={() => <ListIcon type='secondary' />} disabled />
                </NavigationBlock>
                <NavigationBlock className={styles.blockLogo}>
                    <Logo />
                </NavigationBlock>
                <NavigationBlock className={styles.blockProfile}>
                    <NavigationBlockItem text='Личный кабинет' getIcon={() => <ProfileIcon type='secondary' />} disabled />
                </NavigationBlock>
            </Navigation>
        );
    };
};

class Navigation extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <nav className={styles.container}>
                    {this.props.children}
                </nav>
            </header>
        );
    };
};

class NavigationBlock extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    };
};

class NavigationBlockItem extends React.Component {
    render() {
        return(
            <>
                <Button htmlType='button' size='large' type='secondary' extraClass='p-5 mt-4 mb-4 mr-2' {...this.props}>
                    {this.props.getIcon()}
                    <span className={styles.name + ' ' + 'ml-2'}>{this.props.text}</span>
                </Button>
            </>
        );
    };
}