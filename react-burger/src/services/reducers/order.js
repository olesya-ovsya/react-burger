import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    CLEAR_ORDER_NUMBER 
} from "../actions/order";

const initialState = {
    orderNumber: null,
    createOrderRequest: false,
    createOrderFailed: false
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                createOrderRequest: true,
                createOrderFailed: false,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                createOrderRequest: false,
                createOrderFailed: false,
                orderNumber: action.number
            };
        case CREATE_ORDER_FAILED:
            return {
                ...state,
                createOrderRequest: false,
                createOrderFailed: true,
                orderNumber: null
            };
        case CLEAR_ORDER_NUMBER:
            return {
                ...state,
                orderNumber: null
            };
        default:
            return state;
    }
};