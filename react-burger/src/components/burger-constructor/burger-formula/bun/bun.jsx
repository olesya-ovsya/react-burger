import { useSelector, useDispatch } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import FakeConstructorElement from '../fake-constructor-element/fake-constructor-element';
import PropTypes from 'prop-types';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '../../../../index.css';

export default function Bun({ type, isHover }) {

    const bun = useSelector(store => store.burgerFormula.bun);

    return (
        <div>
            {bun
                ? <ConstructorElement
                    type={type}
                    isLocked={true}
                    text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    extraClass='ml-8 mb-4 mr-1' />
                : <FakeConstructorElement 
                        text='Выберите булки'
                        extraClass={`constructor-element_pos_${type} ${isHover ? 'on-hover': ''}`} />}
        </div>
    )
}

Bun.propTypes = {
    type: PropTypes.string.isRequired,
    isHover: PropTypes.bool.isRequired
};