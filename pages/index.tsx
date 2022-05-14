import { Session } from '@ory/kratos-client';
import { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../components';
import kratos from '../utils/kratos';
import indexStyles from './index.module.css';

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    kratos
      .toSession()
      .then(({ data }) => {
        setSession(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 403:
          // This is a legacy error code thrown. See code 422 for
          // more details.
          case 422:
            // This status code is returned when we are trying to
            // validate a session which has not yet completed
            // it's second factor
            return router.push('/login?aal=aal2');
          case 401:
            // do nothing, the user is not logged in
            return;
        }

        // Something else happened!
        return Promise.reject(err);
      });
    return () => {};
  }, [router]);

  return (
    <main className={indexStyles.container}>
      <div className={indexStyles.mainHeader}>
        <h1>BlockLife</h1>
      </div>
      <div className={indexStyles.authOptionsContainer}>
        <Button title="Login" onClick={() => router.push('/login')} />
        <Button
          title="Registration"
          onClick={() => router.push('/registration')}
        />
        <Button
          title="Verification"
          onClick={() => router.push('/verification')}
        />
      </div>
    </main>
  );
};

export default Home;
