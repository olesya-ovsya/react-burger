import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from '../burger-ingridients/burger-ingridients.module.css';
import IngridientTabs from './ingridient-tabs/ingridient-tabs';
import IngridientList from './ingridient-list/ingridient-list';
import PropTypes from 'prop-types';
import { IngridientPropTypes } from '../../utils/shared-prop-types';

export default function BurgerIngridients ({ ingridients }) {
    const [state, setState] = React.useState({
        ingridients: [],
        currentTab: 1,
        tabs: [
            { id: 1, name: 'Булки', type: 'bun' },
            { id: 2, name: 'Соусы', type: 'sauce' },
            { id: 3, name: 'Основное', type: 'main' },
        ]
    });

    React.useEffect(() => { setState({...state, ingridients: ingridients })}, []);

    return(
        <div className={`${styles.box} mr-10`}>
            <div className={styles.burgerIngridients}>
                <h1 className={`${styles.header} text_type_main-large mt-10`}>Соберите бургер</h1>
                { state.tabs.length > 0 && <IngridientTabs tabData={state.tabs} /> }
                { state.tabs.length > 0
                    && state.ingridients.length > 0
                    && <IngridientList tabData={state.tabs} ingridients={state.ingridients} />}
            </div>
        </div>
    );
};

BurgerIngridients.propTypes = {
    ingridients: PropTypes.arrayOf(IngridientPropTypes).isRequired
};