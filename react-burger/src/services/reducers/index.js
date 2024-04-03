import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerFormulaReducer } from './burgerFormula';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerFormula: burgerFormulaReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer
  });