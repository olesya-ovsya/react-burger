import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
    Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';

export default function AppHeader() {
    return (
        <Navigation>
            <NavigationBlock className={styles.blockMenu}>
                <NavigationBlockItem text='Конструктор' icon={<BurgerIcon type='secondary' />}/>
                <NavigationBlockItem text='Лента заказов' icon={<ListIcon type='secondary' />} />
            </NavigationBlock>
            <NavigationBlock className={styles.blockLogo}>
                <Logo />
            </NavigationBlock>
            <NavigationBlock className={styles.blockProfile}>
                <NavigationBlockItem text='Личный кабинет' icon={<ProfileIcon type='secondary' />}/>
            </NavigationBlock>
        </Navigation>
    );
};

const Navigation = ({ children }) => {
    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                {children}
            </nav>
        </header>
    );
};

Navigation.propTypes = {
    children: PropTypes.node
};

const NavigationBlock = ({ className, children }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

NavigationBlock.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node
};

const NavigationBlockItem = ({ icon, text }) => {
    return(
        <Button htmlType='button' size='medium' type='secondary' extraClass='p-5 mt-4 mb-4 mr-2'>
                {icon}
                <span className={`${styles.name} ml-2`}>{text}</span>
        </Button>
    );
};

NavigationBlockItem.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired
};
