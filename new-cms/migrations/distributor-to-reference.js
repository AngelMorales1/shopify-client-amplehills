// Done on 8/13/21 to link retailLocations to the new document type for distributors

const sanityClient = require('@sanity/client');

const Sanity = sanityClient({
  projectId: '1v8tcmfe',
  dataset: 'production',
  useCdn: false,
  token: 'needs_token'
});

const migrate = async () => {
  const retailers = await Sanity.fetch(`*[_type == 'retailLocation']`);
  const distributors = await Sanity.fetch(`*[_type == 'distributor']`);

  for (let i = 0; i < retailers.length; i++) {
    const retailer = retailers[i];
    const distributor = distributors.find(
      distributor => distributor.title === retailer.distributor
    );

    if (distributor) {
      const distributorRef = {
        _ref: distributor._id,
        _type: 'reference'
      };

      console.log(distributorRef);
      await Sanity.patch(retailer._id)
        .setIfMissing({ distributor_ref: distributorRef })
        .commit();
    } else {
      console.log('FAIL');
    }
  }
};

migrate();
