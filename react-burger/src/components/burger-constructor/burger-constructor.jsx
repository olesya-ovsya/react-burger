import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './burger-constructor.module.css';
import BurgerFormula from './burger-formula/burger-formula';

export default function BurgerConstructor() {
    return(
        <div className={styles.constructorContainer}>
            <div className={styles.constructor}>
                <BurgerFormula />
            </div>
        </div>
    );
};
