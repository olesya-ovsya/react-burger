import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import { getData } from '../../utils/data';

export default class App extends React.Component {

  constructor(props:any) {
    super(props);
    this.state = {
        ingridients: [],
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
    this.setState({...this.state, ingridients: newData, loading: false });
  };
  
  render() {
    return (
      <div className="App">
        <AppHeader />
          <section style={{display: 'flex', justifyContent: 'center'}}>
            <BurgerIngridients />
            <BurgerConstructor />
          </section>
        <div>
          
        </div>
      </div>
    );
  }
}
