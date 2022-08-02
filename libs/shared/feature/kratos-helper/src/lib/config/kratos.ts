import { Configuration, V0alpha2Api } from '@ory/kratos-client';

export const kratosConfig = {
  basePath: 'https://localhost/api/kratos/public',
};

export default new V0alpha2Api(
  new Configuration({
    basePath: kratosConfig.basePath,
    baseOptions: {
      withCredentials: true,
    },
  })
);
