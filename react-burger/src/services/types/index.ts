import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TUserActions } from '../actions/user';
import { TOrderActions } from '../actions/order';
import { TBurgerFormulaActions } from '../actions/burger-formula';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TWSOrdersActions, WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_ERROR, WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_DATA, WS_ORDERS_SEND } from '../actions/ws-orders';
import { TWSFeedActions, WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_DATA, WS_FEED_SEND } from '../actions/ws-feed';
import { TOrderDetailsActions } from '../actions/order-details';

export type TApplicationActions = TUserActions
    | TOrderActions
    | TBurgerFormulaActions
    | TBurgerIngredientsActions
    | TWSFeedActions
    | TWSOrdersActions
    | TOrderDetailsActions;
export type TWSActions =  {
    onStart: typeof WS_FEED_CONNECTION_START | typeof WS_ORDERS_CONNECTION_START,
    onSuccess: typeof WS_FEED_CONNECTION_SUCCESS | typeof WS_ORDERS_CONNECTION_SUCCESS,
    onError: typeof WS_FEED_CONNECTION_ERROR | typeof WS_ORDERS_CONNECTION_ERROR,
    onClosed: typeof WS_FEED_CONNECTION_CLOSED | typeof WS_ORDERS_CONNECTION_CLOSED,
    onGetData: typeof WS_FEED_GET_DATA | typeof WS_ORDERS_GET_DATA,
    onSend: typeof WS_FEED_SEND | typeof WS_ORDERS_SEND
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;