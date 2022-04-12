import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Card,
  Select,
  Heading,
  studioTheme,
  ThemeProvider,
  Badge,
  Dialog,
  Button,
  Spinner,
  Box,
  Text,
  Flex,
  Container
} from '@sanity/ui';

import { IoMdCart, IoMdMail } from 'react-icons/io';
import { IoDownload, IoTicketSharp } from 'react-icons/io5';

import { ExportToCsv } from 'export-to-csv';

import SanityClient from './../lib/SanityClient';
import AmpleHillsApi from '../lib/AmpleHillsApi';

const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5050'
  : 'https://ample-hills-api.web.app';

const ticketsInOrder = function(date: string, order: any): number {
  const lineItem = order?.line_items?.find(item => item.variant_title === date);

  return lineItem.quantity;
};

const totalAttendees = function(date, orders) {
  if (!orders) return 0;

  return orders.reduce((total: number, order: any) => {
    return !!order.order.cancelled_at ? total : total + ticketsInOrder(date, order.order);
  }, 0);
}

const EventAttendees: FC<{ document: any }> = ({ document }) => {
  const { published, displayed, draft } = document;
  const [product, setProduct] = useState<{ store: { title: string; variants: { store: { title: string, id: string }}[] }} | null>(null);
  const [attendees, setAttendees] = useState<{ [key: string]: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderToEdit, setOrderToEdit] = useState<any | null>(null);
  const [editType, setEditType] = useState<'refund' | 'change'>('refund');
  const [altDate, setAltDate] = useState<any | null>(null);

  const doc = published || displayed || draft;

  useEffect(() => {
    if (doc && doc?.product?._ref) {
      const fetchProduct = async () => {
        console.log('PROD REF', doc.product._ref);
        const product = await SanityClient.fetch(`*[_type == 'product' && _id == '${doc.product._ref}'][0] {
          ...,
          'store': {
            ...store,
            'variants': store.variants[]->{ ... }
          }
        }`);

        setProduct(product);
      }

      fetchProduct();
    }
  }, [doc]);

  useEffect(() => {
    const name = product?.store?.title;

    console.log('DOC', doc);
    const variants = (product?.store?.variants || []).map(variant => variant.store.title);

    if (name && variants && variants.length) {
      const fetchAttendees = async () => {
        setIsLoading(true);
        setAttendees(await AmpleHillsApi.fetchEventAttendees(name, variants).then(res => res.json()));
        setIsLoading(false);
      };

      fetchAttendees();
    }
  }, [doc, product]);

  console.log('DPDPDP', product)

  const exportToCsv = useCallback((date, data) => {
    const csvExporter = new ExportToCsv({ 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: `${doc.name} - ${date}`,
      filename: `${doc.name.toLowerCase().split(' ').join('-')}-${date.split(' ').join('-').split('/').join('-').split(',').join('-')}`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    });
 
    csvExporter.generateCsv(data);
  }, []);

  const ordersToCsv = useCallback(
    (date, orders) => orders?.map(order => ({
      'Order #': order.order.name,
      'Email Address': order.order.email,
      'Name': `${order.order.customer.first_name} ${order.order.customer.last_name}`,
      'Status / Tickets': !!order.order.cancelled_at ? 'Cancelled' : ticketsInOrder(date, order.order)
    })),
    []
  );

  console.log("ATTENDEES", attendees);

  return (
    <ThemeProvider theme={studioTheme}>
      <Container padding={[3, 3, 4]} style={{ width: 'calc(100% - 2rem)' }}>
        <Flex paddingBottom={4} justify="flex-start">
          <Heading>Attendees</Heading>
          {isLoading && (
            <Box marginLeft={3}>
              <Spinner muted={true} />
            </Box>
          )}
        </Flex>
        {!!attendees && Object.entries(attendees).map(([date, orders]) => (
          <Card
            padding={[3, 3, 4]}
            radius={2}
            shadow={1}
            marginBottom={3}
          >
            <Box marginBottom={1} paddingBottom={[3, 3, 4]} style={{ borderBottom: '1px solid lightgray' }}>
              <Flex justify="space-between" align="center">
                <Text weight="bold" style={{ color: '#333' }}>{date}</Text>
                <Flex align="center">
                  <Text size={1}>{totalAttendees(date, orders)} People Attending</Text>
                  <Box marginLeft={3}>
                    <Button
                      padding={2}
                      mode="ghost"
                      onClick={() => exportToCsv(date, ordersToCsv(date, orders))}
                    >
                      <Text size={1}>Download CSV</Text>
                    </Button>
                  </Box>
                  <Box marginLeft={3}>
                    <Button
                      padding={2}
                      mode="ghost"
                      onClick={() => {}}
                    >
                      <Text size={1}>Refund All Guests</Text>
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Flex direction="column" marginTop={5}>
              {!!orders && orders.map(order => (
                <Flex marginBottom={3}>
                  <Flex style={{ width: '20%' }} align="center" paddingBottom={2}>
                    <a
                      href={`https://ampletest.myshopify.com/admin/orders/${order.order.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text style={{ display: 'flex', color: '#449', alignItems: 'center', fontFamily: `Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`, fontSize: '14px' }}>
                        <IoMdCart /><Box marginLeft={2}>{order.order.name}</Box>
                      </Text>
                    </a>
                  </Flex>
                  <Flex align="center" style={{ width: '30%' }} paddingRight={4}>
                    <Box style={{ overflow: 'hidden' }} paddingBottom={2}>
                      <a
                        href={`mailto:${order.order.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text style={{ display: 'flex', color: '#449', alignItems: 'center', marginRight: '.5rem' }}>
                          <IoMdMail /><Box marginLeft={2}>{order.order.email}</Box>
                        </Text>
                      </a>
                    </Box>
                  </Flex>
                  <Flex align="center" style={{ width: '25%' }} paddingBottom={2}>
                    <Text style={{ display: 'flex', color: '#449', alignItems: 'center' }}>
                      {order.order.customer.first_name} {order.order.customer.last_name}
                    </Text>
                  </Flex>
                  <Flex align="center" style={{ width: '15%' }} paddingTop={2} paddingBottom={2}>
                    {!!order.order.cancelled_at ? (
                      <Badge mode="outline" tone="critical">Cancelled</Badge>
                    ) : (
                      <Flex align="center">
                        <IoTicketSharp style={{ marginRight: '.125rem', color: 'green' }} />
                        <Text size={1} style={{ fontWeight: 'bold', color: 'green' }}>{ticketsInOrder(date, order.order)}</Text>
                      </Flex>
                    )}
                  </Flex>
                  <Flex justify="flex-end" style={{ width: '10%' }} paddingTop={2} paddingBottom={2}>
                    {!!order.order.cancelled_at ? (
                      <Badge mode="outline" tone="critical">Cancelled</Badge>
                    ) : (
                      <>
                        <Button
                          padding={2}
                          mode="ghost"
                          onClick={() => setOrderToEdit(order)}
                        >
                          <Text size={1}>Refund</Text>
                        </Button>
                      </>
                    )}
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Card>
        ))}
      </Container>
      {orderToEdit && (
        <Dialog
          header={`Edit ${orderToEdit.order.name}`}
          id="dialog-example"
          onClose={() => setOrderToEdit(null)}
          zOffset={1000}
        >
          <Box padding={4} marginBottom={2}>
            <Text>Are you sure you want to refund event tickets for <strong>{orderToEdit.order.customer.first_name} {orderToEdit.order.customer.last_name}</strong>?</Text>
          </Box>
          <Flex justify="flex-end" padding={4}>
            <Button onClick={() => {}}>Confirm Refund</Button>
          </Flex>
        </Dialog>
      )}
    </ThemeProvider>
  );
};

export default EventAttendees;
