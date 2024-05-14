import React, { SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { FC, PropsWithChildren } from 'react';

interface IModalProps {
    header?: string,
    onClose: () => void
}

export const Modal: FC<PropsWithChildren<IModalProps>> = ({ children, header, onClose }) => {
    
    React.useEffect(() => {
        const handleClick = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
              onClose();
            }
        }

        document.addEventListener("keydown", handleClick);

        return () => {
            document.removeEventListener("keydown", handleClick);
          }
    },
    []);

    const modalRoot = document.getElementById("modals");
    return modalRoot
        ?  ReactDOM.createPortal(
                (
                    <>
                        <ModalOverlay onClose={onClose} />
                        <div className={styles.modal}>
                            <div className={styles.modalHeader + ' mr-10 ml-10'}>
                                <h1 className='text_type_main-large mr-10 ml-10'>{header}</h1>
                                <div onClick={onClose}><CloseIcon  type='primary' /></div>
                            </div>
                            {children}
                        </div>
                    </>
                ), 
                modalRoot
            )
        : null;
}