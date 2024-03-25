import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './ingridient-tabs.module.css';
import PropTypes from 'prop-types';
import { IngridientTabPropTypes } from '../../../utils/shared-prop-types';

export default function IngridientTabs({ tabData }) {
    return (
        <div className={`${styles.tabList} mt-5`}>
            {tabData.map((tab) => <Tab key={tab.id}>{tab.name}</Tab>)}
        </div>
    );
}

IngridientTabs.propTypes = {
    tabData: PropTypes.arrayOf(IngridientTabPropTypes).isRequired
};