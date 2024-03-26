import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';


export default function Modal({ children, header, modalContainerId, onClose }) {
    
    React.useEffect(() =>
    {
        document.addEventListener("keydown", handleClick);

        return () => {
            document.removeEventListener("keydown", handleClick);
          }
    });

    const handleClick = (e) => {
        if (e.code === "Escape") {
          onClose();
        }
    };

    const modalRoot = document.getElementById(modalContainerId);
    return modalRoot
        ?  ReactDOM.createPortal(
                (
                    <>
                        <ModalOverlay onClose={onClose} />
                        <div className={styles.modal}>
                            <div className={styles.modalHeader + ' mr-10 ml-10'}>
                                <h1 className='text_type_main-large mr-10 ml-10'>{header}</h1>
                                <div onClick={onClose}><CloseIcon /></div>
                            </div>
                            {children}
                        </div>
                    </>
                ), 
                modalRoot
            )
        : null;
}

Modal.propTypes = {
    children: PropTypes.node,
    header: PropTypes.string,
    modalContainerId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};