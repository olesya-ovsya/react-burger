import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerFormulaReducer } from './burgerFormula';
import { ingredientDetailsReducer } from './ingredient-details';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerFormula: burgerFormulaReducer,
    ingredientDetails: ingredientDetailsReducer
  });