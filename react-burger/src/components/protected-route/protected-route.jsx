import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken, NEED_UPDATE_TOKEN } from '../../services/actions/user';
import {Loader} from '../loader/loader';

export const ProtectedRouteElement = ({ element }) => {
  const authorized = useSelector(store => store.user.authorized);
  const updateTokenRequest = useSelector(store => store.user.updateTokenRequest);

  const [state, setState] = useState({
    accessToken: getCookie('accessToken') ?? null,
    refreshToken: localStorage.getItem('refreshToken') ?? null
  });
  
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (state.accessToken === null) {
      console.log('нужна аунтентификация')
      dispatch({ type: NEED_UPDATE_TOKEN }); 
      
      if (state.refreshToken !== null) {
        dispatch(updateToken(state.refreshToken));
      }
    }
  }, []);

  useEffect(() => {
    if(authorized){
      var updatedToken = getCookie('accessToken') ?? null;
      setState({...state, accessToken: updatedToken });
    }
  }, [authorized]);

  if (updateTokenRequest) {
    return <Loader text='Загружаем страницу...' />
  }

  if (!updateTokenRequest && !authorized) {
    return <Navigate to="/login" state={{from: location.pathname}} replace/>;
  }

  return element;
}