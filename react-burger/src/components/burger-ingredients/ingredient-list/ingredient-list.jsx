import React from 'react';
import styles from './ingredient-list.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientPropTypes, IngredientTabPropTypes } from '../../../utils/shared-prop-types';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';

export default function IngredientList ({ tabData }) {
    const [currentIngredient, setCurrentIngredient] = React.useState(undefined);
    
    const openIngredientDetails = (ingredient) => { setCurrentIngredient(ingredient) };

    const closeIngredientDetails = () => { setCurrentIngredient(undefined) };

    const ingredients = useSelector(store => store.burgerIngredients.ingredients);
    const formulaBun = useSelector(store => store.burgerFormula.bun);
    const formulaOtherIngredients = useSelector(store => store.burgerFormula.otherIngredients);

    return (
        <div className={styles.ingredientList}>
            {tabData.map((tab) => (
                <div key={tab.id} className='mt-10 mb-6'>
                    <h2 className={`${styles.header} text_type_main-medium`}>{tab.name}</h2>
                    <div className={styles.ingredientListBlock}>
                        {ingredients.filter(x => x.type === tab.type).map((i)=>(
                            <ElementListItem
                                key={i._id}
                                ingredient={i}
                                count={ i.type === 'bun'
                                    ? (formulaBun && formulaBun._id === i._id ? 2 : 0)
                                    : (formulaOtherIngredients.filter(x => x._id === i._id).length)}
                                isLocked = {i.type === 'bun' && formulaBun && formulaBun._id === i._id}
                                onShowDetailsClick={openIngredientDetails} />
                        ))}
                    </div>
                </div>
            ))}
            <div className={styles.modalContainer} id='igridient-details-modal'>
                {currentIngredient && (
                    <Modal header='Детали ингредиента' modalContainerId='igridient-details-modal' onClose={closeIngredientDetails}>
                        <IngredientDetails ingredient={currentIngredient} />
                    </Modal>)}
            </div>
        </div>
    );
} 

IngredientList.propTypes = {
    tabData: PropTypes.arrayOf(IngredientTabPropTypes).isRequired
}

const ElementListItem = ({ ingredient, count, isLocked, onShowDetailsClick }) => {
    const handleClick = () => onShowDetailsClick(ingredient);
    return (
        <div key={ingredient._id} className={`${styles.ingredientCard} mr-4 mt-6`} onClick={handleClick} disabled={isLocked}>
            <div className={styles.imageBox}>
                <img src={ingredient.image} className='ml-4' />
                {count > 0 && <Counter count={count} styles={{zIndex: '3', position: 'absolute'}}/>}
            </div>
            <div className='mt-1 mb-1'>
                <span className={`${styles.ingredientPrice} text_type_digits-default mr-2`}>{ingredient.price}</span>
                <CurrencyIcon />
            </div>
            <span className='text_type_main-default'>{ingredient.name}</span>
        </div>
    )
};

ElementListItem.propTypes = {
    ingredient: IngredientPropTypes.isRequired,
    count: PropTypes.number.isRequired,
    isLocked: PropTypes.bool.isRequired,
    onShowDetailsClick: PropTypes.func.isRequired
};