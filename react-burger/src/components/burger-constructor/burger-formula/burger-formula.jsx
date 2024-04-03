import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { useDispatch } from 'react-redux';
import { SET_BUN } from '../../../services/actions/burgerFormula';
import { useDrop } from 'react-dnd';
import Bun from './bun/bun';
import OtherIngredients from './other-ingredients/other-ingredients';
 
export default function BurgerFormula() {

    const dispatch = useDispatch();

    const [{ isHoverBun }, dropTargetBun] = useDrop({
        accept: 'bun',
        collect: monitor => ({
          isHoverBun: monitor.isOver()
        }),
        drop(item) {
          setBun(item.ingredient);
        },
    });

    const setBun = (newBun) => {
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