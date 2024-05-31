import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TUserActions } from '../actions/user';
import { TOrderActions } from '../actions/order';
import { TBurgerFormulaActions } from '../actions/burger-formula';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';

type TApplicationActions = TUserActions | TOrderActions | TBurgerFormulaActions | TBurgerIngredientsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;