import styles from './nutrition-element.module.css';
import PropTypes from 'prop-types';
import { IngridientPropTypes } from '../../../utils/shared-prop-types';

export default function NutritionElement({ ingridient }) {
    return (
        <div className={`${styles.nutritionBlock} mb-15`}>
            <NutritionElementText name='Калории, ккал' value={ingridient.calories} />
            <NutritionElementText name='Белки, г' value={ingridient.proteins} />
            <NutritionElementText name='Жиры, г' value={ingridient.fat} />
            <NutritionElementText name='Углеводы, г' value={ingridient.carbohydrates} />
        </div>
    );
}

NutritionElement.propTypes = {
    ingridient: IngridientPropTypes
};

const NutritionElementText = ({name, value}) => {
    return (
        <p className={`${styles.nutritionText} text_type_main-default text_color_inactive mr-5`}>
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