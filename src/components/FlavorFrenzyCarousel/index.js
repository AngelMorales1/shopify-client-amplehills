import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Nuka from 'nuka-carousel';
import get from 'lodash/get';

import Firestore from 'lib/Firestore';
import portableTextAsString from 'utils/portableTextAsString';

import { Button, PortableText } from 'components/base';
import styles from './FlavorFrenzyCarousel.scss';

const FlavorFrenzyCarousel = ({ flavorFrenzy, votes }) => {
  const round = get(flavorFrenzy, 'activeRound');
  const matches = get(round, 'matches', []);
  const [index, setIndex] = useState(0);
  const [pendingVote, setPendingVote] = useState(null);

  if (!matches.length) return null;

  const setCarouselSlide = () => {
    const matchIds = matches.map(match => match._id);
    const nextMatch = matchIds.findIndex(id => !localStorage.getItem(id));

    if (nextMatch === 0) return setIndex(nextMatch);
    if (nextMatch < 0) return setIndex(matches.length);

    return setIndex(nextMatch);
  };

  useEffect(() => {
    if (pendingVote) {
      const vote = async () => {
        await Firestore.FlavorFrenzy.createVote(pendingVote);
        localStorage.setItem(pendingVote.match, pendingVote.flavor);
        setCarouselSlide();
        setPendingVote(null);
      };

      vote();
    }
  }, [pendingVote, setPendingVote]);

  useEffect(setCarouselSlide, []);

  const clearLocalStorage = () =>
    matches.forEach(match => localStorage.removeItem(match._id));
  const getPercentageOfVote = (match, flavor) => {
    const votesInMatch = votes.filter(vote => vote.match === match);
    const votesForFlavor = votesInMatch.filter(vote => vote.flavor === flavor);

    if (!votesInMatch.length || !votesForFlavor.length) return 0;

    return ((votesForFlavor.length / votesInMatch.length) * 100).toFixed(0);
  };

  return (
    <div
      className={cx(
        styles['FlavorFrenzyCarousel'],
        'bg-light-turquoise flex flex-column justify-center items-center relative pb1'
      )}
    >
      <Nuka
        slideIndex={index}
        afterSlide={setIndex}
        dragging={false}
        swiping={false}
        heightMode="current"
        renderCenterLeftControls={() => {}}
        renderCenterRightControls={() => {}}
        renderBottomCenterControls={props => (
          <ul className="flex items-center">
            {[...Array(matches.length + 1)].map((dot, i) => (
              <li
                key={i}
                className={cx(
                  styles['FlavorFrenzyCarousel__indicator'],
                  'inline-block'
                )}
              >
                <Button
                  className={cx('big events-none', {
                    'text-peach': true,
                    mb1: i === index
                  })}
                  variant="no-style"
                  label={i === index ? '\u26AC' : '\u2022'}
                  onClick={() => {}}
                />
              </li>
            ))}
          </ul>
        )}
      >
        {matches.map(match => (
          <div
            className={cx(
              styles['FlavorFrenzyCarousel__slide'],
              'flex items-center justify-center flex-column h100 w100'
            )}
          >
            <div
              className={cx(
                styles['FlavorFrenzyCarousel__slide-title'],
                'w100 center p3'
              )}
            >
              <span>Vote for a Flavor in Each Match Up!</span>
            </div>
            <div className="flex justify-center items-center w100">
              {[match.flavor1, match.flavor2].map(flavor => (
                <div
                  className={cx(
                    styles['FlavorFrenzyCarousel__vote-card'],
                    'bg-white relative'
                  )}
                >
                  <div
                    className={cx(
                      styles['FlavorFrenzyCarousel__vote-card-info'],
                      'flex flex-column'
                    )}
                  >
                    <span className="small-title text-peach mb1">Vote for</span>
                    <span
                      className={cx(
                        styles['FlavorFrenzyCarousel__card-title'],
                        'mb2'
                      )}
                    >
                      {flavor.name}
                    </span>
                    <span className="markdown-block small mb2 xs-hide sm-hide">
                      <PortableText blocks={flavor.description} />
                    </span>
                    <span
                      className={cx(
                        'markdown-block extra-small mb2 md-hide lg-hide',
                        {
                          'extra-small':
                            portableTextAsString(flavor.description).length <
                            160,
                          'xx-small':
                            portableTextAsString(flavor.description).length >=
                            160
                        }
                      )}
                    >
                      <PortableText blocks={flavor.description} />
                    </span>
                  </div>
                  <div
                    className={cx(
                      styles['FlavorFrenzyCarousel__card-controls'],
                      'absolute b0 l0 flex w100'
                    )}
                  >
                    <Button
                      variant="primary"
                      color="madison-blue"
                      className={cx(
                        styles['FlavorFrenzyCarousel__vote-button'],
                        'align-end'
                      )}
                      disabled={
                        !!pendingVote || localStorage.getItem(match._id)
                      }
                      onClick={() =>
                        setPendingVote({
                          flavorFrenzy: flavorFrenzy._id,
                          round: round._id,
                          match: match._id,
                          flavor: flavor._id
                        })
                      }
                    >
                      Choose Flavor
                    </Button>
                    <div
                      className={cx(
                        styles['FlavorFrenzyCarousel__vote-count'],
                        'flex items-center justify-center'
                      )}
                    >
                      <span className="callout text-peach xs-hide sm-hide">
                        {getPercentageOfVote(match._id, flavor._id)}%
                      </span>
                      <p className="bold extra-small pb1 md-hide lg-hide">
                        {getPercentageOfVote(match._id, flavor._id)}% &nbsp;
                      </p>
                      <p className="text-peach extra-small pb1 uppercase semi-bold">
                        of the vote
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div
          className={cx(
            styles['FlavorFrenzyCarousel__slide'],
            'flex items-center justify-center flex-column h100 w100 bg-light-turquoise p2'
          )}
        >
          <span className="small-title text-peach mb2">
            {flavorFrenzy.name}
          </span>
          <div
            className={cx(
              styles['FlavorFrenzyCarousel__slide-title'],
              'w100 center mb4'
            )}
          >
            <span>Thank you for participating!</span>
          </div>
          <div className="flex flex-column items-center justify-center center">
            <p className="mb2">
              We will announce the winning flavor when all rounds are completed.
            </p>
            <p className="mb4">
              Think you know which flavor will win? Enter your prediction to win
              a delicious prize!
            </p>
            <Button
              variant="primary"
              color="madison-blue"
              onClick={clearLocalStorage}
            >
              Enter to Win
            </Button>
          </div>
        </div>
      </Nuka>
    </div>
  );
};

export default FlavorFrenzyCarousel;
