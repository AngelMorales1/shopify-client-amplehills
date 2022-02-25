import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import {
  FaPen as PenIcon,
  FaIceCream as IceCream,
  FaVoteYea as Vote,
  FaChartBar as ChartIcon,
  FaShoppingCart as Cart,
  FaTag as Tag,
  FaDownload,
  FaTruck as Truck,
  FaSearchLocation as SearchLocation,
  FaParagraph as Paragraph,
} from 'react-icons/fa';
import { IoLocation, IoCalendarClear, IoDocumentSharp, IoStorefront, IoSettings, IoPeopleSharp, IoDownload } from 'react-icons/io5';
import { RiLayoutFill } from 'react-icons/ri';

import SanityClient from './lib/SanityClient';
import FlavorFrenzyTotals from './panes/FlavorFrenzyTotals';
import DownloadCSV from './panes/DownloadCSV';
import EventAttendees from './panes/EventAttendees';

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

  if (schemaType === 'event') {
    return S.document().views([
      S.view.form().icon(PenIcon),
      S.view
        .component(EventAttendees)
        .title('Attendees')
        .icon(IoPeopleSharp)
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
              .title('Web Content')
              .icon(RiLayoutFill)
              .child(S.document().schemaType('inStores').documentId('_inStores')),
            S.divider(),
            S.listItem()
              .title('Retail Locations')
              .icon(IoLocation)
              .child(S.documentTypeList('retailLocation').title('Retail Locations')),
            S.listItem()
              .title('By Distributor')
              .icon(SearchLocation)
              .child(
                S.documentList()
                  .title('Distributor')
                  .schemaType('distributor')
                  .filter('_type == "distributor"')
                  .child(id =>
                    S.documentList()
                      .title('Retail Locations')
                      .schemaType('retailLocation')
                      .filter(`_type == "retailLocation" && $id == distributor_ref._ref`)
                      .params({ id })
              )),
            S.divider(),
            S.listItem()
              .title('Distributors')
              .icon(Truck)
              .child(S.documentTypeList('distributor').title('Distributors')),
            S.listItem()
              .title('Location Tags')
              .icon(Tag)
              .child(S.documentTypeList('retailLocationTag').title('Location Tags')),
            S.listItem()
              .title('Download CSV')
              .icon(FaDownload)
              .child(S.component(DownloadCSV).title('Download CSV')),
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
