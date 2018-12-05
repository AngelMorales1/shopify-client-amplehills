import PropTypes from 'prop-types';

export default {
  propTypes: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    authorEmail: PropTypes.string,
    authorName: PropTypes.string,
    content: PropTypes.string,
    contentHtml: PropTypes.string,
    cursor: PropTypes.string,
    handle: PropTypes.string,
    image: PropTypes.string,
    publishedAt: PropTypes.string,
    tags: PropTypes.object
  }),
  default: {
    id: '',
    title: '',
    authorEmail: '',
    authorName: '',
    content: '',
    contentHtml: '',
    cursor: '',
    handle: '',
    image: '',
    publishedAt: '',
    tags: []
  }
};
