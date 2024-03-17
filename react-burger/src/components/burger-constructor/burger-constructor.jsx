import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from '../burger-constructor/burger-constructor.module.css';
import { getData } from '../../utils/data.js'

export default class BurgerConstructor extends React.Component {
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
            <div className={styles.constructorBox}>
                <div className={styles.constructor}>
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
    state = {
        messages: [{ 
          id: 1,
          user: 'Ольга',
          text: 'Привет! Можешь помочь со списками в React?',
        }, { 
          id: 2,
          user: 'Николай',
          text: 'Здравствуй! Конечно, это проще простого! Какой у тебя вопрос?',
        }, { 
          id: 3,
          user: 'Ольга',
          text: 'Спасибо! Как они попадают в JSX?',
        }]
    }
    
    render(){
        return (
            <div>
                {this.props.tabs.map((tab) => (
                    <div key={tab.id}>
                    {this.props.ingridients.filter(x => x.type === tab.type).map((i)=>(
                        <div key={i._id}>
                            <span>{i.name}</span>
                            <span>{i.price}</span>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        );
    }
} 