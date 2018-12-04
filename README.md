# Ample Hills Shopify Storefront

This repo is a `create-react-app` that connects a Contentful space and a Shopify Storefront to host the new website for Ample Hills Creamery.

### To install:

```bash
git clone https://github.com/sanctuarycomputer/ample-hills.git
cd ample-hills

# use either for NPM package installation
yarn
npm install
```

### To run:

```bash
yarn start
```

---

## Shopify Thank You Page

This app still uses the Shopify Checkout portal. It relies on scripts that are saved in the "Checkout Thank You Page Additional Scripts" section of the Shopify admin. These scripts run on the Thank You page to provide two services:

1.  **Cake Deposit Fulfillment:** Fulfillment information is added to Cake Deposit products using customer properties. This ensures that the proper scoop shop manager receives the cake request.

2.  **Party Booking Dispatcher**: This will register the purchased time slot at the desired location on Google Calendar using Timekit.

The gist containing the scripts can be found here:
https://gist.github.com/joshiefishbein/c4a0c89afdbcf5993f41b96d218246d1
