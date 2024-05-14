import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT, ADD_INGREDIENT, MOVE_INGREDIENT } from '../../../../services/actions/burger-formula';
import { FakeConstructorElement } from '../fake-constructor-element/fake-constructor-element';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './other-ingredients.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import '../../../../index.css';
import { IApiIngredient, IIngredient } from '../../../../utils/shared-prop-types';
import { FC } from 'react';

export default function OtherIngredients() {

    // @ts-ignore
    const otherIngredients = useSelector(store => store.burgerFormula.otherIngredients);

    const dispatch = useDispatch();

    const removeIngredient = (ingredientIdentity: string) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            identity: ingredientIdentity
        });
    }

    const addIngredient = (newIngredient: IApiIngredient) => {
        dispatch({
          type: ADD_INGREDIENT,
          newIngredient: { ...newIngredient, identity: uuidv4()}
        });
      };

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'otherIngredient',
        collect: monitor => ({
          isHover: monitor.isOver()
        }),
        drop(item: any) {
          addIngredient(item.ingredient);
        },
    });

    return (
        <div ref={dropTarget}>
            {otherIngredients && otherIngredients.length > 0 
            ?   <div className={styles.ingredientListContainer}>
                    {otherIngredients.map((ingredient: IIngredient, index: number) =>
                        <OtherIngredient 
                            key={ingredient.identity}
                            index={index}
                            ingredient={ingredient}
                            removeIngredient={removeIngredient}/>)}
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

    // @ts-ignore
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

    const [, drop] = useDrop({
        accept: 'constructorElement',
        hover(item: any, monitor) {
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
            dispatch({
                type: MOVE_INGREDIENT,
                fromIndex: dragIndex,
                toIndex: hoverIndex
            });
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