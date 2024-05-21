import React from 'react';
import styles from './home.module.css';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { useDispatch } from 'react-redux';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { FC } from 'react';

export const HomePage: FC = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
      // @ts-ignore
      dispatch(getBurgerIngredients());
    }, [dispatch]);

    return (
      <main className={styles.appMain}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    )
}