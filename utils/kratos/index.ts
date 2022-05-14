import { Configuration, V0alpha2Api } from '@ory/kratos-client';
import { handleFlowError } from './errors';
import { useLogoutHandler } from './hooks';

export { handleFlowError, useLogoutHandler };

export default new V0alpha2Api(
  new Configuration({
    basePath: 'https://certify-d.darrensemusemu.com/.ory/kratos/public',
    baseOptions: {
      withCredentials: true,
    },
  })
);
