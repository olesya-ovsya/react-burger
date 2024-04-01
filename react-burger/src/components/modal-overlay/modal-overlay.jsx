import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({ children, onClose }) {

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};