import { Grid, GridItem, Flex, Box } from '@chakra-ui/react';
import {
  SelfServiceRecoveryFlow,
  SubmitSelfServiceRecoveryFlowBody,
} from '@ory/kratos-client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import kratos from '../../config/kratos';
import { handleFlowError } from '../../utils/errors';
import { Flow } from '../auth-flow';
import { IAccountLinkBtn } from '../login/Login';

export interface RecoveryProps {
  loginAccountBtn: React.FC<IAccountLinkBtn>;
  rightNode?: ReactNode;
}

export function Recovery({
  loginAccountBtn: LoginAccountBtn,
  ...props
}: RecoveryProps) {
  const [flow, setFlow] = useState<SelfServiceRecoveryFlow>();

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
        .getSelfServiceRecoveryFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleFlowError(router, 'recovery', setFlow));
      return;
    }

    // Otherwise we initialize it
    kratos
      .initializeSelfServiceRecoveryFlowForBrowsers()
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, 'recovery', setFlow))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          setFlow(err.response?.data as any);
          return;
        }

        return Promise.reject(err);
      });
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceRecoveryFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/auth/recovery?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceRecoveryFlow(String(flow?.id), values, undefined)
          .then(({ data }) => {
            // Form submission was successful, show the message to the user!
            setFlow(data);
          })
          .catch(handleFlowError(router, 'recovery', setFlow))
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
            <LoginAccountBtn passHref href="/auth/login" />
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 6 }}></GridItem>
    </Grid>
  );
}

export default Recovery;
