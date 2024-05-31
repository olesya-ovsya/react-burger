import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './burger-constructor.module.css';
import { BurgerFormula } from './burger-formula/burger-formula';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import React from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { createOrder, clearOrderNumber } from '../../services/actions/order';
import { isAuthorized } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { IIngredient } from '../../utils/shared-prop-types';

export const BurgerConstructor: FC = () => {

    const [state, setState] = React.useState({
        orderDetailsVisible: false
    });
    
    const navigate = useNavigate();

    const { bun, otherIngredients } = useSelector(store => store.burgerFormula);

    const finalSum = React.useMemo(
        () => {
            let currentSum = 0;

            if (bun && bun !== null) {
                currentSum = bun.price * 2;
            }

            if (otherIngredients && otherIngredients.length > 0) {
                otherIngredients.forEach((x: IIngredient) => { currentSum += x.price });
            }

            return currentSum;
        },
        [bun, otherIngredients]
    );

    const dispatch = useDispatch();

    const createNewOrder = () => {
        if (bun === null) {
            return;
        }

        const authorized = isAuthorized();

        if (!authorized) {
            navigate('/login', { state: { from: '/' }});
        }

        let ingredients = [bun._id];

        if (otherIngredients && otherIngredients.length > 0) {
            ingredients = ingredients.concat(otherIngredients.map((x: IIngredient) => x._id));
        }

        ingredients = ingredients.concat([bun._id]);

        dispatch(createOrder(ingredients));

        if (!state.orderDetailsVisible) {
            setState({
                ...state,
                orderDetailsVisible: true
            });
        }
    };

    const closeOrderDetails = () => {
        dispatch(clearOrderNumber());

        if (state.orderDetailsVisible) {
            setState({
                ...state,
                orderDetailsVisible: false
            });
        }
    }

    return(
        <div className={styles.constructorContainer}>
            <div className={styles.constructorMenu}>
                <div className='mt-25 ml-4'>
                    <BurgerFormula />
                    <div className={`${styles.bottom} mt-10`}>
                        <span className='text_type_digits-medium mr-2'>{finalSum}</span>
                        <CurrencyIcon type='primary' />
                        <Button 
                            extraClass='ml-10 mr-4'
                            htmlType='submit'
                            onClick={createNewOrder}
                            disabled={bun===null}>
                            <span>Оформить заказ</span>
                        </Button>
                    </div>
                    {state.orderDetailsVisible && (
                        <Modal onClose={closeOrderDetails}>
                            <OrderDetails />
                        </Modal>)}
                </div>
            </div>
        </div>
    );
};
