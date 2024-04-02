import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_BUN
} from "../actions/burgerFormula";

const initialState = {
    bun: null,
    otherIngredients: []
}

export const burgerFormulaReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                otherIngredients:[
                    ...state.otherIngredients,
                    action.newIngredient
                ]
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                otherIngredients: [...state.otherIngredients].filter(item => item.identity !== action.identity)
            };
        case SET_BUN: 
            return {
                ...state,
                bun: action.bun
            }
        default:
            return state;
    }
};