import { Session } from '@ory/kratos-client';
import { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import kratos from '../utils/kratos';

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
    <div>
      <h1>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </h1>
      <h1>
        <Link href="/registration">
          <a>Registration</a>
        </Link>
      </h1>
      <h1>
        <Link href="/verification">
          <a>Verification</a>
        </Link>
      </h1>
    </div>
  );
};

export default Home;
