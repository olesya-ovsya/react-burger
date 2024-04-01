import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './burger-constructor.module.css';
import BurgerFormula from './burger-formula/burger-formula';
import PropTypes from 'prop-types';
import { IngredientPropTypes } from '../../utils/shared-prop-types';

export default function BurgerConstructor({ ingredients }) {
    return(
        <div className={styles.constructorContainer}>
            <div className={styles.constructor}>
                <BurgerFormula ingredientList={ingredients} />
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientPropTypes).isRequired
};
