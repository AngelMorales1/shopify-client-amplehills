export default {
  SEASONAL_FILTERS: [
    {
      key: 'seasonal',
      value: false,
      label: 'Open Year Round',
      icon: '/assets/images/year-round-icon.svg'
    },
    {
      key: 'seasonal',
      value: true,
      label: 'Open Seasonally',
      icon: '/assets/images/seasonal-icon.svg'
    }
  ],
  STATE_FILTERS: [
    {
      key: 'state',
      value: 'NY',
      label: 'New York'
    },
    {
      key: 'state',
      value: 'NJ',
      label: 'New Jersey'
    },
    {
      key: 'state',
      value: 'FL',
      label: 'Florida'
    },
    {
      key: 'state',
      value: 'CA',
      label: 'California'
    }
  ]
};
