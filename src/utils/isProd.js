import getSubdomain from 'utils/getSubdomain';
import Environments from 'constants/Environments';

export default () => {
  return [
    Environments.MVP.subdomain,
    Environments.PRODUCTION.subdomain
  ].includes(getSubdomain());
};
