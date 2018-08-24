import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import imageModel from 'models/imageModel';

import styles from './PressCarousel.scss';
import { Image, Button, HorizontalCarousel } from 'components/base';

const PressCarousel = ({ block, z, latestPressItems }) => {
  const type = get(
    block,
    'sys.contentType.sys.id',
    'blockPressHorizontalCarousel'
  );
  const fields = get(block, 'fields', {});
  const isDripOn = get(fields, 'drip', false);
  const customOrder = get(fields, 'customOrder', false);
  const showCardNumber = get(fields, 'showCardNumber', null);
  const sortByLatest = get(fields, 'sortByLatest', true);
  let pressItems = customOrder ? get(fields, 'pressItems') : latestPressItems;

  if (typeof showCardNumber === 'number') {
    pressItems = pressItems.slice(0, showCardNumber);
  }

  return (
    <div
      style={{ zIndex: z }}
      className={cx(styles['PressCarousel'], { drip: isDripOn }, 'bg-bees-wax')}
    >
      <HorizontalCarousel
        title={get(fields, 'title', '')}
        buttonLink={get(fields, 'buttonLink', '')}
        buttonLabel={get(fields, 'buttonLabel', '')}
        isReverseOrder={!customOrder && !sortByLatest ? true : false}
      >
        {pressItems.map((pressItem, i) => {
          const fields = get(pressItem, 'fields', {});

          return (
            <div
              key={get(pressItem, 'sys.id', '') + i}
              className={cx(
                styles['PressCarousel__card'],
                'bg-white p3 flex flex-column justify-center items-center'
              )}
            >
              <Image
                className={cx(styles['PressCarousel__logo'])}
                src={contentfulImgUtil(
                  get(fields, 'logoImage.fields.file.url', ''),
                  '200',
                  'png'
                )}
                alt={`${fields.title} logo`}
              />
              <span
                className={cx(
                  styles['PressCarousel__quote'],
                  'carter text-peach center py3'
                )}
              >{`"${fields.quote}"`}</span>
              <Button
                className={cx(
                  styles['PressCarousel__button'],
                  'uppercase detail'
                )}
                to={fields.linkUrl}
                label="Read about it"
                variant="primary-small"
                color="peach"
              />
            </div>
          );
        })}
      </HorizontalCarousel>
    </div>
  );
};

export default PressCarousel;

// HorizontalCarousel.propTypes = {
//   block: PropTypes.shape({
//     fields: PropTypes.shape({
//       buttonLabel: PropTypes.string,
//       buttonLink: PropTypes.string,
//       pressItems: PropTypes.arrayOf(
//         PropTypes.shape({
//           fields: PropTypes.shape({
//             linkUrl: PropTypes.string,
//             logoImage: imageModel.propTypes,
//             quote: PropTypes.string,
//             title: PropTypes.string
//           }),
//           sys: PropTypes.shape({
//             id: PropTypes.string
//           })
//         })
//       ),
//       customOrder: PropTypes.bool,
//       drip: PropTypes.bool,
//       sortByLatest: PropTypes.bool,
//       title: PropTypes.string
//     }),
//     sys: PropTypes.shape({
//       id: PropTypes.string
//     })
//   }),
//   z: PropTypes.number,
//   press: PropTypes.arrayOf(
//     PropTypes.shape({
//       fields: PropTypes.shape({
//         linkUrl: PropTypes.string,
//         logoImage: imageModel.propTypes,
//         quote: PropTypes.string,
//         title: PropTypes.string
//       }),
//       sys: PropTypes.shape({
//         id: PropTypes.string
//       })
//     })
//   )
// };

// HorizontalCarousel.defaultProps = {
//   block: {
//     fields: {
//       buttonLabel: '',
//       buttonLink: '',
//       pressItems: [
//         {
//           fields: {
//             linkUrl: '',
//             logoImage: imageModel.default,
//             quote: '',
//             title: ''
//           },
//           sys: {
//             id: ''
//           }
//         }
//       ],
//       customOrder: false,
//       drip: false,
//       sortByLatest: true,
//       title: ''
//     },
//     sys: {
//       id: ''
//     }
//   },
//   z: 0,
//   press: [
//     {
//       fields: {
//         linkUrl: '',
//         logoImage: imageModel.default,
//         quote: '',
//         title: ''
//       },
//       sys: {
//         id: ''
//       }
//     }
//   ]
// };
