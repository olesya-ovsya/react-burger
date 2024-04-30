import styles from './message.module.css';
import PropTypes from 'prop-types';
import '../../index.css';

export const Message = ({ text, type }) => {
    return (
        <div className={`${styles.container} ${styles[type]} mt-10`}>
            <p className='text_type_main-default pr-5 pl-5'>{text}</p>
        </div>
    );
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};