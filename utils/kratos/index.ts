import { Configuration, V0alpha2Api } from '@ory/kratos-client';
import { handleFlowError } from './errors';
import { useLogoutHandler } from './hooks';

export { handleFlowError, useLogoutHandler };

export default new V0alpha2Api(
  new Configuration({
    basePath: 'http://127.0.0.1:4433/',
    baseOptions: {
      withCredentials: true,
    },
  })
);
