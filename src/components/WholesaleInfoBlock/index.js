import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Image, Button } from 'components/base';
import marked from 'marked';

import styles from './WholesaleInfoBlock.scss';

const WholesaleInfoBlock = ({ image, title, description }) => {
  return (
    <div
      className={cx(
        styles['WholesaleInfoBlock'],
        'flex items-center justify-between bg-lavender-blush mx3'
      )}
    >
      <div className="flex flex-row justify-center items-center col-12 md-col-7 py3">
        <Image className="col-12 md-col-8" src={image} />
      </div>
      <div className="flex flex-column col-12 md-col-5 my4">
        <p className="description-title bold mb2 text-container-width">
          {title}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(description)
          }}
          className="markdown-block text-container-width col-12 md-col-9"
        />
        <Button
          className="inline-flex mt3"
          to="/wholesale"
          label="Wholesale Info"
          color="peach"
        />
      </div>
    </div>
  );
};

WholesaleInfoBlock.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

WholesaleInfoBlock.defaultProps = {
  image: '',
  title: '',
  description: ''
};

export default WholesaleInfoBlock;
