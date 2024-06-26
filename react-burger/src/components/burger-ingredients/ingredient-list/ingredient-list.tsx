import styles from './ingredient-list.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/hooks';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { FC } from 'react';
import { ITab, IApiIngredient, ILocation } from '../../../utils/shared-prop-types';

interface IIngredientListProps  {
    tabData: Array<ITab>,
    handleScroll: () => void
}

export const IngredientList: FC<IIngredientListProps> = ({ tabData, handleScroll }) => {
    const ingredients = useSelector(store => store.burgerIngredients.ingredients);
    const formulaBun = useSelector(store => store.burgerFormula.bun);
    const formulaOtherIngredients = useSelector(store => store.burgerFormula.otherIngredients);
    const location = useLocation();

    return (
        <div className={styles.ingredientList} onScroll={handleScroll}>
            {tabData.map((tab) => (
                <div key={tab.id} className='mt-10 mb-6'>
                    <h2 className={`${styles.header} text_type_main-medium`} ref={tab.ref}>
                        {tab.name}
                    </h2>
                    <div id={`ingredient-list_${tab.type}`} className={styles.ingredientListBlock}>
                        {ingredients.filter((x: IApiIngredient) => x.type === tab.type).map((i: IApiIngredient)=>(
                            <ElementListItem
                                key={i._id}
                                ingredient={i}
                                count={ i.type === 'bun'
                                    ? (formulaBun && formulaBun._id === i._id ? 2 : 0)
                                    : (formulaOtherIngredients.filter((x: IApiIngredient) => x._id === i._id).length)}
                                location={location} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

interface IElementListItem {
    ingredient: IApiIngredient,
    count: number,
    location: ILocation
}

const ElementListItem: FC<IElementListItem> = ({ ingredient, count, location }) => {

    const [{ opacity }, ref] = useDrag({
        type: ingredient.type === 'bun' ? 'bun' : 'otherIngredient',
        item: { ingredient },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
      });

    return (
        <div key={ingredient._id} 
            className={`${styles.ingredientCard} mr-4 mt-6`} 
            ref={ref}
            style={{opacity}}>
                <Link  to={`/ingredients/${ingredient._id}`} state={{ background: location }}>
                    <div className={styles.imageBox}>
                        <img src={ingredient.image} alt={`Изображение ингредиента "${ingredient.name}"`} className='ml-4' />
                        {count > 0 && <Counter count={count} />}
                    </div>
                    <div className='mt-1 mb-1'>
                        <span className={`${styles.ingredientPrice} text_type_digits-default mr-2`}>{ingredient.price}</span>
                        <CurrencyIcon type='primary' />
                    </div>
                    <span className='text_type_main-default'>{ingredient.name}</span>
                </Link>
        </div>
    )
};