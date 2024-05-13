import styles from './ingredient-details.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import NutritionElement from "./nutrition-element/nutrition-element";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { Loader } from '../loader/loader';
import { Message } from '../message/message';

export default function IngredientDetails()
{
    const dispatch = useDispatch();
    const [ingredient, setIngredient] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => { dispatch(getBurgerIngredients()); }, [dispatch]);

    const ingredients = useSelector(store => store.burgerIngredients.ingredients);
    const getIngredientsFailed = useSelector(store => store.burgerIngredients.ingredientsFailed);

    useEffect(() => {
        const currentIngredient = ingredients.filter(x => x._id === id)[0];

        setIngredient(currentIngredient);
        setLoading(false);
    }, [ingredients, id]);

    if (isLoading) {
        return <Loader text='Загружаем информацию об ингредиенте...' />
    }

    return (
        <div className={styles.container}>
        {ingredient && (<>
            <img src={ingredient.image_large} 
                alt={`Изображение ингредиента "${ingredient.name}"`}
                className={`${styles.detailImage} mb-4`} />
            <p className={`text_type_main-medium mt-4 mb-8 ${styles.detailIngredientName}`}>
                {ingredient.name}
            </p>
            <NutritionElement ingredient={ingredient} />
            </>)
        }
        {getIngredientsFailed  &&
            <Message type='error' text='Не удалось загрузить информацию об ингредиенте' />
        }
        </div>
    );
}