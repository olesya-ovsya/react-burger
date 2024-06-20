import React from 'react';
import { useSelector, useDispatch } from '../../../../services/hooks';
import { FakeConstructorElement } from '../fake-constructor-element/fake-constructor-element';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './other-ingredients.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import '../../../../index.css';
import { IApiIngredient, IIngredient } from '../../../../utils/shared-prop-types';
import { FC } from 'react';
import { addIngredient, removeIngredient, moveIngredient } from '../../../../services/actions/burger-formula';

export default function OtherIngredients() {

    const otherIngredients = useSelector(store => store.burgerFormula.otherIngredients);

    const dispatch = useDispatch();

    const removeOtherIngredient = (identity: string) => {
        dispatch(removeIngredient(identity));
    }

    const addNewIngredient = (newIngredient: IApiIngredient) => {
      dispatch(addIngredient({ ...newIngredient, identity: uuidv4()}));
    };

    const [{ isHover }, dropTarget] = useDrop<
      { ingredient: IIngredient; index: number; },
      unknown,
      { isHover: boolean }>({
        accept: 'otherIngredient',
        collect: monitor => ({
          isHover: monitor.isOver()
        }),
        drop(item) {
          addNewIngredient(item.ingredient);
        },
    });

    return (
        <div id='constructor-area-middle' ref={dropTarget}>
            {otherIngredients && otherIngredients.length > 0 
            ?   <div className={styles.ingredientListContainer}>
                    {otherIngredients.map((ingredient: IIngredient, index: number) =>
                        <OtherIngredient 
                            key={ingredient.identity}
                            index={index}
                            ingredient={ingredient}
                            removeIngredient={removeOtherIngredient}/>)}
                </div>
            : <FakeConstructorElement
                text='Выберите начинку'
                extraClass={isHover ? 'on-hover' : ''} />}
        </div>
    );
}

const OtherIngredient : FC<{
  ingredient: IIngredient,
  index: number,
  removeIngredient: (ingredientIdentity: string) => void 
  }> = ({ ingredient, index, removeIngredient }) => {
    const handleClickRemove = () => removeIngredient(ingredient.identity);

    const dispatch = useDispatch();

    const otherIngredients = useSelector(store => store.burgerFormula.otherIngredients);

    const [{ isDragging }, drag] = useDrag({
        type: 'constructorElement',
        item: { index },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop<{ ingredient: IIngredient; index: number; }>({
        accept: 'constructorElement',
        hover(item, monitor) {
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) {
            return;
          }

          const hoverBoundingRect = ref.current.getBoundingClientRect()
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset === null ? -1 : clientOffset.y - hoverBoundingRect.top;
          
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          moveElement(dragIndex, hoverIndex);
          item.index = hoverIndex;
        },
    });

    type moveElementCallback = (dragIndex: number, hoverIndex: number) => void;
    const moveElement = React.useCallback<moveElementCallback>(
        (dragIndex, hoverIndex) => {
          dispatch(moveIngredient(dragIndex, hoverIndex));
        },
        [otherIngredients],
    );

    drag(drop(ref));

    return (
        <div className={styles.elementListItem} style={{opacity}} ref={ref}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image_mobile}
                price={ingredient.price}
                extraClass='mb-4 ml-2'
                handleClose={handleClickRemove}/>
        </div>
    )
};