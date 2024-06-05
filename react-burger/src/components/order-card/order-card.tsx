import { FC, useMemo } from "react";
import { ILocation, IOrderData } from "../../utils/shared-prop-types";
import { useSelector } from "../../services/hooks";
import { Link } from "react-router-dom";
import styles from './order-card.module.css';
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderStatusText } from "../order-status-text/order-status-text";

interface IOrderCard {
    order: IOrderData,
    location: ILocation,
    page: 'profile/orders' | 'feed',
    showStatus?: boolean
}

export const OrderCard: FC<IOrderCard> = ({ order, location, page, showStatus }) => {
    const { ingredients } = useSelector(store => store.burgerIngredients);

    const sum = useMemo(() => {
        let currentSum = 0;
        ingredients
            .filter(x => order.ingredients.includes(x._id))
            .forEach((x) => { currentSum += x.price });

        return currentSum;
    }, [ingredients, order.ingredients]);

    return (
        <Link to={`/${page}/${order.number}`} state={{ background: location }}>
        <div className={`${styles.order} p-6 mb-4`}>
            <div className={`${styles.commonDataContainer} mb-6`}>
                <p className='text_type_digits-default' style={{margin: 0}}>#{order.number}</p>
                <FormattedDate date={new Date(order.createdAt)}
                    className='text_type_main-default text_color_inactive' />
            </div>
            <p className={`${styles.name} text_type_main-medium mb-6`}>{order.name}</p>
            <OrderStatusText status={order.status} />
            <div className={`${styles.formula} mb-6`}>
                <div className={styles.ingredientImages}>
                    {order.ingredients.reverse().slice(0, 6).map((i, index) => (
                        <div key={index} className={styles.ingredientImageBox}>
                            {index === 0 && order.ingredients.length > 6 &&
                            <div className={`${styles.hidden} text_type_digits-default`}>
                                {order.ingredients.slice(6).length}+
                            </div>}
                            <img src={ingredients.find(y => y._id === i)?.image}
                                className={styles.ingredientImage}
                                alt='Ингредиент' />
                        </div>
                    ))}
                </div>
                <div>
                    <CurrencyIcon type='primary' />
                    <span className='text_type_digits-medium ml-2'>{sum}</span>
                </div>
            </div>
        </div>
        </Link>
    );
}