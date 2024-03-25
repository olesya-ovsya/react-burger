import styles from './nutrition-element.module.css';
import PropTypes from 'prop-types';

export default function NutritionElement({calories, proteins, fat, carbohydrates}) {
    return (
        <div className={`${styles.nutritionBlock} mb-15`}>
            <NutritionElementText name='Калории, ккал' value={calories} />
            <NutritionElementText name='Белки, г' value={proteins} />
            <NutritionElementText name='Жиры, г' value={fat} />
            <NutritionElementText name='Углеводы, г' value={carbohydrates} />
        </div>
    );
}

NutritionElement.propTypes = {
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
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