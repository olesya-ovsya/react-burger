import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from './ingredient-tabs.module.css';
import { FC } from 'react';
import { ITab } from '../../../utils/shared-prop-types';

interface IIngredientTabsProps {
    tabData: Array<ITab>,
    refTabsContainer: React.RefObject<HTMLDivElement>,
    currentTab: number
}

export const IngredientTabs: FC<IIngredientTabsProps> = ({ tabData, refTabsContainer, currentTab })  => {

    const handleClickStub = (value: string) => {};
        
    return (
        <div className={`${styles.tabList} mt-5`} ref={refTabsContainer}>
            {tabData.map((tab) =>
                <Tab key={tab.id}
                    active={tab.id === currentTab}
                    value={tab.name}
                    onClick={handleClickStub}>
                        {tab.name}
                </Tab>)}
        </div>
    );
}