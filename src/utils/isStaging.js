import getSubdomain from 'utils/getSubdomain';
import Environments from 'constants/Environments';

export default () => {
  return [
    Environments.STAGING.subdomain,
    Environments.LOCAL.subdomain
  ].includes(getSubdomain());
};
