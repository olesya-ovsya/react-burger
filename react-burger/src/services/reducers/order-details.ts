import { IOrderDetails } from "../../utils/shared-prop-types";
import { 
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILED
} from "../actions/order-details";

import { TOrderDetailsActions } from "../actions/order-details";

export interface IOrderDetailsState {
    order: IOrderDetails | null,
    getOrderDetailsRequest: boolean,
    getOrderDetailsFailed: boolean
}

const initialState: IOrderDetailsState = {
    order: null,
    getOrderDetailsRequest: false,
    getOrderDetailsFailed: false
}

export const orderDetailsReducer = (
    state = initialState,
    action: TOrderDetailsActions
): IOrderDetailsState => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                getOrderDetailsRequest: true,
                getOrderDetailsFailed: false
            };
        case GET_ORDER_DETAILS_SUCCESS: 
            return {
                ...state,
                getOrderDetailsRequest: false,
                getOrderDetailsFailed: false,
                order: action.order
            }
        case GET_ORDER_DETAILS_FAILED:
            return {
                ...state,
                order: null,
                getOrderDetailsRequest: false,
                getOrderDetailsFailed: true
            }
        default: return state;
    }
}