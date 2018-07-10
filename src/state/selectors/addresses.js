import { createSelector } from 'reselect';
import get from 'utils/get';

export const deriveAddresses = addresses =>
  addresses.map(address => {
    const firstName = get(address, 'node.firstName', '');
    const lastName = get(address, 'node.lastName', '');
    const address1 = get(address, 'node.address1', '');
    const address2 = get(address, 'node.address2', '');
    const city = get(address, 'node.city', '');
    const company = get(address, 'node.company', '');
    const province = get(address, 'node.province', '');
    const zip = get(address, 'node.zip', '');
    const country = get(address, 'node.country', '');
    const countryCode = get(address, 'node.countryCodeV2', '');

    return {
      firstName,
      lastName,
      address1,
      address2,
      city,
      company,
      province,
      zip,
      country,
      countryCode
    };
  });

export default createSelector(
  state => get(state, 'customer.addresses', []),
  deriveAddresses
);
