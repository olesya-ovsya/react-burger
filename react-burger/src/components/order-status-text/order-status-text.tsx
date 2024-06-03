import { FC } from "react";
import styles from './order-status-text.module.css';

export const OrderStatusText: FC<{ status: string }> = ({ status }) => {
    switch(status) {
        case 'done':
            return <span className={`text_type_main-default ${styles.text} text_color_success`}>Выполнен</span>;
        case 'pending':
            return <span className={`text_type_main-default ${styles.text} text_color_accent`}>Готовится</span>;
        case 'canceled':
            return <span className={`text_type_main-default ${styles.text} text_color_error`}>Отменен</span>;
        case 'created':
            return <span className={`text_type_main-default ${styles.text}`}>Создан</span>;
        default:
            return <span className={`text_type_main-default ${styles.text}`}>Статус неизвестен</span>;
    }
}