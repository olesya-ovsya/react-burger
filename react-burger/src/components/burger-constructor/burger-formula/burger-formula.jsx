import React from 'react';
import { CurrencyIcon, ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './burger-formula.module.css';
import OrderDetails from '../../order-details/order-details';
import Modal from '../../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { SET_BUN } from '../../../services/actions/burgerFormula';
import PropTypes from 'prop-types';
 
export default function BurgerFormula() {

    const [state, setState] = React.useState({
        sum: 0,
        orderDetailsVisible: false
    });

    const ingredientList = useSelector(store => store.burgerIngredients.ingredients);
    const { otherIngredients, bun } = useSelector(store => store.burgerFormula);

    const dispatch = useDispatch();
    
    React.useEffect(
        () => { setState({ ...state, sum: 0 }); },
        []
    );

    const openOrderDetails = () => {
        if (!state.orderDetailsVisible) {
            setState({
                ...state,
                orderDetailsVisible: true
            });
        }
    }

    const closeOrderDetails = () => {
        if (state.orderDetailsVisible) {
            setState({
                ...state,
                orderDetailsVisible: false
            });
        }
    }

    return (
        <div className='mt-25 ml-4'>
            {bun
                ? <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    extraClass='ml-8 mb-4 mr-1' />
                : <FakeConstructorElement text='Выберите булки' extraClass='constructor-element_pos_top' />}
            {otherIngredients && otherIngredients.length > 0 ? <div className={styles.ingredientListContainer}>
                {otherIngredients.map((ingredient) =>
                    <div key={ingredient._id} className={styles.elementListItem}>
                        <DragIcon/>
                        <ConstructorElement
                            text={ingredient.name}
                            thumbnail={ingredient.image_mobile}
                            price={ingredient.price}
                            extraClass='mb-4 ml-2'/>
                    </div>)}
            </div>
            : <div className='constructor-element ml-8 mb-4 mr-1'>
            <span className="constructor-element__text mt-4" style={{fontSize: 'larger'}}>Выберите начинку</span>
        </div>}
            {bun ? <ConstructorElement
                text={`${bun.name} (низ)`}
                type='bottom'
                isLocked={true}
                thumbnail={bun.image_mobile}
                price={bun.price}
                extraClass='ml-8 mb-4 mr-1' />
                : <FakeConstructorElement text='Выберите булки' extraClass='constructor-element_pos_bottom' />}
            <div className={`${styles.bottom} mt-10`}>
                <span className='text_type_digits-medium mr-2'>{state.sum}</span>
                <CurrencyIcon style={{viewBox: '0 0 36 36'}} />
                <Button extraClass='ml-10 mr-4' htmlType='submit' onClick={openOrderDetails}>
                    <span>Оформить заказ</span>
                </Button>
            </div>
            <div className={styles.modalContainer} id='order-details-modal'>
                {state.orderDetailsVisible && (
                    <Modal modalContainerId='order-details-modal' onClose={closeOrderDetails}>
                        <OrderDetails />
                    </Modal>)}
            </div>
        </div>
    );
}

function FakeConstructorElement({ text, extraClass }) {
    return (
        <div className={`constructor-element ml-8 mb-4 mr-1 ${extraClass}`}>
            <span className="constructor-element__text mt-4" style={{fontSize: 'larger'}}>{text}</span>
        </div>
    );
}

FakeConstructorElement.propTypes = {
    text: PropTypes.string.isRequired,
    extraClass: PropTypes.string
};