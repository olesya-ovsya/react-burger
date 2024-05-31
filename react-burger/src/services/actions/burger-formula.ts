import { IIngredient } from "../../utils/shared-prop-types";

export const ADD_INGREDIENT:'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' ='REMOVE_INGREDIENT';
export const SET_BUN: 'SET_BUN' ='SET_BUN';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT,
    ingredient: IIngredient
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT,
    identity: string
}

export interface ISetBunAction {
    readonly type: typeof SET_BUN,
    bun: IIngredient
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT,
    fromIndex: number,
    toIndex: number
}

export type TBurgerFormulaActions = IAddIngredientAction
    | IRemoveIngredientAction
    | ISetBunAction
    | IMoveIngredientAction;

export const addIngredient = (ingredient: IIngredient): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    ingredient
});

export const removeIngredient = (identity: string) => ({
    type: REMOVE_INGREDIENT,
    identity
});

export const setBun = (bun: IIngredient) => ({
    type: SET_BUN,
    bun
});

export const moveIngredient = (fromIndex: number, toIndex: number) => ({
    type: MOVE_INGREDIENT,
    fromIndex,
    toIndex
});