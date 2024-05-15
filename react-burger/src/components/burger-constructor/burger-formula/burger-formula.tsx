import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { useDispatch } from 'react-redux';
import { SET_BUN } from '../../../services/actions/burger-formula';
import { useDrop } from 'react-dnd';
import { Bun } from './bun/bun';
import OtherIngredients from './other-ingredients/other-ingredients';
import { IIngredient } from '../../../utils/shared-prop-types';
import { FC } from 'react';
 
export const BurgerFormula: FC = () => {

    const dispatch = useDispatch();

    const [{ isHoverBun }, dropTargetBun] = useDrop<
        { ingredient: IIngredient; index: number; },
        unknown,
        { isHoverBun: boolean }>({
        accept: 'bun',
        collect: monitor => ({
          isHoverBun: monitor.isOver()
        }),
        drop(item) {
          setBun(item.ingredient);
        },
    });

    const setBun = (newBun: IIngredient) => {
        dispatch({
            type: SET_BUN,
            bun: newBun
        })
    };

    return (
        <div ref={dropTargetBun}>
            <Bun type='top' isHover={isHoverBun} />
            <OtherIngredients />
            <Bun type='bottom' isHover={isHoverBun} />
        </div>
    );
}