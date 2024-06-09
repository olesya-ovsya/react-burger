import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/actions/order-details";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import { Message } from "../message/message";
import { Loader } from "../loader/loader";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-details.module.css';
import { OrderStatusText } from "../order-status-text/order-status-text";

export const OrderDetails: FC = () => {
    const dispatch = useDispatch();
    const { number } = useParams<string>();
    const { order, getOrderDetailsRequest, getOrderDetailsFailed } = useSelector(store => store.orderDetails);
    const ingredients = useSelector(store => store.burgerIngredients.ingredients);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let orderNumber = parseInt(number ?? '-1');
        dispatch(getOrder(orderNumber));
        dispatch(getBurgerIngredients());
    }, [dispatch, number]);

    useEffect(() => {
        if (order || getOrderDetailsFailed) {
            setLoading(false);
        }
    }, [order, getOrderDetailsFailed])

    if (isLoading || getOrderDetailsRequest) {
        return <Loader text='Загружаем заказ...' />;
    }

    const getSum = () => {

        let currentSum = 0;

        ingredients
            .filter(x => order?.ingredients.includes(x._id))
            .forEach((x) => { currentSum += x.price });

        return currentSum;
    };

    return (
        <div className={`${styles.container}`}>
            {order && (<div className={`${styles.order} ml-10 mr-10`}>
                <span className='text_type_digits-default mt-10'>#{order.number}</span>
                <span className={`text_type_main-medium mt-10 ${styles.text}`}>{order.name}</span>
                <OrderStatusText status={order.status} />
                <span className={`text_type_main-medium mt-15 ${styles.text}`}>Состав:</span>
                <div className={styles.scrollable}>
                    {ingredients.filter(x => order.ingredients.includes(x._id)).map(x => (
                        <div key={x._id} className={`${styles.formulaElement} mt-6 mr-6`}>
                            <div className={`${styles.ingredientImageBox} mr-4`}>
                                <img className={styles.ingredientImage}
                                    src={ingredients.find(y => y._id === x._id)?.image}
                                    alt='Ингредиент' />
                            </div>
                            <span className={`${styles.name} text_type_main-default`}>{x.name}</span>
                            <div className={`${styles.currency} mr-4`}>
                                <span className='text_type_digits-default ml-4 mr-2'>
                                    {order.ingredients.filter(i => i === x._id).length} x {x.price}
                                </span>
                                <CurrencyIcon type='primary' />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${styles.total} mt-10`}>
                    <FormattedDate date={new Date(order.createdAt)} className='text_type_main-default text_color_inactive' />
                    <div className={`${styles.currency} mr-4 mb-20`}>
                        <span className='text_type_digits-default ml-4 mr-2'>{getSum()}</span>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>)}
            {getOrderDetailsFailed &&
                <Message type='error' text='Не удалось получить данные заказа' />}
        </div>);
};