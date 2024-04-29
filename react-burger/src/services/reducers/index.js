import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerFormulaReducer } from './burger-formula';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerFormula: burgerFormulaReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    user: userReducer
  });