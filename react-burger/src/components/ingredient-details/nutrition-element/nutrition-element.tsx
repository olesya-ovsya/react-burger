import styles from './nutrition-element.module.css';
import { FC } from 'react';
import { IApiIngredient } from '../../../utils/shared-prop-types';

interface INutritionElementProps {
    ingredient: IApiIngredient
}

export const NutritionElement: FC<INutritionElementProps> = ({ ingredient }) => {
    return (
        <div className={`${styles.nutritionBlock} mb-15`}>
            <NutritionElementText name='Калории, ккал' value={ingredient.calories} />
            <NutritionElementText name='Белки, г' value={ingredient.proteins} />
            <NutritionElementText name='Жиры, г' value={ingredient.fat} />
            <NutritionElementText name='Углеводы, г' value={ingredient.carbohydrates} />
        </div>
    );
}

interface INutritionElementTextProps {
    name: string,
    value: number
}

const NutritionElementText: FC<INutritionElementTextProps> = ({name, value}) => {
    return (
        <p className={`${styles.nutritionText} text_type_main-default text_color_inactive ml-3`}>
            {name}
            <br/>
            <span className='text_type_digits-default'>{value}</span>
        </p>
    );
}