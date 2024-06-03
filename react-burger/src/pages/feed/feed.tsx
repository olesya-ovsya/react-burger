import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsFeedConnectionStart } from '../../services/actions/ws-feed';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { ILocation, IOrderData } from '../../utils/shared-prop-types';
import { Loader } from '../../components/loader/loader';
import { v4 as uuidv4 } from 'uuid';
import styles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { Link, useLocation } from 'react-router-dom';
import { OrderCard } from '../../components/order-card/order-card';

export const FeedPage: FC = () => {

    const dispatch = useDispatch();

    const { allOrders, wsConnected, total, totalToday } = useSelector(store => store.wsFeed);

    const location = useLocation();

    useEffect(() => {
        dispatch(getBurgerIngredients);
        dispatch(wsFeedConnectionStart(`wss://norma.nomoreparties.space/orders/all`));
    }, [dispatch]);

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
                            <OrderCard order={x} key={x._id} location={location} page='feed' />
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