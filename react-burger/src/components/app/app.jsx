import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { useDispatch } from 'react-redux';
import { getBurgerIngredients } from '../../services/actions/burgerIngredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export default function App() {

  const dispatch = useDispatch();

  React.useEffect(() => { dispatch(getBurgerIngredients()); }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
        <main className={styles.appMain}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
    </div>
  );
}
