import styles from './loader.module.css';
import { FC } from 'react';

export const Loader: FC<{ text: string }> = ({ text }) => {

    return (
        <div className={`${styles.container}`}>
            <div
                className={styles.loader}
                data-text={text}>
            </div>
        </div>
    );
};