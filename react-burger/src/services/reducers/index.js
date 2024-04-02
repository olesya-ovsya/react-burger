import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerFormulaReducer } from './burgerFormula';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerFormula: burgerFormulaReducer
  });