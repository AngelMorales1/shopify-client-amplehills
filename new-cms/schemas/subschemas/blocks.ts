import CardRecirculation from './blocks/CardRecirculation';
import Faq from './blocks/Faq';
import FullWidthImages from './blocks/FullWidthImages';
import GenericHero from './blocks/GenericHero';
import ImageText from './blocks/ImageText';
import ImageDoubleText from './blocks/ImageDoubleText';
import HorizontalCarousel from './blocks/HorizontalCarousel';
import CenteredCarousel from './blocks/CenteredCarousel';
import Text from './blocks/Text';
import LongText from './blocks/LongText';
import UpcomingEvents from './blocks/UpcomingEvents';
import EventsGrid from './blocks/EventsGrid';
import HtmlEmbed from './blocks/HtmlEmbed';
import PintFinder from './blocks/PintFinder';
import FlavorIndex from './blocks/FlavorIndex';
import Video from './blocks/Video';
import Press from './blocks/Press';
import DetailsTabs from './blocks/DetailsTabs';
import ProductPintList from './blocks/ProductPintList';
import Featured3UpContent from './blocks/Featured3UpContent';

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
    LongText,
    Featured3UpContent,
    UpcomingEvents,
    EventsGrid,
    HtmlEmbed,
    PintFinder,
    FlavorIndex,
    Press,
    DetailsTabs,
    ProductPintList,
    Video
  ],
  ...options
});
