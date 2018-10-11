export const shopifyProducts = {
  'test-product': {
    available: true,
    handle: 'test-product',
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMzUyMDIwNzcwODIzNQ==',
    price: 10,
    variants: [
      {
        available: true,
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMzUyMDIwNzcwODIzNQ==',
        price: 10,
        title: 'Adult XS'
      },
      {
        available: true,
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMzUyMDIwNzc0MTAwMw==',
        price: 20,
        title: 'Adult S'
      }
    ]
  }
};

export const contentfulProducts = [
  {
    fields: {
      description:
        'Now you can wear your Ample Hills pride on your sleeve! Featuring our full color two-scoop spiral cone designed by Ample Hills art director Lauren Kaelin.',
      detailsContent:
        '52% Cotton 48% Polyester Blend</br>↵Sewn label</br>↵Side-seamed</br>↵30 singles</br>↵4.2 oz. fabric ',
      detailsTitle: 'Shirt Details',
      handle: 'test-product',
      images: [
        {
          sys: {
            createdAt: '2018-10-09T13:43:32.680Z',
            environment: {
              sys: { id: 'master', type: 'Link', linkType: 'Environment' }
            },
            id: '7kPSxBcIeWYGoYCEuOoYwI',
            locale: 'en-US',
            revision: 1,
            space: {
              sys: { type: 'Link', linkType: 'Space', id: '4zpl0f2uus7y' }
            },
            type: 'Asset',
            updatedAt: '2018-10-09T13:43:32.680Z'
          },
          fields: {
            file: {
              contentType: 'image/png',
              fileName: 'shirt-main_1024x1024.png',
              url:
                '//images.ctfassets.net/4zpl0f2uus7y/7kPSxBcIeWYGoYCEuOoYwI/aa87b201c48090fee8c2261ca494b02f/shirt-main_1024x1024.png',
              details: {
                size: 2196215,
                image: {
                  height: 956,
                  width: 1296
                }
              }
            },
            title: 'shirt-main 1024x1024'
          }
        }
      ],
      title: 'Ample Hills T-Shirt'
    }
  }
];
