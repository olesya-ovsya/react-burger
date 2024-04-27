import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import IngredientTabs from './ingredient-tabs/ingredient-tabs';
import IngredientList from './ingredient-list/ingredient-list';

export default function BurgerIngredients () {

    const refTabBun = React.useRef(null);
    const refTabSauce = React.useRef(null);
    const refTabMain = React.useRef(null);
    const refTabsContainer = React.useRef(null);

    const [state, setState] = React.useState({
        currentTab: 1,
        tabs: [
            { id: 1, name: 'Булки', type: 'bun', ref: refTabBun },
            { id: 2, name: 'Соусы', type: 'sauce', ref: refTabSauce },
            { id: 3, name: 'Начинки', type: 'main', ref: refTabMain },
        ]
    });

    const handleScroll = (e) => {
        const tabsContainerBoundingRect = refTabsContainer.current.getBoundingClientRect();
        const tabBunBoundingRect = refTabBun.current.getBoundingClientRect();
        const tabMainBoundingRect = refTabMain.current.getBoundingClientRect();
        const tabSauceBoundingRect = refTabSauce.current.getBoundingClientRect();

        const differences = [
            {id: 1, diff: Math.abs(tabsContainerBoundingRect.bottom - tabBunBoundingRect.top)},
            {id: 2, diff: Math.abs(tabsContainerBoundingRect.bottom - tabSauceBoundingRect.top)},
            {id: 3, diff: Math.abs(tabsContainerBoundingRect.bottom - tabMainBoundingRect.top)}
        ];

        setState({
            ...state,
            currentTab: differences.sort((a, b) => a.diff - b.diff)[0].id
        });
    }

    return(
        <div className={`${styles.box} mr-10`}>
            <div className={styles.burgerIngredients}>
                <h1 className={`${styles.header} text_type_main-large mt-10`}>Соберите бургер</h1>
                { state.tabs.length > 0 && <IngredientTabs 
                    refTabsContainer={refTabsContainer} 
                    tabData={state.tabs} 
                    currentTab={state.currentTab} /> }
                { state.tabs.length > 0 && <IngredientList tabData={state.tabs} handleScroll={handleScroll} />}
            </div>
        </div>
    );
};