import styles from './not-found.module.css';

export default function NotFoundPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>404 Not Found</h1>
                    <p>Запрашиваемая страница не существует</p>
                </div>
            </div>
        </div>
    );
}