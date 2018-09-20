export const shopifyProducts = {
  'test-event-1': {
    handle: 'test-event-1',
    available: true,
    price: 19.99,
    id: '9999',
    variants: [
      {
        available: true,
        price: 19.99,
        id: '9999'
      }
    ]
  },
  'test-event-2': {
    handle: 'test-event-2',
    available: false,
    price: 19.99,
    id: '9999',
    variants: [
      {
        available: false,
        price: 19.99,
        id: '9999'
      }
    ]
  },
  'test-event-3': {
    handle: 'test-event-3',
    available: true,
    price: 19.99,
    id: '9999',
    variants: [
      {
        available: true,
        price: 19.99,
        id: '9999'
      }
    ]
  }
};

export const contentProducts = {
  items: [
    {
      sys: {
        id: 'test-event-1'
      },
      fields: {
        datesAndTimes: {
          fragments: [
            [
              { key: 'uuid', value: '4d0e79' },
              {
                key: 'Date',
                type: 'Date',
                value: '2018-09-18T00:00:00.000Z',
                _schemaRef: '4c858a'
              },
              {
                key: 'Time',
                type: 'Symbol',
                value: '6:00PM - 7:00pm',
                _schemaRef: '9b3089'
              }
            ],
            [
              { key: 'uuid', value: 'd8671e' },
              {
                key: 'Date',
                type: 'Date',
                value: '2018-09-21T00:00:00.000Z',
                _schemaRef: '4c858a'
              },
              {
                key: 'Time',
                type: 'Symbol',
                value: '4:00pm - 6:00pm',
                _schemaRef: '9b3089'
              }
            ]
          ]
        },
        eventHandle: 'test-event-1',
        image: {
          fields: {
            file: {
              url:
                '//images.ctfassets.net/4zpl0f2uus7y/4HypiadFNCYy6GwCUwKuoU/2aad384077fca9ba28b889c71e438399/IMG_1197_large.png'
            }
          }
        },
        location: {
          fields: {
            phone: '000-000-0000',
            title: "At Bubby's High Line"
          },
          sys: {
            id: '5mLbZOuNJCaaYEq0ks6ewe'
          }
        },
        blockCardText: '',
        eventType: 'Ice Cream Socials',
        title: 'Ice Cream Social3',
        contentBlocks: [],
        text:
          "Join us for a postcard writing and crafting ice cream gathering benefiting Brooklyn Pride. We'll craft postcards, hear from our friends at Brooklyn Pride and indulge on ice cream with a pay-as-you-wish sundae bar.\n\nAll are always welcome!\n\nFor every pre-packed pint (at all our NY/NJ scoop shops) purchased on June 6th, we’ll donate $1 to Brooklyn Pride. #icecreamforgood"
      }
    },
    {
      sys: {
        id: 'test-event-2'
      },
      fields: {
        datesAndTimes: {
          fragments: [
            [
              { key: 'uuid', value: '1ee9bd' },
              {
                key: 'Date',
                type: 'Date',
                value: '2018-09-22T00:00:00.000Z',
                _schemaRef: '2157bf'
              },
              {
                key: 'Time',
                type: 'Symbol',
                value: '6:00pm - 10:00pm',
                _schemaRef: 'a05a00'
              }
            ]
          ]
        },
        eventHandle: 'test-event-2',
        blockCardText:
          'You’ll make a special ice cream flavor the old-fashioned way, taking turns riding our ice cream bicycle, churning with pedal-power! ',
        eventType: 'Ice Cream Socials',
        title: 'Ice Cream Social',
        image: {
          fields: {
            file: {
              url:
                '//images.ctfassets.net/4zpl0f2uus7y/4HypiadFNCYy6GwCUwKuoU/2aad384077fca9ba28b889c71e438399/IMG_1197_large.png'
            }
          }
        },
        location: {
          fields: {
            phone: '000-000-0000',
            title: 'Gowanus scoop shop'
          },
          sys: {
            id: '1VTQWA1tK0wASgi8UkWuWC'
          }
        },
        contentBlocks: [
          {
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: '4zpl0f2uus7y'
                }
              },
              id: '6CSGqLg8P6ioEgAsCwAcye',
              type: 'Entry',
              createdAt: '2018-08-27T18:47:15.342Z',
              updatedAt: '2018-08-30T22:55:45.992Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment'
                }
              },
              revision: 3,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'blockImageText'
                }
              },
              locale: 'en-US'
            },
            fields: {
              title: 'Our Community',
              image: {
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: '4zpl0f2uus7y'
                    }
                  },
                  id: '3R4DhhADjOKOgCuiumO0M0',
                  type: 'Asset',
                  createdAt: '2018-08-27T18:45:47.872Z',
                  updatedAt: '2018-08-27T18:45:47.872Z',
                  environment: {
                    sys: {
                      id: 'master',
                      type: 'Link',
                      linkType: 'Environment'
                    }
                  },
                  revision: 1,
                  locale: 'en-US'
                },
                fields: {
                  title: 'File 002 large',
                  file: {
                    url:
                      '//images.ctfassets.net/4zpl0f2uus7y/3R4DhhADjOKOgCuiumO0M0/fe215c13a8ed628180fa915544cd30ba/File_002_large.png',
                    details: {
                      size: 2137268,
                      image: {
                        width: 1412,
                        height: 1434
                      }
                    },
                    fileName: 'File_002_large.png',
                    contentType: 'image/png'
                  }
                }
              },
              text:
                'Whether it’s parents treating their kids to an after school sugar rush or a young couple sharing a first kiss over a milkshake, our Scoop Shops aren’t just about ice cream - they’re about the memories. We hope our shops feel as much yours as they are ours. That’s why each of our locations has an exclusive flavor inspired by the vibrant community that has welcomed us to their neighborhood. And we’re constantly looking for new ways to take care of our neighbors. Be it through partnerships with charities or simply providing a place to connect with friends, new and old. Ice cream is an indulgence; and we never forget the people who continue to indulge us. ',
              isReverseArrangement: true,
              fullImage: true
            }
          },
          {
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: '4zpl0f2uus7y'
                }
              },
              id: '6GLOJyYc48I0IymKuQUauk',
              type: 'Entry',
              createdAt: '2018-08-23T15:24:19.808Z',
              updatedAt: '2018-09-12T14:55:49.964Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment'
                }
              },
              revision: 4,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'blockImageText'
                }
              },
              locale: 'en-US'
            },
            fields: {
              title: 'The Churning',
              image: {
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: '4zpl0f2uus7y'
                    }
                  },
                  id: '53Wyz2dYpyKwKwOkgSEwsK',
                  type: 'Asset',
                  createdAt: '2018-09-12T14:55:43.963Z',
                  updatedAt: '2018-09-12T14:55:43.963Z',
                  environment: {
                    sys: {
                      id: 'master',
                      type: 'Link',
                      linkType: 'Environment'
                    }
                  },
                  revision: 1,
                  locale: 'en-US'
                },
                fields: {
                  title: 'Location Gowanus 016',
                  file: {
                    url:
                      '//images.ctfassets.net/4zpl0f2uus7y/53Wyz2dYpyKwKwOkgSEwsK/d5805897999080885de1357228ae09e9/Location_Gowanus_016.jpg',
                    details: {
                      size: 577623,
                      image: {
                        width: 1024,
                        height: 1064
                      }
                    },
                    fileName: 'Location_Gowanus_016.jpg',
                    contentType: 'image/jpeg'
                  }
                }
              },
              text:
                'Every day, we wake up hoping today will be the day we make the best ice cream ever. We aren’t afraid to think outside of the box, get creative or make a few mistakes along the way. This mindset has empowered us to imagine the whimsical flavors that we’re known for! We make all of our ice cream from start to finish. First, we think of a story to inspire a flavor. Next, we find the best ingredients to tell that tale. Then, we pasteurize the milk, cream, sugar and eggs together on-site—we made history as the first to pasteurize on-site in New York City, earning us the nickname of “Brooklyn’s freshest.” (It also means that we are a registered dairy plant.) Because we control every aspect of the process, we have the freedom to add a unique depth to every flavor. To create the salty sweet base for The Munchies, we steep pretzels in the milk before pasteurizing. And even though all of that work is just for one flavor, we think it’s worth it. And we think you will too!',
              backgroundColor: 'peach',
              isReverseArrangement: true,
              imageTextRatio: '50:50',
              drip: true
            }
          }
        ],
        text:
          "Join us for a postcard writing and crafting ice cream gathering benefiting Brooklyn Pride. We'll craft postcards, hear from our friends at Brooklyn Pride and indulge on ice cream with a pay-as-you-wish sundae bar.\n\nAll are always welcome!\n\nFor every pre-packed pint (at all our NY/NJ scoop shops) purchased on June 6th, we’ll donate $1 to Brooklyn Pride. #icecreamforgood"
      }
    }
  ]
};
