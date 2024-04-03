import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT, ADD_INGREDIENT, MOVE_INGREDIENT } from '../../../../services/actions/burger-formula';
import FakeConstructorElement from '../fake-constructor-element/fake-constructor-element';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './other-ingredients.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import '../../../../index.css';
import PropTypes from 'prop-types';
import { IngredientWitIdentityPropTypes } from '../../../../utils/shared-prop-types';

export default function OtherIngredients() {

    const otherIngredients = useSelector(store => store.burgerFormula.otherIngredients);

    const dispatch = useDispatch();

    const removeIngredient = (ingredientIdentity) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            identity: ingredientIdentity
        });
    }

    const addIngredient = (newIngredient) => {
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
        drop(item) {
          addIngredient(item.ingredient);
        },
    });

    return (
        <div ref={dropTarget}>
            {otherIngredients && otherIngredients.length > 0 
            ?   <div className={styles.ingredientListContainer}>
                    {otherIngredients.map((ingredient, index) =>
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

const OtherIngredient = ({ ingredient, index, removeIngredient }) => {
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

    const ref = React.useRef(null);

    const [, drop] = useDrop({
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
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          
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

    const moveElement = React.useCallback(
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
            <DragIcon/>
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image_mobile}
                price={ingredient.price}
                extraClass='mb-4 ml-2'
                handleClose={handleClickRemove}/>
        </div>
    )
};

OtherIngredient.propTypes = {
  ingridient: IngredientWitIdentityPropTypes,
  index: PropTypes.number.isRequired,
  removeIngredient: PropTypes.func.isRequired
};