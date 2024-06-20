import { useSelector } from "../../../../services/hooks";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FakeConstructorElement } from '../fake-constructor-element/fake-constructor-element';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '../../../../index.css';
import { FC } from "react";

export const Bun : FC<{
    type: 'top' | 'bottom' | undefined;
    isHover: boolean
}> = ({ type, isHover }) => {

    const bun = useSelector(store => store.burgerFormula.bun);

    return (
        <div id={`constructor-area-${type}`}>
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