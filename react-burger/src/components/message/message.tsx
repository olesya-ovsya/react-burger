import styles from './message.module.css';
import '../../index.css';
import { FC } from 'react';

interface IMessageProps {
    text: string,
    type: 'info' | 'error' | 'success'
}

export const Message: FC<IMessageProps> = ({ text, type }) => {
    return (
        <div className={`${styles.container} ${styles[type]} mt-10`}>
            <p className='text_type_main-default pr-5 pl-5'>{text}</p>
        </div>
    );
};