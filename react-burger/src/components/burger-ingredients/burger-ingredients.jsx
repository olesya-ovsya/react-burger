import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import IngredientTabs from './ingredient-tabs/ingredient-tabs';
import IngredientList from './ingredient-list/ingredient-list';

export default function BurgerIngredients () {

    const [state, setState] = React.useState({
        currentTab: 1,
        tabs: [
            { id: 1, name: 'Булки', type: 'bun' },
            { id: 2, name: 'Соусы', type: 'sauce' },
            { id: 3, name: 'Основное', type: 'main' },
        ]
    });

    return(
        <div className={`${styles.box} mr-10`}>
            <div className={styles.burgerIngredients}>
                <h1 className={`${styles.header} text_type_main-large mt-10`}>Соберите бургер</h1>
                { state.tabs.length > 0 && <IngredientTabs tabData={state.tabs} /> }
                { state.tabs.length > 0 && <IngredientList tabData={state.tabs} />}
            </div>
        </div>
    );
};