import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { NEED_UPDATE_TOKEN, USER_AUTHORIZED } from '../../services/actions/user';
import {Loader} from '../loader/loader';
import { postToken } from '../../utils/api';


export function ProtectedRouteElement ({ element }) {

  const [isLoading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(null);

  const authorized = useSelector(store => store.user.authorized);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(authorized);

    const pathname = location.pathname;

    let pageType = 'unknown';

    if (pathname.includes('/profile')) {
      pageType = 'profile';
    } else if (pathname.includes('/login') 
      || pathname.includes('/register') 
      || pathname.includes('/forgot-password')
      || pathname.includes('/reset-password')) {
      pageType = 'unauthorizedOnly';
    }

    let accessToken = getCookie('accessToken') ?? null;
    const refreshToken = localStorage.getItem('refreshToken') ?? null;

    switch (pageType) {
      case 'profile': {
        if (accessToken?.length > 0 && refreshToken?.length > 0) {
          if (!authorized) {
            dispatch({ type: USER_AUTHORIZED});
          }
          break;
        } else if (refreshToken === null) {
          setRedirect(<Navigate to='/login' state={{from: pathname }} />);
          setLoading(false);
          return;
        } else {
          dispatch({ type: NEED_UPDATE_TOKEN });
          postToken(refreshToken)
          .then((model) => {
            if (model && model.success) {
              localStorage.setItem('refreshToken', model.refreshToken);

              if (model.accessToken.indexOf('Bearer') === 0) {
                accessToken = model.accessToken.split('Bearer ')[1];
              }

              deleteCookie('accessToken');
              setCookie('accessToken', accessToken, { expires: 2000 });
              dispatch({ type: USER_AUTHORIZED });

              setRedirect(element);
              setLoading(false);
              return;

            } else {
              setRedirect(<Navigate to='/login' state={{from: pathname }} />);
              setLoading(false);
              return;
            }
      })
      .catch(e => {
        setRedirect(<Navigate to='/login' state={{from: pathname }} />);
        setLoading(false);
        return;
      });
      }
      break;
      }
      case 'unauthorizedOnly': {
        if (accessToken?.length > 0 && refreshToken?.length > 0) {
          dispatch({ type: USER_AUTHORIZED});
        }
        
        if (!authorized) {
          break;
        } else {
          setRedirect(<Navigate to='/' />);
          setLoading(false);
          return;
        }
      }
      default: break;
    }
    setRedirect(element);
    setLoading(false);
  }, [location.pathname, authorized, dispatch, element]);

  if (isLoading) {
    return <Loader text='Загружаем страницу...' />
  }

  return redirect;
}