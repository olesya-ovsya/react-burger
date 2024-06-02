import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './order-status.module.css';
import orderAcceptedImage from '../../images/order-accepted-img.jpg';
import { useSelector } from '../../services/hooks';
import { Loader } from '../loader/loader';
import { Message } from '../message/message';
import { FC } from 'react';

export const OrderStatus: FC = () =>  {
    const { orderNumber, createOrderRequest, createOrderFailed } = useSelector(store => store.order);
    
    return (
        <div className={styles.orderStatusContainer}>
            {createOrderRequest && (<Loader text='Оформляем заказ...' />)}
            {createOrderFailed && <Message type='error' text='Не удалось оформить заказ' />}
            {orderNumber && !createOrderFailed
                && <>
                    <p className={`text_type_digits-large mt-30 mb-8 shadow-text `}>
                        {orderNumber}
                    </p>
                    <p className='text_type_main-medium mb-15 mt-1'>
                        идентификатор заказа
                    </p>
                    <img alt="Заказ принят" width='120px' height='120px' src={orderAcceptedImage} />
                    <p className='text_type_main-default mt-15 mb-1'>
                        Ваш  заказ начали готовить
                    </p>
                    <p className='text_type_main-default text_color_inactive mt-1 mb-30'>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>}
        </div>
    );
}