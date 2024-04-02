import React from 'react';
import { CurrencyIcon, ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './burger-formula.module.css';
import OrderDetails from '../../order-details/order-details';
import Modal from '../../modal/modal';
import { useSelector } from 'react-redux';
 
export default function BurgerFormula() {

    const [state, setState] = React.useState({
        sum: 0,
        orderDetailsVisible: false,
        bun: undefined,
        otherIngredients: []
    });

    const ingredientList = useSelector(store => store.ingredients.ingredients); 
    
    React.useEffect(() => {
        const ids = [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa094a'];
        
            const newData = ingredientList.map(x => x).filter(x => ids.includes(x._id));
        
        const currentBun = newData.find(x => x.type === "bun");
        const currentOtherIngredients = newData.filter(x => x.type !== 'bun');
        let currentSum = currentBun.price * 2;
        
        state.otherIngredients.forEach(x => { currentSum += x.price });
        
        setState({
            ...state,
            bun: currentBun,
            otherIngredients: currentOtherIngredients,
            sum: currentSum
        });
        },
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
            {state.bun
                && <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${state.bun.name} (верх)`}
                    thumbnail={state.bun.image_mobile}
                    price={state.bun.price}
                    extraClass='ml-8 mb-4 mr-1' />}
            <div className={styles.ingredientListContainer}>
                {state.otherIngredients.map((ingredient) =>
                    <div key={ingredient._id} className={styles.elementListItem}>
                        <DragIcon/>
                        <ConstructorElement
                            text={ingredient.name}
                            thumbnail={ingredient.image_mobile}
                            price={ingredient.price}
                            extraClass='mb-4 ml-2'/>
                    </div>)}
            </div>
            {state.bun && <ConstructorElement
                text={`${state.bun.name} (низ)`}
                type='bottom'
                isLocked={true}
                thumbnail={state.bun.image_mobile}
                price={state.bun.price}
                extraClass='ml-8 mb-4 mr-1' />}
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