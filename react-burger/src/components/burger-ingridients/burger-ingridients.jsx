import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from '../burger-ingridients/burger-ingridients.module.css';
import { getData } from '../../utils/data.js';

export default class BurgerIngridients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            hasError: false,
            currentTab: 1,
            tabs: [
                {
                    id: 1,
                    name: 'Булки',
                    type: 'bun'
                },
                {
                    id: 2,
                    name: 'Соусы',
                    type: 'sauce'
                },
                {
                    id: 3,
                    name: 'Основное',
                    type: 'main'
                },
            ]
        }
    };

    componentDidMount() {
        const newData = getData();
        this.setState({...this.state, data: newData, loading: false });
    };

    render() {
        return(
            <div className={styles.box + ' ' + 'mr-10'}>
                <div className={styles.burgerIngridients}>
                    <h1 className={styles.h1 + ' ' + 'text_type_main-large mt-10'}>Соберите бургер</h1>
                    <TabList tabs={this.state.tabs} />
                    <IngridientList tabs={this.state.tabs} ingridients={this.state.data} />
                </div>
            </div>
        );
    };
};

class TabList extends React.Component {
    render() {
        return (
            <div className={styles.tabList + ' ' + 'mt-5'}>
                {this.props.tabs.map((tab) => (<Tab key={tab.id}>{tab.name}</Tab>))}
            </div>
        );
    };
};

class IngridientList extends React.Component {
    state = { }
    
    render(){
        return (
            <div className={styles.ingridientList }>
                {this.props.tabs.map((tab) => (
                    <div key={tab.id} className='mt-10 mb-6'>
                        <h2 className={styles.h1 + ' ' + 'text_type_main-medium'}>{tab.name}</h2>
                        <div className={styles.ingridientListBlock}>
                            {this.props.ingridients.filter(x => x.type === tab.type).map((i)=>(
                                <div key={i._id} className={styles.ingridientCard + ' ' + 'mr-4 mt-6'}>
                                    <div className={styles.imageBox}>
                                        <img src={i.image} className='ml-4' />
                                        <Counter count={1} styles={{zIndex: '3', position: 'absolute'}}/>
                                    </div>
                                    <div className='mt-1 mb-1'>
                                        <span className={styles.ingridientPrice + ' ' + 'text_type_digits-default mr-2'}>{i.price}</span>
                                        <CurrencyIcon />
                                    </div>
                                    <span className='text_type_main-default'>{i.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
        );
    }
} 