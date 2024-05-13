import styles from './loader.module.css';
import PropTypes from 'prop-types';

export const Loader = ({ text }) => {

    return (
        <div className={`${styles.container}`}>
            <div
                className={styles.loader}
                data-text={text}>
            </div>
        </div>
    );
};

Loader.propTypes = {
    text: PropTypes.string
};