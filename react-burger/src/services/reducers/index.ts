import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerFormulaReducer } from './burger-formula';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsOrdersReducer } from './ws-orders';
import { wsFeedReducer } from './ws-feed';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerFormula: burgerFormulaReducer,
    order: orderReducer,
    user: userReducer,
    wsFeed: wsFeedReducer,
    wsOrders: wsOrdersReducer
  });