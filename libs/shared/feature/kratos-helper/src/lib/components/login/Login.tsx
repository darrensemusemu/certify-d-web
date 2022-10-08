import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/kratos-client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import kratos from '../../config/kratos';
import useLogoutHandler from '../../hooks/use-logout-handler/useLogoutHandler';
import { handleFlowError } from '../../utils/errors';
import { Flow } from '../auth-flow';
import { AxiosError } from 'axios';

interface IAccountLinkBtn {
  href: string;
  passHref: boolean;
}

export interface LoginProps {
  createAccountBtn: React.FC<IAccountLinkBtn>;
  registerAccountBtn: React.FC<IAccountLinkBtn>;
}

export function Login({
  createAccountBtn: CreateAccountBtn,
  registerAccountBtn: RegisterAccountBtn,
  ...props
}: LoginProps) {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
  const {
    return_to: returnTo,
    flow: flowId,
    // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
    // of a user.
    refresh,
    // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
    // to perform two-factor authentication/verification.
    aal,
  } = router.query;

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  const onLogout = useLogoutHandler([aal, refresh]);

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      kratos
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleFlowError(router, 'login', setFlow));
      return;
    }

    // Otherwise we initialize it
    kratos
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        aal ? String(aal) : undefined,
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, 'login', setFlow));
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceLoginFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/auth/login?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceLoginFlow(String(flow?.id), values)
          // We logged in successfully! Let's bring the user home.
          .then((res) => {
            if (flow?.return_to) {
              window.location.href = flow?.return_to;
              return;
            }
            router.push('/home');
          })
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .then(() => {})
          .catch(handleFlowError(router, 'login', setFlow))
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
    <>
      <Flow onSubmit={onSubmit} flow={flow} />

      {aal || refresh ? (
        <div onClick={onLogout}>Log out</div>
      ) : (
        <>
          <CreateAccountBtn passHref href="/auth/registration" />
          <br />
          <RegisterAccountBtn passHref href="/auth/recovery" />
        </>
      )}
    </>
  );
}

export default Login;
