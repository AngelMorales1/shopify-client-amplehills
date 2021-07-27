import CardRecirculation from './blocks/CardRecirculation';
import Faq from './blocks/Faq';
import FullWidthImages from './blocks/FullWidthImages';
import GenericHero from './blocks/GenericHero';
import ImageText from './blocks/ImageText';
import ImageDoubleText from './blocks/ImageDoubleText';
import HorizontalCarousel from './blocks/HorizontalCarousel';
import CenteredCarousel from './blocks/CenteredCarousel';
import Text from './blocks/Text';
import UpcomingEvents from './blocks/UpcomingEvents';
import HtmlEmbed from './blocks/HtmlEmbed';
import PintFinder from './blocks/PintFinder';
import FlavorIndex from './blocks/FlavorIndex';
import Press from './blocks/Press';
import DetailsTabs from './blocks/DetailsTabs';
import ProductPintList from './blocks/ProductPintList';

export default options => ({
  type: 'array',
  of: [
    ImageText,
    ImageDoubleText,
    GenericHero,
    Faq,
    CardRecirculation,
    FullWidthImages,
    HorizontalCarousel,
    CenteredCarousel,
    Text,
    UpcomingEvents,
    HtmlEmbed,
    PintFinder,
    FlavorIndex,
    Press,
    DetailsTabs,
    ProductPintList
  ],
  ...options
});
