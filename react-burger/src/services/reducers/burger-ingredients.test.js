import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';
import { 
    getIngredientsRequest, 
    getIngredientsSuccess, 
    getIngredientsFailed 
} from '../actions/burger-ingredients';
import { burgerIngredientsReducer } from './burger-ingredients';

describe('burger-ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(burgerIngredientsReducer(undefined, {}))
        .toEqual(
          {
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false
          }
        )
    });

    const testIngredient = {
        _id: 'id1001',
        name: 'Sause',
        type: 'sause',
        proteins: 20,
        fat: 10,
        carbohydrates: 40,
        calories: 290,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 1
    };

    const testIngredient2 = {
        _id: 'id1002',
        name: 'Meat',
        type: 'filling',
        proteins: 25,
        fat: 15,
        carbohydrates: 40,
        calories: 350,
        price: 200,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 1
    };

    const testBun = {
        _id: 'id1003',
        name: 'Bun',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 60,
        calories: 370,
        price: 120,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 1
    };

    it(`should handle ${GET_INGREDIENTS_REQUEST}`, () => {
        expect(burgerIngredientsReducer(undefined, getIngredientsRequest()))
        .toEqual(
          {
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false
          }
        )
    });

    it(`should handle ${GET_INGREDIENTS_SUCCESS}`, () => {
        expect(burgerIngredientsReducer(
            {
                ingredients: [],
                ingredientsRequest: true,
                ingredientsFailed: false
            },
            getIngredientsSuccess([testIngredient, testIngredient2, testBun])))
        .toEqual(
          {
                ingredients: [testIngredient, testIngredient2, testBun],
                ingredientsRequest: false,
                ingredientsFailed: false
          }
        )
    });

    it(`should handle ${GET_INGREDIENTS_FAILED}`, () => {
        expect(
            burgerIngredientsReducer({ 
                ingredients: [testIngredient, testIngredient2, testBun],
                ingredientsRequest: true,
                ingredientsFailed: false
            },
            getIngredientsFailed()))
        .toEqual(
          {
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: true
          }
        )
    });
});