import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerFormulaReducer } from './burger-formula';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerFormula: burgerFormulaReducer,
    order: orderReducer,
    user: userReducer
  });