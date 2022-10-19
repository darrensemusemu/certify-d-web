import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import {
  SelfServiceVerificationFlow,
  SubmitSelfServiceVerificationFlowBody,
} from '@ory/kratos-client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import kratos from '../../config/kratos';
import { Flow } from '../auth-flow';
import { IAccountLinkBtn } from '../login/Login';

export interface VerificationProps {
  loginAccountBtn: React.FC<IAccountLinkBtn>;
  rightNode?: ReactNode;
}

export function Verification({
  loginAccountBtn: LoginAccountBtn,
  ...props
}: VerificationProps) {
  const [flow, setFlow] = useState<SelfServiceVerificationFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
  const { flow: flowId, return_to: returnTo } = router.query;

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      kratos
        .getSelfServiceVerificationFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch((err: AxiosError) => {
          switch (err.response?.status) {
            case 410:
            // Status code 410 means the request has expired - so let's load a fresh flow!
            // eslint-disable-next-line no-fallthrough
            case 403:
              // Status code 403 implies some other issue (e.g. CSRF) - let's reload!
              return router.push('/dash/auth/verification');
          }

          throw err;
        });
      return;
    }

    // Otherwise we initialize it
    kratos
      .initializeSelfServiceVerificationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 400:
            // Status code 400 implies the user is already signed in
            return router.push('/home');
        }

        throw err;
      });
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceVerificationFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/dash/auth/verification?flow=${flow?.id}`, undefined, {
        shallow: true,
      })
      .then(() =>
        kratos
          .submitSelfServiceVerificationFlow(
            String(flow?.id),
            values,
            undefined
          )
          .then(({ data }) => {
            // Form submission was successful, show the message to the user!
            setFlow(data);
          })
          .catch((err: AxiosError) => {
            switch (err.response?.status) {
              case 400:
                // Status code 400 implies the form validation had an error
                setFlow(err.response?.data as any);
                return;
            }

            throw err;
          })
      );

  return (
    <Grid h={'80vh'} templateColumns={'repeat(12, 1fr)'}>
      <GridItem px={{ base: 4, lg: 16 }} colSpan={{ base: 12, lg: 6 }}>
        <Flex h={'full'} direction={'column'} justifyContent="center">
          <Box>
            <Flow onSubmit={onSubmit} flow={flow} />
            <LoginAccountBtn passHref href="/dash/auth/login" />
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 6 }}>
        <Box h="full">{props.rightNode}</Box>
      </GridItem>
    </Grid>
  );
}

export default Verification;
