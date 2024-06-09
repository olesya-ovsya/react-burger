import type { Middleware, MiddlewareAPI } from 'redux';

import type { TApplicationActions, AppDispatch, RootState, TWSActions } from '../types';

export const socketMiddleware = (wsActions: TWSActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { 
        onStart,
        onSuccess,
        onError,
        onClosed,
        onGetData,
        onSend,
        close
      } = wsActions;
      
      const { type } = action;

      if (type === onStart) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onSuccess, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: onGetData, payload: JSON.parse(data) });
        };
        
        socket.onclose = event => {
          dispatch({ type: onClosed, payload: event });
        };

        if (type === onSend) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === close) {
          socket.close();
        }
      }

      next(action);
    };
    }) as Middleware;
}; 