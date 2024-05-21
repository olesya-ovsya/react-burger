import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
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
import { FC } from 'react';

enum PageType {
  Unknown,
  Profile,
  UnauthorizedOnly
}

export const ProtectedRouteElement: FC<{ element: ReactElement }> = ({ element }) => {

  const [isLoading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<ReactElement | null>(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    const pathname = location.pathname;
    let pageType = PageType.Unknown;
    if (pathname.includes('/profile')) {
      pageType = PageType.Profile;
    } else if (pathname.includes('/login') 
      || pathname.includes('/register') 
      || pathname.includes('/forgot-password')
      || pathname.includes('/reset-password')) {
      pageType = PageType.UnauthorizedOnly;
    }

    let accessToken = getAccessToken() ?? null;
    const refreshToken = getRefreshToken();

    switch (pageType) {
      case PageType.Profile: {
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
      case PageType.UnauthorizedOnly: {
        if (accessToken === null || refreshToken === null) {
          setRedirect(element);
          setLoading(false);
          return;
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