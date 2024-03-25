import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './order-details.module.css';
import orderAcceptedImage from '../../images/order-accepted-img.jpg';
import PropTypes from 'prop-types';

export default function OrderDetails({ modalContainerId, onClose }) 
{
    return (
        <>
            <ModalOverlay onClose={onClose}/>
            <Modal header=' ' modalContainerId={modalContainerId} onClose={onClose}>
                <div className={styles.orderDetailsContainer}>
                    <p className={`text_type_digits-large mt-30 mb-8 ${styles.shadowText} `}>034536</p>
                    <p className='text_type_main-medium mb-15 mt-1'>идентификатор заказа</p>
                    <img width='120px' height='120px' src={orderAcceptedImage} />
                    <p className='text_type_main-default mt-15 mb-1'>Ваш  заказ начали готовить</p>
                    <p className='text_type_main-default text_color_inactive mt-1 mb-30'>Дождитесь готовности на орбитальной станции</p>
                </div>
            </Modal>
        </>
    );
}

OrderDetails.propTypes = {
    modalContainerId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};