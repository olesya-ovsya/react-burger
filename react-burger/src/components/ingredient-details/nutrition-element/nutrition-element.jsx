import styles from './nutrition-element.module.css';
import PropTypes from 'prop-types';
import { IngredientPropTypes } from '../../../utils/shared-prop-types';

export default function NutritionElement({ ingredient }) {
    return (
        <div className={`${styles.nutritionBlock} mb-15`}>
            <NutritionElementText name='Калории, ккал' value={ingredient.calories} />
            <NutritionElementText name='Белки, г' value={ingredient.proteins} />
            <NutritionElementText name='Жиры, г' value={ingredient.fat} />
            <NutritionElementText name='Углеводы, г' value={ingredient.carbohydrates} />
        </div>
    );
}

NutritionElement.propTypes = {
    ingredient: IngredientPropTypes
};

const NutritionElementText = ({name, value}) => {
    return (
        <p className={`${styles.nutritionText} text_type_main-default text_color_inactive ml-3`}>
            {name}
            <br/>
            <span className='text_type_digits-default'>{value}</span>
        </p>
    );
}

NutritionElementText.propTypes = {
    name: PropTypes.string.isRequired, 
    value: PropTypes.number.isRequired
};