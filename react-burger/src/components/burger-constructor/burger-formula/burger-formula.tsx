import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { useDispatch } from '../../../services/hooks';
import { useDrop } from 'react-dnd';
import { Bun } from './bun/bun';
import OtherIngredients from './other-ingredients/other-ingredients';
import { IIngredient } from '../../../utils/shared-prop-types';
import { FC } from 'react';
import { setBun } from '../../../services/actions/burger-formula';
 
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
          setNewBun(item.ingredient);
        },
    });

    const setNewBun = (newBun: IIngredient) => {
        dispatch(setBun(newBun));
    };

    return (
        <div ref={dropTargetBun}>
            <Bun type='top' isHover={isHoverBun} />
            <OtherIngredients />
            <Bun type='bottom' isHover={isHoverBun} />
        </div>
    );
}