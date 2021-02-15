import Environments from 'constants/Environments';

export default (simulateLocalEnvironment = false) => {
  if (simulateLocalEnvironment) return true;

  return Environments.LOCAL.hostnames.includes(window.location.host);
};
