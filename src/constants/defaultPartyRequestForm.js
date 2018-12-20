export const defaultPartyTypes = [
  { uuid: '1', index: 0, partyType: 'Bicycle Party', link: '/bike-party' },
  {
    uuid: '2',
    index: 1,
    partyType: 'Scoop Tab Party',
    link: 'scoop-tab-party'
  }
];

export const defaultTimeSlots = [
  { uuid: '1', index: 0, label: '11am to 1pm' },
  { uuid: '2', index: 1, label: '2pm to 4pm' },
  { uuid: '3', index: 2, label: '5pm to 7pm' },
  { uuid: '4', index: 3, label: '8pm to 10pm' }
];

export const partyAttrs = {
  LOCATION: 'Location',
  DATE: 'Date',
  TIME_SLOT: 'Time Slot',
  PARTY_TYPE: 'Party Type',
  NO_OF_GUESTS: '# of Guests',
  AGE: 'Age',
  CELEBRATING: 'Celebrating',
  ALLERGIES: 'Allergies',
  ADDONS: 'Party Addons'
};
