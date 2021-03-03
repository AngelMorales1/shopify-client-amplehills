import S from '@sanity/desk-tool/structure-builder';
import {
  FaPen as PenIcon,
  FaIceCream as IceCream,
  FaVoteYea as Vote,
  FaChartBar as ChartIcon
} from 'react-icons/fa';

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
    S.documentTypeListItem('flavorFrenzy').title('Flavor Frenzy').icon(Vote),
  ]);

export default Structure;
