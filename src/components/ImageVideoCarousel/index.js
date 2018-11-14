import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import Global from 'constants/Global';

import styles from './ImageVideoCarousel.scss';
import { Carousel } from 'components/base';

class ImageVideoCarousel extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label,
    activeSlide: 0
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

  getIframeSrc = (videoIsFromYoutube, videoUrl) => {
    if (videoIsFromYoutube) {
      const videoId = videoUrl.split('watch?v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    const videoId = videoUrl.split('vimeo.com/')[1];
    return `https://player.vimeo.com/video/${videoId}?badge=0`;
  };

  render() {
    const { block, z, setRef } = this.props;
    const fields = get(block, 'fields', {});
    const title = get(fields, 'title', '');
    const contents = get(fields, 'contents', []);
    const isDripOn = get(fields, 'drip', false);
    const isUpperDripOn = get(fields, 'upperDrip', false);
    const currentBreakpointIsSmall = this.state.currentBreakpoint === 'small';

    return (
      <div
        ref={refBlock => setRef(refBlock)}
        style={{ zIndex: z }}
        className={cx(styles['ImageVideoCarousel'], 'px3 py4 bg-white', {
          drip: isDripOn,
          'upper-drip': isUpperDripOn
        })}
      >
        <div className="flex flex-column justify-center items-center my4">
          <h2 className="block-headline">{title}</h2>
          <Carousel
            index={this.state.activeSlide}
            onChange={activeSlide => this.setState({ activeSlide })}
            showDotsOnImage={currentBreakpointIsSmall ? false : true}
            showArrows={currentBreakpointIsSmall ? false : true}
            className={cx(
              styles['ImageVideoCarousel__carousel'],
              'col-12 md-col-8 mx-auto mt3'
            )}
          >
            {contents.map((content, i) => {
              const contentFields = get(content, 'fields', {});
              const url = get(contentFields, 'file.url', '');
              const id = get(content, 'sys.id', '');
              const videoUrl = get(contentFields, 'description', '');
              const contentIsYoutube = videoUrl.includes('youtube');
              const contentIsVimeo = videoUrl.includes('vimeo');

              return (
                <div key={id} className="col-12 md-col-11 mx-auto py-auto">
                  {contentIsYoutube || contentIsVimeo ? (
                    <div
                      className={cx(
                        styles['ImageVideoCarousel__iframe-container'],
                        'relative'
                      )}
                    >
                      <iframe
                        title="ImageCideoCarouselIframe"
                        className="absolute t0 l0 wh100"
                        src={this.getIframeSrc(contentIsYoutube, videoUrl)}
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-ratio-16-9"
                      style={{
                        background: `url(${contentfulImgUtil(
                          url,
                          '1200'
                        )}) no-repeat center`,
                        backgroundSize: 'contain'
                      }}
                    />
                  )}
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
      title: PropTypes.string,
      drip: PropTypes.bool,
      contents: PropTypes.array
    })
  }),
  setRef: PropTypes.func
};

ImageVideoCarousel.defaultProps = {
  z: 1,
  block: {
    fields: {
      title: '',
      drip: false,
      contents: []
    }
  },
  setRef: () => {}
};

export default ImageVideoCarousel;
