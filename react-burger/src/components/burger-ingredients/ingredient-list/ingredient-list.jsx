import styles from './ingredient-list.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientPropTypes, IngredientTabPropTypes, LocationPropTypes } from '../../../utils/shared-prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';

export default function IngredientList ({ tabData, handleScroll }) {
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
                    <div className={styles.ingredientListBlock}>
                        {ingredients.filter(x => x.type === tab.type).map((i)=>(
                            <ElementListItem
                                key={i._id}
                                ingredient={i}
                                count={ i.type === 'bun'
                                    ? (formulaBun && formulaBun._id === i._id ? 2 : 0)
                                    : (formulaOtherIngredients.filter(x => x._id === i._id).length)}
                                location={location} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 

IngredientList.propTypes = {
    tabData: PropTypes.arrayOf(IngredientTabPropTypes).isRequired,
    handleScroll: PropTypes.func.isRequired
}

const ElementListItem = ({ ingredient, count, location }) => {

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
                        {count > 0 && <Counter count={count} styles={{zIndex: '3', position: 'absolute'}}/>}
                    </div>
                    <div className='mt-1 mb-1'>
                        <span className={`${styles.ingredientPrice} text_type_digits-default mr-2`}>{ingredient.price}</span>
                        <CurrencyIcon />
                    </div>
                    <span className='text_type_main-default'>{ingredient.name}</span>
                </Link>
        </div>
    )
};

ElementListItem.propTypes = {
    ingredient: IngredientPropTypes.isRequired,
    count: PropTypes.number.isRequired,
    location: LocationPropTypes.isRequired
};