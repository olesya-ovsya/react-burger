import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { useLocation } from "react-router-dom";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import { wsOrdersConnectionStart } from "../../services/actions/ws-orders";
import { getAccessToken } from "../../utils/utils";
import { Loader } from "../loader/loader";
import styles from './user-orders.module.css';
import { OrderCard } from "../order-card/order-card";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "../message/message";

export const UserOrders: FC = () => {

    const dispatch = useDispatch();
    const { wsConnected, orders, error } = useSelector(store => store.wsOrders);
    const location = useLocation();

    useEffect(() => {
        console.log('connect')
        const accessToken = getAccessToken();
        dispatch(getBurgerIngredients());
        dispatch(wsOrdersConnectionStart(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    }, [dispatch]);

    if (!wsConnected) {
        return (<Loader text='Загружаем данные...' />);
    }

    return (
        <div key={uuidv4()}>
            {orders && orders.length > 0 && <div className={styles.orders}>
                {orders.map(x => (
                    <OrderCard key={x._id}
                        order={x}
                        location={location}
                        page={'profile/orders'}
                        showStatus={true} />
                ))}
            </div>}
            {!orders && <Message text='Не удалось загрузить заказы' type='error' />}    
        </div>
    );
}