import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import { IngredientTabs } from './ingredient-tabs/ingredient-tabs';
import { IngredientList } from './ingredient-list/ingredient-list';
import { FC } from 'react';
import { ITab } from '../../utils/shared-prop-types';

interface IBurgerIngredientsState {
    currentTab: number,
    tabs: Array<ITab>
} 

export const BurgerIngredients: FC = () => {

    const refTabBun = React.useRef<HTMLDivElement>(null);
    const refTabSauce = React.useRef<HTMLDivElement>(null);
    const refTabMain = React.useRef<HTMLDivElement>(null);
    const refTabsContainer = React.useRef<HTMLDivElement>(null);

    const [state, setState] = React.useState<IBurgerIngredientsState>({
        currentTab: 1,
        tabs: [
            { id: 1, name: 'Булки', type: 'bun', ref: refTabBun },
            { id: 2, name: 'Соусы', type: 'sauce', ref: refTabSauce },
            { id: 3, name: 'Начинки', type: 'main', ref: refTabMain },
        ]
    });

    const handleScroll = () => {
        const tabsContainerBoundingRect: DOMRect | undefined = refTabsContainer?.current?.getBoundingClientRect();
        const tabBunBoundingRect: DOMRect | undefined = refTabBun?.current?.getBoundingClientRect();
        const tabMainBoundingRect: DOMRect | undefined = refTabMain?.current?.getBoundingClientRect();
        const tabSauceBoundingRect: DOMRect | undefined = refTabSauce?.current?.getBoundingClientRect();

        const differences = [
            {id: 1, diff: Math.abs(tabsContainerBoundingRect!.bottom - tabBunBoundingRect!.top)},
            {id: 2, diff: Math.abs(tabsContainerBoundingRect!.bottom - tabSauceBoundingRect!.top)},
            {id: 3, diff: Math.abs(tabsContainerBoundingRect!.bottom - tabMainBoundingRect!.top)}
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