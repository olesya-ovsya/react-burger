import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer
  });