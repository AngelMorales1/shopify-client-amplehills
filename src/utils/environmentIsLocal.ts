import Environments from 'constants/Environments';

export default (simulateLocalEnvironment: boolean = false): boolean => {
  if (simulateLocalEnvironment) return true;

  return Environments.LOCAL.hostnames.includes(window.location.host);
};
