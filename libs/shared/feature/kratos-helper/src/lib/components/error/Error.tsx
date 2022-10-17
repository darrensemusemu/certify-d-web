import { Button, Text } from '@certify-d/shared-ui';
import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import { SelfServiceError } from '@ory/kratos-client';
import { CodeBox } from '@ory/themes';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import kratos from '../../config/kratos';

/* eslint-disable-next-line */
export interface ErrorProps {}

export function Error(props: ErrorProps) {
  const [error, setError] = useState<SelfServiceError | string>();

  // Get ?id=... from the URL
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // If the router is not ready yet, or we already have an error, do nothing.
    if (!router.isReady || error) {
      return;
    }

    kratos
      .getSelfServiceError(String(id))
      .then(({ data }) => {
        setError(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
          // The error id could not be found. Let's just redirect home!
          // eslint-disable-next-line no-fallthrough
          case 403:
          // The error id could not be fetched due to e.g. a CSRF issue. Let's just redirect home!
          // eslint-disable-next-line no-fallthrough
          case 410:
            // The error id expired. Let's just redirect home!
            return router.push('/auth/login');
        }

        return Promise.reject(err);
      });
  }, [id, router, router.isReady, error]);

  if (!error) {
    return null;
  }

  return (
    <Box p={4}>
      <Alert status={'error'}>
        <Text>An error occurred</Text>
        <AlertIcon />
        <CodeBox code={JSON.stringify(error, null, 2)} />
      </Alert>
      <Button variant={'link'} my={4} onClick={() => router.push('/home')}>
        Go back
      </Button>
    </Box>
  );
}

export default Error;
