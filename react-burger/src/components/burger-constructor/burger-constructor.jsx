import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './burger-constructor.module.css';
import BurgerFormula from './burger-formula/burger-formula';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import React from 'react';
import { useSelector } from 'react-redux';

export default function BurgerConstructor() {

    const [state, setState] = React.useState({
        orderDetailsVisible: false
    });

    const { bun, otherIngredients } = useSelector(store => store.burgerFormula);

    const finalSum = React.useMemo(
        () => {
            let currentSum = 0;

            if (bun && bun !== null) {
                currentSum = bun.price * 2;
            }

            if (otherIngredients && otherIngredients.length > 0) {
                otherIngredients.forEach(x => { currentSum += x.price });
            }

            return currentSum;
        },
        [bun, otherIngredients]
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

    return(
        <div className={styles.constructorContainer}>
            <div className={styles.constructor}>
                <div className='mt-25 ml-4'>
                    <BurgerFormula />
                    <div className={`${styles.bottom} mt-10`}>
                        <span className='text_type_digits-medium mr-2'>{finalSum}</span>
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
            </div>
        </div>
    );
};
