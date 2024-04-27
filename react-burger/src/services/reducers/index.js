import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerFormulaReducer } from './burger-formula';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerFormula: burgerFormulaReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer
  });