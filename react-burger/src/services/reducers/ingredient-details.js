import {
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT
} from "../actions/ingredient-details";

const initialState = {
    currentIngredient: null
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.currentIngredient
            }
        case CLEAR_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: null
            }
        default:
            return state;
    }
};