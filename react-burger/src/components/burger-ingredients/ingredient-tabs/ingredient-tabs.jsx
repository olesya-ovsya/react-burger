import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './ingredient-tabs.module.css';
import PropTypes from 'prop-types';
import { IngredientTabPropTypes } from '../../../utils/shared-prop-types';

export default function IngredientTabs({ tabData, refTabsContainer, currentTab }) {
    return (
        <div className={`${styles.tabList} mt-5`} ref={refTabsContainer}>
            {tabData.map((tab) =>
                <Tab key={tab.id} active={tab.id === currentTab}>{tab.name}</Tab>)}
        </div>
    );
}

IngredientTabs.propTypes = {
    tabData: PropTypes.arrayOf(IngredientTabPropTypes).isRequired
};