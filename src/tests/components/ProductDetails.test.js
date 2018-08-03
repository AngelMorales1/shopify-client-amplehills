import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from 'components/ProductDetails';

it('renders without data', () => {
  const component = shallow(<ProductDetails />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ProductDetails
      actions={{
        addLineItems: () => console.log('foo'),
        fetchOurPledge: () => console.log('foo'),
        openOurPledge: () => console.log('foo'),
        closeOurPledge: () => console.log('foo')
      }}
      addLineItemsStatus={'foo'}
      block={{
        fields: {
          color: 'foo',
          productDetails: [
            {
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
                contentType: {
                  sys: {
                    type: 'foo',
                    linkType: 'foo',
                    id: 'foo'
                  }
                },
                locale: 'foo'
              },
              fields: {
                title: 'foo',
                description: 'foo',
                pintImage: {
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
                details: 'foo',
                detailsImage: {
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
                    locale: 0
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
                flavorHighlight: 'foo',
                flavorHighlightImage: {
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
                oneLineDescription: 'foo',
                text1: 'foo',
                text1Image: {
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
                text2: 'foo',
                text2Image: {
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
              }
            }
          ],
          title: 'foo'
        },
        sys: {
          contentType: { sys: {} },
          createdAt: 'foo',
          environment: { sys: {} },
          id: 'foo',
          locale: 'foo',
          revision: 0,
          space: { sys: {} },
          type: 'foo',
          updatedAt: 'foo'
        }
      }}
      z={0}
    />
  );

  expect(component).toMatchSnapshot();
});
