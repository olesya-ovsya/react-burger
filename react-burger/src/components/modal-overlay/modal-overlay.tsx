import styles from './modal-overlay.module.css';
import { FC, PropsWithChildren } from 'react';

interface IModalOverlayProps {
  onClose: () => void
}

export const ModalOverlay: FC<PropsWithChildren<IModalOverlayProps>> = ({ children, onClose }) => {

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {children}
    </div>
  );
}