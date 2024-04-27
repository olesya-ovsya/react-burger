import styles from './ingredient-details.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import NutritionElement from "./nutrition-element/nutrition-element";
import { IngredientPropTypes } from "../../utils/shared-prop-types";

export default function IngredientDetails({ ingredient })
{
    return (
        <>
            <img
                src={ingredient.image_large} 
                alt={`Изображение ингредиента "${ingredient.name}"`}
                className={`${styles.detailImage} mb-4`} />
            <p className={`text_type_main-medium mt-4 mb-8 ${styles.detailIngredientName}`}>
                {ingredient.name}
            </p>
            <NutritionElement ingredient={ingredient} />
        </>
    );
}

IngredientDetails.propTypes = {
    ingredient: IngredientPropTypes
};