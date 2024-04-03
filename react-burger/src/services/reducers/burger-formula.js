import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_BUN,
    MOVE_INGREDIENT
} from "../actions/burger-formula";

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
            };
        case MOVE_INGREDIENT: {
            const ingredients = [...state.otherIngredients];
            
            const newIngredients = ingredients.map((x , i) =>{
                if (i === action.toIndex){
                    return ingredients[action.fromIndex];
                } else if (i === action.fromIndex) {
                    return ingredients[action.toIndex];
                } else {
                    return x;
                }
            });

            return  {
                ...state,
                otherIngredients: newIngredients
            };
        }
        default:
            return state;
    }
};