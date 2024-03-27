import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

export default function App() {

  const URL = "https://norma.nomoreparties.space/api/ingredients/";

  const initialIngredientsValue = [
    {
      _id:"",
      name:"",
      type:"",
      proteins:-1,
      fat:-1,
      carbohydrates:-1,
      calories:-1,
      price:-1,
      image:"",
      image_mobile:"",
      image_large:"",
      __v:0
    }
  ];

  const [state, setState] = React.useState({
    ingredients: initialIngredientsValue,
    loading: true,
    hasError: false
  });

  React.useEffect(() => {
      fetch(URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(`Ошибка ${response.status}`);
        })
        .then((model) => {
            if (model && model.success) {
              setState({ ...state, ingredients: model.data, loading: false });
            } else {
              throw new Error('Failed to receive data from the server. In the response model "success":false');
            }
          })
        .catch(e => setState({ ...state, loading: false, hasError: true }));
    },
    []
  );
  
  return (
    <div className={styles.app}>
      <AppHeader />
        <main className={styles.appMain}>
          {state.ingredients.length > 1 && <BurgerIngredients ingredients={state.ingredients} />}
          {state.ingredients.length > 1 && <BurgerConstructor ingredients={state.ingredients} />}
        </main>
    </div>
  );
}
