import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './burger-constructor.module.css';
import BurgerFormula from './burger-formula/burger-formula';
import PropTypes from 'prop-types';
import { IngridientPropTypes } from '../../utils/shared-prop-types';

export default function BurgerConstructor({ ingridients }) {
    return(
        <div className={styles.constructorContainer}>
            <div className={styles.constructor}>
                <BurgerFormula ingridientList={ingridients} />
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingridients: PropTypes.arrayOf(IngridientPropTypes).isRequired
};
