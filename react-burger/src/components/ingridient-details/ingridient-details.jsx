import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import styles from './ingridient-details.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import NutritionElement from "./nutrition-element/nutrition-element";
import PropTypes from 'prop-types';

export default function IngridientDetails(
    {
        modalContainerId,
        name,
        imageSrc,
        calories,
        proteins,
        fat,
        carbohydrates,
        onClose
    }) 
    {

    return (
        <>
            <ModalOverlay onClose={onClose}/>
            <Modal header='Детали ингридиента' modalContainerId={modalContainerId} onClose={onClose}>
                <img src={imageSrc} className={`${styles.detailImage} mb-4`} />
                <p className={`text_type_main-medium mt-4 mb-8 ${styles.detailIngridientName}`}>
                    {name}
                </p>
                <NutritionElement
                    calories={calories}
                    proteins={proteins}
                    fat={fat}
                    carbohydrates={carbohydrates} />
            </Modal>
        </>
    );
}

IngridientDetails.propTypes = {
    modalContainerId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};