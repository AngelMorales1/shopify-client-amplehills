import PropTypes from 'prop-types';

export default {
  propTypes: PropTypes.shape({
    id: PropTypes.string,
    blockCardText: PropTypes.string,
    eventType: PropTypes.string,
    image: PropTypes.string,
    locationTitle: PropTypes.string,
    title: PropTypes.string,
    datesAndTimes: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.string,
        Date: PropTypes.string,
        Time: PropTypes.string
      })
    )
  }),
  default: {
    id: '',
    blockCardText: '',
    eventType: '',
    image: '',
    locationTitle: '',
    title: '',
    datesAndTimes: [
      {
        uuid: '',
        Date: '',
        Time: ''
      }
    ]
  }
};
