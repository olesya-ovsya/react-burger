import styles from './ingridient-details.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import NutritionElement from "./nutrition-element/nutrition-element";
import { IngridientPropTypes } from "../../utils/shared-prop-types";

export default function IngridientDetails({ ingridient })
{
    return (
        <>
            <img src={ingridient.image_large} className={`${styles.detailImage} mb-4`} />
            <p className={`text_type_main-medium mt-4 mb-8 ${styles.detailIngridientName}`}>
                {ingridient.name}
            </p>
            <NutritionElement ingridient={ingridient} />
        </>
    );
}

IngridientDetails.propTypes = {
    ingridient: IngridientPropTypes
};