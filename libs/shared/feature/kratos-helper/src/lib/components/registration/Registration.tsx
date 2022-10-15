import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from '@ory/kratos-client';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import kratos from '../../config/kratos';
import { handleFlowError } from '../../utils/errors';
import { Flow } from '../auth-flow';
import { AxiosError } from 'axios';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { IAccountLinkBtn } from '../login/Login';

export interface RegistrationProps {
  loginAccountBtn: React.FC<IAccountLinkBtn>;
  rightNode?: ReactNode;
}

export function Registration({
  loginAccountBtn: LoginAccountBtn,
  ...props
}: RegistrationProps) {
  // The "flow" represents a registration process and contains
  // information about the form we need to render (e.g. username + password)
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>();

  const router = useRouter();

  // Get ?flow=... from the URL
  const { flow: flowId, return_to: returnTo } = router.query;

  // In this effect we either initiate a new registration flow, or we fetch an existing registration flow.
  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      kratos
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleFlowError(router, 'registration', setFlow))
        .catch((err: AxiosError) => {
          // If the previous handler did not catch the error it's most likely a form validation error
          if (err.response?.status === 400) {
            // Yup, it is!
            setFlow(err.response?.data as any);
            return;
          }

          return Promise.reject(err);
        });
      return;
    }

    // Otherwise we initialize it
    kratos
      .initializeSelfServiceRegistrationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, 'registration', setFlow));
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceRegistrationFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/auth/registration?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceRegistrationFlow(String(flow?.id), values)
          .then(({ data }) => {
            // If we ended up here, it means we are successfully signed up!
            //
            // You can do cool stuff here, like having access to the identity which just signed up:
            console.log('This is the user session: ', data, data.identity);

            // For now however we just want to redirect home!
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return router.push(flow?.return_to || '/home').then(() => {});
          })
          .catch(handleFlowError(router, 'registration', setFlow))
          .catch((err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setFlow(err.response?.data as any);
              return;
            }

            return Promise.reject(err);
          })
      );
  return (
    <Grid h={'80vh'} templateColumns={'repeat(12, 1fr)'}>
      <GridItem px={{ base: 4, lg: 16 }} colSpan={{ base: 12, lg: 6 }}>
        <Flex h={'full'} direction={'column'} justifyContent="center">
          <Box>
            <Flow flow={flow} onSubmit={onSubmit} />
            <LoginAccountBtn passHref href="/auth/login" />
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 6 }}>
        <Box h="full">{props.rightNode}</Box>
      </GridItem>
    </Grid>
  );
}

export default Registration;
