import * as functions from 'firebase-functions';
import * as uuid from 'uuid';
// import fs from 'fs';
import get from 'lodash/get';

import Harrisburg from './shipping/harrisburg';
import Reno from './shipping/reno';

import { ShippingRate, ShopifyRateItem } from 'types';

const SubsidizedEtailerFees = {
  ONE_DAY_GROUND: 1999,
  TWO_DAY_GROUND: 2499,
  THREE_DAY_GROUND: 3499,
  FOUR_DAY_GROUND: 3999,
  OVERNIGHT_AIR: 7999,
  TWO_DAY_AIR: 7999
}

// Actual Fees
// const EtailerFees = {
//   FOUR_PACK: {
//     ONE_DAY_GROUND: 3536,
//     TWO_DAY_GROUND: 3952,
//     THREE_DAY_GROUND: 5239,
//     FOUR_DAY_GROUND: 6287,
//     OVERNIGHT_AIR: 10438,
//     TWO_DAY_AIR: 9953
//   },
//   SIX_PACK: {
//     ONE_DAY_GROUND: 3536,
//     TWO_DAY_GROUND: 3966,
//     THREE_DAY_GROUND: 5379,
//     FOUR_DAY_GROUND: 6416,
//     OVERNIGHT_AIR: 10848,
//     TWO_DAY_AIR: 10491
//   }
// };

const shouldCalculateShipping = function(): boolean {
  // return get(request, 'body.rate.destination.company_name', '') === 'Sanctuary Computer';
  return true;
};

const costFromTimeInTransit = function(tnt: number): number {
  // All TNTs longer than 3 days default to 2-day air shipping
  // so the ice cream doens't melt.
  if (tnt === 1) return SubsidizedEtailerFees.ONE_DAY_GROUND;
  if (tnt === 2) return SubsidizedEtailerFees.TWO_DAY_GROUND;
  if (tnt === 3) return SubsidizedEtailerFees.THREE_DAY_GROUND;
  if (tnt === 4) return SubsidizedEtailerFees.TWO_DAY_AIR;
  if (tnt === 5) return SubsidizedEtailerFees.TWO_DAY_AIR;
  if (tnt === 6) return SubsidizedEtailerFees.TWO_DAY_AIR;

  return SubsidizedEtailerFees.TWO_DAY_AIR;
};

const orderAsBoxes = function(items: ShopifyRateItem[]): number[] {
  const totalPints = items.reduce((totalPints: number, item: ShopifyRateItem) => {
    if (!item || !item.grams || !item.quantity) return totalPints;

    return totalPints + item.quantity;
  }, 0);

  const numberOfSixPacks = Math.floor(totalPints / 6);
  const remainder = totalPints % 6;

  const boxes: number[] = [remainder];
  for (let i = 0; i < numberOfSixPacks; i++) {
    boxes.push(6);
  }

  return boxes;
}

const bestTimeInTransitForDestination = function(destination: string): number | null {
  const reno = get(Reno, destination);
  const harrisburg = get(Harrisburg, destination);

  if (!reno && !harrisburg) return null;

  const timesInTransit = [
    reno, harrisburg
  ].sort(function(a, b) {
    return a - b;
  });

  return !!timesInTransit.length ? timesInTransit[0] : null;
}

export const shipping = {
  calculate: functions.https.onRequest((request, response) => {
    const id = uuid.v4();

    functions.logger.info(
      `Ample Logger: Incoming Request ${id}`,
      { body: request.body }
    );

    let rates: ShippingRate[] = [];
    if (shouldCalculateShipping()) {
      const destination = get(request, 'body.rate.destination.postal_code', '');
      const tnt = bestTimeInTransitForDestination(destination);

      if (tnt) {
        const items = get(request, 'body.rate.items', []) as ShopifyRateItem[];
        const boxes = orderAsBoxes(items);
        const costPerBox = costFromTimeInTransit(tnt);
        const shippingCost = boxes.length * costPerBox;

        functions.logger.info(
          `Ample Logger: Calculated Cost ${id}`,
          { destination, tnt, boxes, costPerBox, shippingCost }
        );

        if (shippingCost) {
          console.log('Shipping cost calcuated');
          rates = rates.concat([
            {
              service_name: 'Shipping & Handling',
              service_code: 'ample_hills_shipping',
              description: `Frozen delivery guaranteed! Tracking number to follow.`,
              currency: 'USD',
              total_price: shippingCost
            }
          ]);
        }
      }
    }

    const res = { rates };

    functions.logger.info(
      `Ample Logger: Outgoing Response ${id}`,
      { res }
    );

    response.json(res);
  })
};
