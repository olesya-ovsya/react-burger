import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    getAccessToken,
    setAccessToken,
    deleteAccessToken,
    getRefreshToken,
    setRefreshToken
} from '../../utils/utils';
import { useDispatch } from 'react-redux';
import {Loader} from '../loader/loader';
import { postToken } from '../../utils/api';
import PropTypes from 'prop-types';

export function ProtectedRouteElement ({ element }) {

  const [isLoading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

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

    let accessToken = getAccessToken() ?? null;
    const refreshToken = getRefreshToken();

    switch (pageType) {
      case 'profile': {
        if (accessToken !== null && refreshToken !== null) {
          setRedirect(element);
          setLoading(false);
        } else if (refreshToken === null) {
          setRedirect(<Navigate to='/login' state={{from: location.pathname }} />);
          setLoading(false);
          return;
        } else {
          postToken(refreshToken)
          .then((model) => {
            if (model && model.success) {
              setRefreshToken(model.refreshToken);

              if (model.accessToken.indexOf('Bearer') === 0) {
                accessToken = model.accessToken.split('Bearer ')[1];
              }

              deleteAccessToken();
              setAccessToken(accessToken);

              setRedirect(element);
              setLoading(false);
              return;
            } else {
              setRedirect(<Navigate to='/login' state={{from: location.pathname }} />);
              setLoading(false);
              return;
            }
      })
      .catch(e => {
        setRedirect(<Navigate to='/login' state={{from: location.pathname }} />);
        setLoading(false);
        return;
      });
      }
      break;
      }
      case 'unauthorizedOnly': {
        if (accessToken === null || refreshToken === null) {
          setRedirect(element);
          setLoading(false);
        } else {
          setRedirect(<Navigate to='/' />);
          setLoading(false);
          return;
        }
      }
      default: {
        setRedirect(element);
        setLoading(false);
      }
    }
  }, [location.pathname, dispatch, element]);

  if (isLoading) {
    return <Loader text='Загружаем страницу...' />
  }

  return redirect;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.node.isRequired
}