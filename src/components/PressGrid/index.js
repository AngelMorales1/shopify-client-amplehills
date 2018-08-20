import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import { Image } from 'components/base';

const PressGrid = ({ pressBlock }) => {
  return (
    <div className="border flex flex-column justify-center items-center">
      <Image
        className="col-1"
        src={get(pressBlock, 'fields.image.fields.file.url', '')}
        alt={`${get(pressBlock, 'fields.title', '')} logo`}
      />
      <span>{`"${get(pressBlock, 'fields.quote', '')}"`}</span>
      <a
        href={get(pressBlock, 'fields.linkUrl', '')}
        target="_blank"
        rel="noopener"
      >
        <div className="bg-peach text-white inline-block mt1 nowrap tag">
          Read about it
        </div>
      </a>
    </div>
  );
};

export default PressGrid;

PressGrid.propTypes = {};

PressGrid.defaultProps = {};
