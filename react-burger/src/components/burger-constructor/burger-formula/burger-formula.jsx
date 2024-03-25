import React from 'react';
import { CurrencyIcon, ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './burger-formula.module.css';
import IngridientDetails from '../../ingridient-details/ingridient-details';
import OrderDetails from '../../order-details/order-details';
import PropTypes from 'prop-types';
import { IngridientPropTypes } from '../../../utils/shared-prop-types';
 
export default function BurgerFormula({ ingridientList }) {

    const [state, setState] = React.useState({
        sum: 0,
        ingridientDetailsVisible: false,
        orderDetailsVisible: false,
        currentIngridient: undefined,
        bun: undefined,
        otherIngridients: []
    });
    
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
        
            const newData = ingridientList.map(x => x).filter(x => ids.includes(x._id));
        
        const currentBun = newData.find(x => x.type === "bun");
        const currentOtherIngridients = newData.filter(x => x.type !== 'bun');
        let currentSum = currentBun.price * 2;
        
        state.otherIngridients.forEach(x => { currentSum += x.price });
        
        setState({
            ...state,
            bun: currentBun,
            otherIngridients: currentOtherIngridients,
            sum: currentSum
        });
        },
        []
    );

    const openIngridientDetails = (ingridient) => {
        if (!state.ingridientDetailsVisible) {
            setState({
                ...state,
                ingridientDetailsVisible: true,
                currentIngridient: {
                    ...state.currentIngridient,
                    name: ingridient.name,
                    image: ingridient.image_large,
                    proteins: ingridient.proteins,
                    fat: ingridient.fat,
                    carbohydrates: ingridient.carbohydrates,
                    calories: ingridient.calories
                }
            });
        }
    };

    const closeIngridientDetails = () => {
        if (state.ingridientDetailsVisible){
            setState({
                ...state,
                ingridientDetailsVisible: false,
                currentIngridient: undefined
            });
        }
    };

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
            <div className={styles.ingridientListContainer}>
                {state.otherIngridients.map((ingridient) =>
                    <ElementListItem
                        key={ingridient._id}
                        ingridient={ingridient}
                        onShowDetailsClick={openIngridientDetails} />
                )}
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
            <div className={styles.modalContainer} id='igridient-details-modal'>
                    {state.ingridientDetailsVisible && <IngridientDetails
                        modalContainerId='igridient-details-modal'
                        name={state.currentIngridient.name}
                        imageSrc={state.currentIngridient.image}
                        calories={state.currentIngridient.calories}
                        proteins={state.currentIngridient.proteins}
                        fat={state.currentIngridient.fat}
                        carbohydrates={state.currentIngridient.carbohydrates}
                        onClose={closeIngridientDetails} />}
            </div>
            <div className={styles.modalContainer} id='order-details-modal'>
                    {state.orderDetailsVisible && <OrderDetails
                        modalContainerId='order-details-modal'
                        onClose={closeOrderDetails} />}
            </div>
        </div>
    );
}

BurgerFormula.propTypes = {
    ingridientList: PropTypes.arrayOf(IngridientPropTypes).isRequired
}; 

const ElementListItem = ({ ingridient, onShowDetailsClick }) => {
    const handleClick = () => onShowDetailsClick(ingridient);
    return (
        <div className={styles.elementListItem}>
            <div onClick={handleClick}><DragIcon/></div>
            <ConstructorElement
                text={ingridient.name}
                thumbnail={ingridient.image_mobile}
                price={ingridient.price}
                extraClass='mb-4 ml-2'
            />
        </div>
    )
};

ElementListItem.propTypes = {
    ingridient: IngridientPropTypes.isRequired,
    onShowDetailsClick: PropTypes.func.isRequired
};