import type {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from '@ory/kratos-client';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Auth } from '../components';
import kratos, { handleFlowError } from '../utils/kratos';

const Registration: NextPage = () => {
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
        .catch(handleFlowError(router, 'registration', setFlow));
      return;
    }

    // Otherwise we initialize it
    kratos
      .initializeSelfServiceRegistrationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        console.log(data);
        setFlow(data);
      })
      .catch(handleFlowError(router, 'registration', setFlow));
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceRegistrationFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/registration?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceRegistrationFlow(String(flow?.id), values)
          .then(({ data }) => {
            // If we ended up here, it means we are successfully signed up!
            //
            // You can do cool stuff here, like having access to the identity which just signed up:
            console.log('This is the user session: ', data, data.identity);

            // For now however we just want to redirect home!
            return router.push(flow?.return_to || '/home').then(() => {});
          })
          .catch(handleFlowError(router, 'registration', setFlow))
          .catch((err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              setFlow(err.response?.data);
              return;
            }

            return Promise.reject(err);
          })
      );
  return (
    <div>
      <h1>Registration</h1>
      <div style={{ width: '50%' }}>
        <Auth.Flow flow={flow} onSubmit={onSubmit} />
      </div>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  );
};

export default Registration;
