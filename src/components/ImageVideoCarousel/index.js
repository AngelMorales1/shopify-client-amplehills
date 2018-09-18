import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import Global from 'constants/Global';

import styles from './ImageVideoCarousel.scss';
import { Image, Button, Carousel } from 'components/base';

class ImageVideoCarousel extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  render() {
    const { block, z, setRef } = this.props;
    const fields = get(block, 'fields', {});
    const title = get(fields, 'title', '');
    const contents = get(fields, 'contents', []);
    const isDripOn = get(fields, 'drip', false);
    const currentBreakpointIsSmall = this.state.currentBreakpoint == 'small';
    console.log('ImageVideoCarousel', currentBreakpointIsSmall);
    return (
      <div
        ref={refBlock => setRef(refBlock)}
        style={{ zIndex: z }}
        className={cx(styles['ImageVideoCarousel'], 'px3 py4 bg-white', {
          drip: isDripOn
        })}
      >
        <div className="flex flex-column justify-center items-center my4">
          <h2 className="block-headline">{title}</h2>
          <Carousel
            showDotsOnImage={currentBreakpointIsSmall ? false : true}
            showArrows={currentBreakpointIsSmall ? false : true}
            showDotsOnImage={currentBreakpointIsSmall ? false : true}
            dotColorWhite={currentBreakpointIsSmall ? false : true}
            className={cx(
              styles['ImageVideoCarousel__carousel'],
              'col-12 md-col-8 mx-auto mt4'
            )}
          >
            {contents.map((content, i) => {
              const url = get(content, 'fields.file.url', '');
              const id = get(content, 'sys.id', '');

              return (
                <div key={id} className="col-12 md-col-11 mx-auto py-auto">
                  <Image
                    alt={`${title} image ${i + 1}`}
                    src={contentfulImgUtil(url, '1200')}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }
}

ImageVideoCarousel.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string
    })
  }),
  setRef: PropTypes.func
};

ImageVideoCarousel.defaultProps = {
  z: 1,
  block: {
    fields: {
      title: ''
    }
  },
  setRef: () => {}
};

export default ImageVideoCarousel;
