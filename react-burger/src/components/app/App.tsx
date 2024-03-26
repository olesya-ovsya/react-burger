import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';

export default function App() {

  const URL = "https://norma.nomoreparties.space/api/ingredients/";

  const initialIngridientsValue = [
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
    ingridients: initialIngridientsValue,
    loading: true,
    hasError: false
  });

  React.useEffect(() => {
      fetch(URL)
        .then((response) => response.json())
        .then((model) => 
          {
            if (model && model.success) {
              setState({ ...state, ingridients: model.data, loading: false });
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
          {state.ingridients.length > 1 && <BurgerIngridients ingridients={state.ingridients} />}
          {state.ingridients.length > 1 && <BurgerConstructor ingridients={state.ingridients} />}
        </main>
    </div>
  );
}
