import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { FC } from 'react';

export const FakeConstructorElement : FC<{
    text: string,
    extraClass?: string
}> = ({ text, extraClass }) => {
    return (
        <div className={`constructor-element ml-8 mb-4 mr-1 ${extraClass}`}>
            <span className="constructor-element__text mt-4" style={{fontSize: 'larger'}}>{text}</span>
        </div>
    );
}