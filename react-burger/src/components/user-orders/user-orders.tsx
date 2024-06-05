import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { useLocation } from "react-router-dom";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import { wsOrdersConnectionClose, wsOrdersConnectionStart } from "../../services/actions/ws-orders";
import { getAccessToken } from "../../utils/utils";
import { Loader } from "../loader/loader";
import styles from './user-orders.module.css';
import { OrderCard } from "../order-card/order-card";
import { Message } from "../message/message";

export const UserOrders: FC = () => {

    const dispatch = useDispatch();
    const { wsConnected, orders, error } = useSelector(store => store.wsOrders);
    const ingredients = useSelector(store => store.burgerIngredients.ingredients);
    const location = useLocation();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const accessToken = getAccessToken();
        dispatch(getBurgerIngredients());
        if (!wsConnected) {
            dispatch(wsOrdersConnectionStart(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
        }
    
        return () => {
            if (wsConnected) {
                dispatch(wsOrdersConnectionClose());
            }
        }
    }, [wsConnected, dispatch]);

    useEffect(() => {
        if (wsConnected && ingredients.length > 0) {
            setLoading(false);
        }
    }, [wsConnected, ingredients]);

    if (isLoading) {
        return (<Loader text='Загружаем данные...' />);
    }

    return (
        <div className='mt-10'>
            {orders && orders.length > 0 && <div className={styles.orders}>
                {(orders.sort((a, b) => new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1)).map(x => (
                    <OrderCard key={x._id}
                        order={x}
                        location={location}
                        page={'profile/orders'}
                        showStatus={true} />
                ))}
            </div>}
            {error && <Message text='Не удалось загрузить заказы' type='error' />}    
        </div>
    );
}