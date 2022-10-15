import { useRouter } from 'next/router';
import { useState, DependencyList, useEffect } from 'react';
import kratos from '../../config/kratos';
import { AxiosError } from 'axios';

export function useLogoutHandler(deps?: DependencyList) {
  const [logoutToken, setLogoutToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    kratos
      .createSelfServiceLogoutFlowUrlForBrowsers()
      .then(({ data }) => {
        setLogoutToken(data.logout_token);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 401:
            // do nothing, the user is not logged in
            return;
        }

        // Something else happened!
        return Promise.reject(err);
      });
  }, [deps]);

  return () => {
    if (logoutToken) {
      kratos
        .submitSelfServiceLogoutFlow(logoutToken)
        .then(() => router.push('/auth/login'))
        .then(() => router.reload());
    }
  };
}

export default useLogoutHandler;
