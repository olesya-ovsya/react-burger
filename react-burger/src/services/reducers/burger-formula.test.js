import { burgerFormulaReducer } from './burger-formula';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_BUN, MOVE_INGREDIENT } from '../actions/burger-formula';
import { addIngredient, removeIngredient, setBun, moveIngredient } from '../actions/burger-formula';

describe('burger-formula reducer', () => {
    it('should return the initial state', () => {
        expect(burgerFormulaReducer(undefined, {})).toEqual(
          {
            bun: null,
            otherIngredients: []
          }
        )
      });

    const testIngredient = {
        identity: 'testIngredient',
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
        identity: 'testIngredient2',
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
        identity: 'testBun',
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

    it(`should handle ${ADD_INGREDIENT}`, () => {
        expect(burgerFormulaReducer(undefined, addIngredient(testIngredient))).toEqual(
          {
            bun: null,
            otherIngredients: [ testIngredient ]
          }
        )
    });

    it(`should handle ${REMOVE_INGREDIENT}`, () => {
        expect(burgerFormulaReducer(
            { bun: null, otherIngredients: [testIngredient, testIngredient2]},
            removeIngredient('testIngredient')))
            .toEqual(
          {
            bun: null,
            otherIngredients: [testIngredient2]
          }
        )
    });

    it(`should handle ${SET_BUN}`, () => {
        expect(burgerFormulaReducer(
            { bun: null, otherIngredients: []},
            setBun(testBun)))
            .toEqual(
          {
            bun: testBun,
            otherIngredients: []
          }
        )
    });

    it(`should handle ${MOVE_INGREDIENT}`, () => {
        expect(burgerFormulaReducer(
            { bun: null, otherIngredients: [testIngredient, testIngredient2]},
            moveIngredient(0, 1)))
            .toEqual(
          {
            bun: null,
            otherIngredients: [testIngredient2, testIngredient]
          }
        )
    });
});