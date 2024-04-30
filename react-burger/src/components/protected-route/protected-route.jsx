import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../services/actions/user';
import {Loader} from '../loader/loader';

export const ProtectedRouteElement = ({ element }) => {
  const [isLoaded, setLoaded] = useState(false);

  const { user } = useSelector(store => store.user);
  
  const dispatch = useDispatch();

  const init = async () => {
    
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
        setLoaded(true);
        return;
    }

    dispatch(getCurrentUser());
    setLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isLoaded) {
    return <Loader text='Загрузка личного кабинета...' />;
  }

  return user?.authorized ? element : <Navigate to="/login" replace/>;
}