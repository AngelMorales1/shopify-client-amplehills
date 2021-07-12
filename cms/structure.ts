import S from '@sanity/desk-tool/structure-builder';
import {
  FaPen as PenIcon,
  FaIceCream as IceCream,
  FaVoteYea as Vote,
  FaChartBar as ChartIcon,
  FaShoppingCart as Cart,
  FaTag as Tag,
  FaParagraph as Paragraph,
} from 'react-icons/fa';
import { IoLocation, IoCalendarClear, IoDocumentSharp, IoStorefront, IoSettings } from 'react-icons/io5';

import FlavorFrenzyTotals from './panes/FlavorFrenzyTotals';

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (schemaType === 'flavorFrenzy') {
    return S.document().views([
      S.view.form().icon(PenIcon),
      S.view
        .component(FlavorFrenzyTotals)
        .title('Totals')
        .icon(ChartIcon)
    ]);
  }
};

const Structure = S.list()
  .title('Content')
  .items([
    S.documentTypeListItem('flavor').title('Flavors').icon(IceCream),
    S.documentTypeListItem('location').title('Locations').icon(IoLocation),
    S.documentTypeListItem('product').title('Products').icon(Cart),
    S.documentTypeListItem('event').title('Events').icon(IoCalendarClear),
    S.documentTypeListItem('page').title('Web Pages').icon(IoDocumentSharp),
    S.documentTypeListItem('flavorFrenzy').title('Flavor Frenzy').icon(Vote),
    S.listItem()
      .title('In-Stores')
      .icon(IoStorefront)
      .child(
        S.list()
          .title('In-Stores Settings')
          .items([
            S.documentTypeListItem('inStores')
              .title('Content')
              .icon(Paragraph)
              .child(S.document().schemaType('inStores').documentId('_inStores')),
            S.listItem()
              .title('Retail Locations')
              .icon(IoLocation)
              .child(S.documentTypeList('retailLocation').title('Retail Locations')),
            S.listItem()
              .title('Location Tags')
              .icon(Tag)
              .child(S.documentTypeList('retailLocationTag').title('Location Tags')),
          ])
      ),
    S.divider(),
    S.documentTypeListItem('settings')
      .title('Settings')
      .icon(IoSettings)
      .child(
        S.document()
          .schemaType('settings')
          .documentId('_settings')
      )
  ]);

export default Structure;
