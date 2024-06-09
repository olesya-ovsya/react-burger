import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { IApiIngredient } from '../../utils/shared-prop-types';

export type TBurgerIngredientsState = {
    ingredients: IApiIngredient[],
    ingredientsRequest: boolean,
    ingredientsFailed: boolean
}

const initialState: TBurgerIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
};

export const burgerIngredientsReducer = (
    state = initialState,
    action: TBurgerIngredientsActions): TBurgerIngredientsState  => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.data
            };
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredients: initialState.ingredients
            }
        default:
            return state;
    }
};