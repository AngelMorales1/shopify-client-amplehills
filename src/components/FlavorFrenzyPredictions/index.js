import React, { Fragment, useState, useEffect } from 'react';
import get from 'lodash/get';
import cx from 'classnames';

import isValidEmailAddress from 'utils/isValidEmailAddress';
import Klaviyo from 'lib/Klaviyo';
import { PortableText, Radio, Button, Modal, TextField } from 'components/base';
import styles from './FlavorFrenzyPredictions.scss';

const FlavorFrenzyPredictions = ({ flavorFrenzy }) => {
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [predictionPending, setPredictionPending] = useState(false);
  const flavorFrenzyPredictionKey = `${flavorFrenzy._id}`;
  const prediction = localStorage.getItem(flavorFrenzyPredictionKey);

  useEffect(() => {
    if (!!predictionPending) {
      const submitPrediction = async function() {
        await Klaviyo.flavorFrenzyPrediction(email, selectedFlavor);
        localStorage.setItem(flavorFrenzyPredictionKey, selectedFlavor);

        setPredictionPending(false);
        setModalIsActive(false);
      };

      submitPrediction();
    }
  }, [predictionPending]);

  const flavors = get(flavorFrenzy, 'flavors', []);
  const title = get(flavorFrenzy, 'predictions.title');
  const description = get(flavorFrenzy, 'predictions.description');

  if (!flavors.length) return null;

  return (
    <div
      className={cx(
        styles['FlavorFrenzyPredictions'],
        'bg-light-turquoise w100 flex flex-column justify-center items-center px2 py4'
      )}
    >
      {!!prediction ? (
        <div className="flex flex-column items-center justify-center col-12 md-col-8 lg-col-4 center mb3">
          <h2 className={cx(styles['FlavorFrenzyPredictions__title'])}>
            Your Prediction Is In!
          </h2>
          <span className="copy">
            You predicted <strong>{prediction}</strong> will win Flavor Frenzy
            2021. Voting will open soon, so watch your email inbox for Flavor
            Frenzy updates!
          </span>
        </div>
      ) : (
        <Fragment>
          <div className="flex flex-column items-center justify-center col-12 md-col-8 lg-col-5 center mb2">
            <h2 className={cx(styles['FlavorFrenzyPredictions__title'])}>
              {title}
            </h2>
            {!!description && (
              <div className="markdown-block portable-text">
                <PortableText blocks={description} />
              </div>
            )}
          </div>
          <div className="container-width mxauto flex items-center justify-center flex-wrap mb4">
            {flavors
              .sort((a, b) => a.name.length - b.name.length)
              .map(flavor => (
                <div
                  className={cx(
                    styles['FlavorFrenzyPredictions__flavor'],
                    'col-6 md-col-3 mb3 pr1'
                  )}
                >
                  <Radio
                    checked={flavor.name === selectedFlavor}
                    label={flavor.name}
                    onClick={() => setSelectedFlavor(flavor.name)}
                  />
                </div>
              ))}
          </div>
          <Button
            variant="primary"
            color="madison-blue"
            disabled={!selectedFlavor}
            onClick={() => setModalIsActive(true)}
          >
            Choose Flavor
          </Button>
          {!!modalIsActive && (
            <Modal>
              <div className="flex flex-column">
                <span className="sub-title mb2">Confirm Prediction</span>
                <span className="markdown-block pr1">
                  <p>
                    You have selection <strong>{selectedFlavor}</strong> as your
                    prediction. Enter your email below and win a prize if you
                    are correct!
                  </p>
                </span>
              </div>
              <form>
                <div className="mt3 mb4">
                  <TextField
                    value={email}
                    onChange={setEmail}
                    color="light-gray"
                    className="my3"
                    type="text"
                    label="Email address"
                    placeholder="example@amplehills.com"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="style-none"
                    label="Cancel"
                    className="text-peach mr2"
                    onClick={() => setModalIsActive(false)}
                  />
                  <Button
                    disabled={!isValidEmailAddress(email) || predictionPending}
                    color="madison-blue"
                    label="Submit"
                    onClick={() => setPredictionPending(true)}
                  />
                </div>
              </form>
            </Modal>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default FlavorFrenzyPredictions;
