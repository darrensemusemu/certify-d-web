import {
  SelfServiceVerificationFlow,
  SubmitSelfServiceVerificationFlowBody,
} from '@ory/kratos-client';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Auth } from '../components';
import kratos from '../utils/kratos';

const Verification: NextPage = () => {
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
            case 403:
              // Status code 403 implies some other issue (e.g. CSRF) - let's reload!
              return router.push('/verification');
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
      .push(`/verification?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceVerificationFlow(
            String(flow?.id),
            undefined,
            values
          )
          .then(({ data }) => {
            // Form submission was successful, show the message to the user!
            setFlow(data);
          })
          .catch((err: AxiosError) => {
            switch (err.response?.status) {
              case 400:
                // Status code 400 implies the form validation had an error
                setFlow(err.response?.data);
                return;
            }

            throw err;
          })
      );

  return (
    <>
      <div>Verification</div>
      <Auth.Flow onSubmit={onSubmit} flow={flow} />
      <Link href="/" passHref>
        <div>Go back</div>
      </Link>
    </>
  );
};

export default Verification;
