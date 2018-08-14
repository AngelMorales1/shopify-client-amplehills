import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import get from 'utils/get';
import cx from 'classnames';

import styles from './PrivacyPolicy.scss';

const PrivacyPolicy = ({ privacyPolicy }) => {
  const createMarkup = () => {
    return { __html: marked(get(privacyPolicy, 'content', '')) };
  };

  return (
    <div
      dangerouslySetInnerHTML={createMarkup()}
      className={cx(
        styles['PrivacyPolicy'],
        'form-container-width transition-slide-up mx-auto px3 py4'
      )}
    />
  );
};

export default PrivacyPolicy;

PrivacyPolicy.propTypes = {
  PrivacyPolicy: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string
  })
};

PrivacyPolicy.defaultProps = {
  PrivacyPolicy: {
    content: '',
    title: ''
  }
};
