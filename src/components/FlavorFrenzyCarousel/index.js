import React, { useState, useEffect, createRef } from 'react';
import cx from 'classnames';
import Nuka from 'nuka-carousel';
import get from 'lodash/get';
import scrollTo from 'react-scroll-to-component';

import SCROLL_OPTIONS from 'constants/SubNavScrollOption';
import Global from 'constants/Global';

import Firestore from 'lib/Firestore';
import portableTextAsString from 'utils/portableTextAsString';
import getUrlParam from 'utils/getUrlParam';

import { Button, PortableText, Image } from 'components/base';
import styles from './FlavorFrenzyCarousel.scss';

const FlavorFrenzyCarousel = ({ flavorFrenzy, votes }) => {
  const carouselRef = createRef();
  const round = get(flavorFrenzy, 'activeRound');
  const matches = get(round, 'matches', []);
  const [breakpoint, setBreakpoint] = useState(Global.breakpoints.small.label);
  const [index, setIndex] = useState(0);
  const [pendingVote, setPendingVote] = useState(false);

  if (!matches.length) return null;

  const [selectedVotes, setSelectedVotes] = useState(
    matches.reduce((selectedVotes, match) => {
      selectedVotes[match._id] = null;

      return selectedVotes;
    }, {})
  );

  const getPercentageOfVote = (match, flavor) => {
    const votesInMatch = votes.filter(vote => vote.match === match);
    const votesForFlavor = votesInMatch.filter(vote => vote.flavor === flavor);

    if (!votesInMatch.length || !votesForFlavor.length) return 0;

    return ((votesForFlavor.length / votesInMatch.length) * 100).toFixed(0);
  };

  const previousSlide = () => {
    if (index === 0) return;

    setIndex(index - 1);
  };

  const nextSlide = () => {
    if (index === matches.length) return;

    setIndex(index + 1);
  };

  const advanceToNextMatch = () => {
    const nextMatch = Object.values(selectedVotes).findIndex(vote => !vote);

    if (nextMatch < 0) return setIndex(matches.length);

    return setIndex(nextMatch);
  };

  useEffect(advanceToNextMatch, []);
  useEffect(advanceToNextMatch, [selectedVotes]);

  const updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (breakpoint !== currentBreakpoint) {
      setBreakpoint(currentBreakpoint);
    }
  };
  useEffect(updateWindow, []);

  useEffect(() => {
    if (pendingVote) {
      const vote = async () => {
        await Promise.all(
          Object.entries(selectedVotes).map(([match, flavor]) => {
            return Firestore.FlavorFrenzy.createVote({
              flavorFrenzy: flavorFrenzy.name,
              round: round._id,
              match,
              flavor
            });
          })
        );
        localStorage.setItem(flavorFrenzy.name, true);
        window.location.href = '/flavor-frenzy-2021/thank-you';
      };

      vote();
    }
  }, [pendingVote, setPendingVote]);

  const hasVoted = !!localStorage.getItem(flavorFrenzy.name);
  useEffect(() => {
    if (getUrlParam('clear')) localStorage.removeItem(flavorFrenzy.name);
  }, []);

  useEffect(() => {
    if (index === matches.length) {
      scrollTo(carouselRef.current, {
        ...SCROLL_OPTIONS
      });
    }
  }, [index]);

  return (
    <div
      ref={carouselRef}
      className={cx(
        styles['FlavorFrenzyCarousel'],
        'bg-light-turquoise flex flex-column justify-center items-center relative pb1'
      )}
    >
      {hasVoted ? (
        <div
          className={cx(
            styles['FlavorFrenzyCarousel__success'],
            'flex flex-column justify-center items-center p2'
          )}
        >
          <div
            className={cx(
              styles['FlavorFrenzyCarousel__slide-title'],
              'w100 center mb2'
            )}
          >
            <span>Thank you for participating.</span>
          </div>
          <div className="flex flex-column items-center justify-center center markdown-block">
            <p className="mb2 col-12 md-col-8">
              Your vote is locked in and the tallying is underway. Stay tuned
              for updates on the winners of this round!
            </p>
          </div>
        </div>
      ) : (
        <Nuka
          slideIndex={index}
          afterSlide={setIndex}
          dragging={false}
          swiping={false}
          heightMode="current"
          renderCenterLeftControls={() => {}}
          renderCenterRightControls={() => {}}
          renderBottomCenterControls={props => (
            <div className="flex items-center justify-center w100">
              <Button
                variant="no-style"
                className="mb1 mr2"
                onClick={previousSlide}
              >
                <Image src="/assets/images/icon-pagination-previous-arrow.svg" />
              </Button>
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
                      className={cx('big', {
                        'text-peach': true,
                        mb1: i === index
                      })}
                      variant="no-style"
                      label={i === index ? '\u26AC' : '\u2022'}
                      onClick={() => setIndex(i)}
                    />
                  </li>
                ))}
              </ul>
              <Button
                variant="no-style"
                className="mb1 ml2"
                onClick={nextSlide}
              >
                <Image src="/assets/images/icon-pagination-next-arrow.svg" />
              </Button>
            </div>
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
                      <span className="small-title text-peach mb1">
                        Vote for
                      </span>
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
                        onClick={() => {
                          setSelectedVotes({
                            ...selectedVotes,
                            [match._id]: flavor._id
                          });
                        }}
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
              <span>Confirm Your Vote</span>
            </div>
            <div className="flex flex-column items-center justify-center center markdown-block">
              <p className="mb2 col-12 md-col-6">
                Review your selected flavors and confirm your vote by clicking
                the button below. Once confirmed, your vote for this round will
                be locked in!
              </p>
            </div>
            <div className="my3 flex flex-wrap items-center container-width mxauto">
              {Object.entries(selectedVotes).map(([match, flavor]) => {
                const matchIndex = matches.findIndex(
                  matchObj => matchObj._id === match
                );
                const chosenFlavor = flavorFrenzy.flavors.find(
                  frenzyFlavor => frenzyFlavor._id === flavor
                );

                return chosenFlavor ? (
                  <div
                    className={cx(
                      styles['FlavorFrenzyCarousel__confirm-card'],
                      'col-6 md-col-4 lg-col-3 p1'
                    )}
                  >
                    <div
                      className={cx(
                        styles['FlavorFrenzyCarousel__confirm-card__inner'],
                        'flex flex-column justify-between bg-white p2'
                      )}
                    >
                      <div className="flex flex-column">
                        <div className="flex items-center mb2">
                          <Image
                            className="xs-hide sm-hide mr1"
                            src="/assets/images/icon-check.svg"
                            alt="checkmark"
                          />
                          <span className="carter">
                            {chosenFlavor && chosenFlavor.name}
                          </span>
                        </div>
                        <span className="markdown-block extra-small mb2 xs-hide sm-hide">
                          <PortableText blocks={chosenFlavor.description} />
                        </span>
                        <span
                          className={cx(
                            'markdown-block extra-small mb2 md-hide lg-hide',
                            {
                              'extra-small':
                                portableTextAsString(chosenFlavor.description)
                                  .length < 160,
                              'xx-small':
                                portableTextAsString(chosenFlavor.description)
                                  .length >= 160
                            }
                          )}
                        >
                          <PortableText blocks={chosenFlavor.description} />
                        </span>
                      </div>

                      <Button
                        color="madison-blue"
                        variant="primary-small"
                        label="Change Vote"
                        onClick={() => {
                          setIndex(matchIndex);
                          scrollTo(carouselRef.current, {
                            ...SCROLL_OPTIONS,
                            offset:
                              breakpoint === Global.breakpoints.small.label
                                ? -window.innerHeight
                                : -200
                          });
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={cx(
                      styles['FlavorFrenzyCarousel__confirm-card'],
                      'col-6 md-col-4 lg-col-3 p1'
                    )}
                  >
                    <div
                      className={cx(
                        styles['FlavorFrenzyCarousel__confirm-card__inner'],
                        'flex flex-column justify-between bg-white p2'
                      )}
                    >
                      <div className="flex flex-column items-center justify-center mb2 center mt3">
                        <span className="callout">
                          {matches[matchIndex].flavor1.name}
                        </span>
                        <span className="callout-small text-peach">vs.</span>
                        <span className="callout">
                          {matches[matchIndex].flavor2.name}
                        </span>
                      </div>
                      <Button
                        color="peach"
                        variant="primary-small"
                        label="Choose Flavor"
                        onClick={() => {
                          setIndex(matchIndex);
                          scrollTo(carouselRef.current, {
                            ...SCROLL_OPTIONS
                          });
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-column items-center justify-center center">
              <Button
                variant="primary"
                color="peach"
                disabled={
                  pendingVote ||
                  Object.values(selectedVotes).some(vote => !vote)
                }
                onClick={() => setPendingVote(true)}
              >
                Confirm Vote
              </Button>
            </div>
          </div>
        </Nuka>
      )}
    </div>
  );
};

export default FlavorFrenzyCarousel;
