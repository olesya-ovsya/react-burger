import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsFeedConnectionStart } from '../../services/actions/ws-feed';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { IOrderData } from '../../utils/shared-prop-types';
import { Loader } from '../../components/loader/loader';
import { v4 as uuidv4 } from 'uuid';
import styles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';

export const FeedPage: FC = () => {

    const dispatch = useDispatch();

    const { allOrders, wsConnected, total, totalToday } = useSelector(store => store.wsFeed);

    useEffect(() => {
        console.log('create ws feed connection');
        dispatch(getBurgerIngredients);
        dispatch(wsFeedConnectionStart(`wss://norma.nomoreparties.space/orders/all`));
    }, [dispatch]);

    useEffect(() => {
        console.log(allOrders);
    }, [allOrders]);

    if (!wsConnected) {
        return (<Loader text='Загружаем данные...' />);
    }

    return (
        <main className={styles.main}>
            <div className={`${styles.feedContainer}`}>
                <div>
                    <h1 className='text_type_main-large mr-2' style={{textAlign: 'start'}}>Лента заказов</h1>
                    <div className={`${styles.feed} pr-2 pl-2`}>
                        {allOrders.map((x) => (
                            <FeedElement order={x} key={x._id} />
                        ))}
                    </div>
                </div>
                <div className={`${styles.info} ml-15 mt-15`}>
                    <div className={styles.statusContainer}>
                        <div className={styles.status}>
                            <p className='text_type_main-medium'>Готовы:</p>
                            <div className={styles.statusScroll}>
                                {allOrders.filter(x => x.status === 'done').map((x) => (
                                    <p className='text_type_digits-default text_color_success mb-2 mr-4'
                                        key={uuidv4()}
                                        style={{marginTop:0}}
                                        >{x.number}</p>
                                ))}
                            </div>
                        </div>
                        <div className={`${styles.status} ml-9`}>
                            <p className='text_type_main-medium'>В работе:</p>
                            <div className={styles.statusScroll}>
                                {allOrders.filter(x => x.status === 'pending').map((x) => (
                                    <p className='text_type_digits-default mb-2 mr-4'
                                        key={uuidv4()}
                                        style={{marginTop:0}}
                                        >{x.number}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.total} mt-15`}>
                        <span className='text_type_main-medium'>Выполнено за всё время:</span>
                        <span className=' text_type_digits-large shadow-text'>{total}</span>
                    </div>
                    <div className={`${styles.total} mt-15`}>
                        <span className='text_type_main-medium'>Выполнено за сегодня:</span>
                        <span className=' text_type_digits-large shadow-text'>{totalToday}</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

interface IFeedElement {
    order: IOrderData
}

const FeedElement: FC<IFeedElement> = ({ order }) => {

    const { ingredients } = useSelector(store => store.burgerIngredients);

    const sum = useMemo(() => {

        let currentSum = 0;

        ingredients
            .filter(x => order.ingredients.includes(x._id))
            .forEach((x) => { currentSum += x.price });

        return currentSum;
    }, [ingredients]);

    return (
        <div className={`${styles.feedElement} p-6 mb-4`}>
            <div className={`${styles.feedElementCommonDataContainer} mb-6`}>
                <p className='text_type_digits-default' style={{margin: 0}}>#{order.number}</p>
                <FormattedDate date={new Date(order.createdAt)}
                    className='text_type_main-default text_color_inactive' />
            </div>
            <p className={`${styles.orderName} text_type_main-medium mb-6`}>{order.name}</p>
            <div className={`${styles.formula} mb-6`}>
                <div className={styles.ingredientImages}>
                    {order.ingredients.reverse().slice(0, 6).map((i, index) => (
                        <div className={styles.ingredientImageBox}>
                            {index === 0 && order.ingredients.length > 6 &&
                            <div className={`${styles.hidden} text_type_digits-default`}>
                                {order.ingredients.slice(6).length}+
                            </div>}
                            <img key={uuidv4()}
                                src={ingredients.find(y => y._id === i)?.image}
                                className={styles.ingredientImage} />
                        </div>
                    ))}
                </div>
                <div>
                    <CurrencyIcon type='primary' />
                    <span className='text_type_digits-medium ml-2'>{sum}</span>
                </div>
            </div>
        </div>
    );
}