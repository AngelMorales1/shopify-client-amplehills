import React from 'react';
import { shallow } from 'enzyme';

import ProductHero from 'components/ProductHero';

it('renders without data', () => {
  const component = shallow(<ProductHero />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ProductHero
      block={{
        field: {
          title: 'foo',
          image: {
            sys: {
              space: {
                sys: {
                  type: 'foo',
                  linkType: 'foo',
                  id: 'foo'
                }
              },
              id: 'foo',
              type: 'foo',
              createdAt: 'foo',
              updatedAt: 'foo',
              environment: {
                sys: {
                  id: 'foo',
                  type: 'foo',
                  linkType: 'foo'
                }
              },
              revision: 0,
              locale: 'foo'
            },
            fields: {
              title: 'foo',
              file: {
                url: 'foo',
                details: {
                  size: 0,
                  image: {
                    width: 0,
                    height: 0
                  }
                },
                fileName: 'foo',
                contentType: 'foo'
              }
            }
          },
          titleIllustration: {
            sys: {
              space: {
                sys: {
                  type: 'foo',
                  linkType: 'foo',
                  id: 'foo'
                }
              },
              id: 'foo',
              type: 'foo',
              createdAt: 'foo',
              updatedAt: 'foo',
              environment: {
                sys: {
                  id: 'foo',
                  type: 'foo',
                  linkType: 'foo'
                }
              },
              revision: 0,
              locale: 'foo'
            },
            fields: {
              title: 'foo',
              details: {
                size: 0,
                image: {
                  width: 0,
                  height: 0
                }
              },
              fileName: 'foo',
              contentType: 'foo'
            }
          }
        },
        backgroundColor: 'foo'
      }}
      product={{
        available: true,
        subItemsAvailable: true,
        price: 0
      }}
      ourPledge={{
        shippingInformation: 'foo',
        title: 'foo',
        shippingPledge: 'foo',
        overlayContentImage: {
          sys: {
            space: {
              sys: {
                type: 'foo',
                linkType: 'foo',
                id: 'foo'
              }
            },
            id: 'foo',
            type: 'foo',
            createdAt: 'foo',
            updatedAt: 'foo',
            environment: {
              sys: {
                id: 'foo',
                type: 'foo',
                linkType: 'foo'
              }
            },
            revision: 0,
            locale: 'foo'
          },
          fields: {
            title: 'foo',
            file: {
              url: 'foo',
              details: {
                size: 0,
                image: {
                  width: 0,
                  height: 0
                }
              },
              fileName: 'foo',
              contentType: 'foo'
            }
          }
        },
        calloutImage: {
          sys: {
            space: {
              sys: {
                type: 'foo',
                linkType: 'foo',
                id: 'foo'
              }
            },
            id: 'foo',
            type: 'foo',
            createdAt: 'foo',
            updatedAt: 'foo',
            environment: {
              sys: {
                id: 'foo',
                type: 'foo',
                linkType: 'foo'
              }
            },
            revision: 0,
            locale: 'foo'
          },
          fields: {
            title: 'foo',
            file: {
              url: 'foo',
              details: {
                size: 0,
                image: {
                  width: 0,
                  height: 0
                }
              },
              fileName: 'foo',
              contentType: 'foo'
            }
          }
        }
      }}
      ourPledgeOverlayIsOpen={false}
      actions={{
        addLineItems: () => console.log('foo'),
        closeOurPledge: () => console.log('foo'),
        fetchOurPledge: () => console.log('foo'),
        openOurPledge: () => console.log('foo')
      }}
      z={0}
    />
  );

  expect(component).toMatchSnapshot();
});
