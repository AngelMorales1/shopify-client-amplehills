import React from 'react';

import get from 'utils/get';

import ProductDetails from 'components/ProductDetails';
import FullWidthImages from 'components/FullWidthImages';
import ImageText from 'components/ImageText';
import ImageDoubleText from 'components/ImageDoubleText';
import ChooseYourOwnStory from 'components/ChooseYourOwnStory';
import ComicStrip from 'components/ComicStrip';
import MarkdownBlock from 'components/MarkdownBlock';
import GenericHero from 'components/GenericHero';
import HorizontalCarouselBlock from 'components/HorizontalCarouselBlock';
import EventsBlock from 'components/EventsBlock';
import ImageVideoCarousel from 'components/ImageVideoCarousel';
import FAQBlock from 'components/FAQBlock';
import ProductWhatsIncluded from 'components/ProductWhatsIncluded';
import AvailableLocations from 'components/AvailableLocations';
import PressBlock from 'components/PressBlock';
import AvailableFlavors from 'components/AvailableFlavors';
import FlavorsLanding from 'components/FlavorsLanding';
import CardRecirculation from 'components/CardRecirculation';
import MultipleImageText from 'components/MultipleImageText';
import HTMLEmbed from 'components/HTMLEmbed';
import PintFinderBlock from 'components/PintFinderBlock';

const BlockSwitch = props => {
  const { block } = props;
  const type = get(block, '_type') || get(block, 'sys.contentType.sys.id', '');

  switch (type) {
    case 'blockFullWidthImages':
      return <FullWidthImages {...props} />;
    case 'blockProductDetails':
      return <ProductDetails {...props} />;
    case 'imageText':
      return <ImageText {...props} />;
    case 'blockImageDoubleText':
      return <ImageDoubleText {...props} />;
    case 'blockChooseYourOwnStory':
      return <ChooseYourOwnStory {...props} />;
    case 'blockComicStrip':
      return <ComicStrip {...props} />;
    case 'blockMarkdown':
      return <MarkdownBlock {...props} />;
    case 'blockGenericHero':
      return <GenericHero {...props} />;
    case 'blockHorizontalCarousel':
      return <HorizontalCarouselBlock {...props} />;
    case 'blockUpcomingEvents':
      return <EventsBlock {...props} />;
    case 'blockImageVideoCarousel':
      return <ImageVideoCarousel {...props} />;
    case 'faq':
      return <FAQBlock {...props} />;
    case 'blockCardRecirculation':
      return <CardRecirculation {...props} />;
    case 'blockFixedContent':
      const fields = get(block, 'fields', {});
      const contentType = get(fields, 'contentType', '');
      const drip = get(fields, 'drip', false);
      const upperDrip = get(fields, 'upperDrip', false);

      switch (contentType) {
        case "What's Included Block":
          return (
            <ProductWhatsIncluded
              {...props}
              drip={drip}
              upperDrip={upperDrip}
            />
          );
        case 'Available Locations Block':
          return (
            <AvailableLocations {...props} drip={drip} upperDrip={upperDrip} />
          );
        case 'Press Block':
          return <PressBlock {...props} drip={drip} upperDrip={upperDrip} />;
        case 'Available Flavors Block':
          return (
            <AvailableFlavors {...props} drip={drip} upperDrip={upperDrip} />
          );
        case 'Flavors Block':
          return (
            <FlavorsLanding {...props} drip={drip} upperDrip={upperDrip} />
          );
        case 'Multiple Image Text Block':
          return (
            <MultipleImageText {...props} drip={drip} upperDrip={upperDrip} />
          );
        case 'HTML Embed':
          return <HTMLEmbed {...props} drip={drip} upperDrip={upperDrip} />;

        case 'Pint Finder (In-Stores)':
          return (
            <PintFinderBlock {...props} drip={drip} upperDrip={upperDrip} />
          );
        default:
          return null;
      }
    default:
      return null;
  }
};

export default BlockSwitch;
