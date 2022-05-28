import { Configuration, V0alpha2Api } from '@ory/kratos-client';
import { handleFlowError } from './errors';
import { useLogoutHandler } from './hooks';

export { handleFlowError, useLogoutHandler };

export default new V0alpha2Api(
  new Configuration({
    basePath: process.env.NEXT_PUBLIC_KRATOS_BASE_URL,
    baseOptions: {
      withCredentials: true,
    },
  })
);
