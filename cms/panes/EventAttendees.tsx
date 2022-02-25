import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Card,
  Heading,
  studioTheme,
  ThemeProvider,
  Stack,
  Badge,
  Inline,
  TextInput,
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
  ? 'http://localhost:5000'
  : 'https://ample-hills-api.web.app';

const ticketsInOrder = function(date: string, order: any): number {
  const lineItem = order.line_items.find(item => item.variant_title === date);

  return lineItem.quantity;
};

const totalAttendees = function(date, orders) {
  return orders.reduce((total: number, order: any) => {
    return !!order.order.cancelled_at ? total : total + ticketsInOrder(date, order.order);
  }, 0);
}

const EventAttendees: FC<{ document: any }> = ({ document }) => {
  const { published, displayed, draft } = document;
  const [attendees, setAttendees] = useState<{ [key: string]: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const doc = published || displayed || draft;

  useEffect(() => {
    const name = doc?.name;
    const variants = (doc.variants || []).map(variant => variant.shopifyName);

    const fetchAttendees = async () => {
      setIsLoading(true);
      setAttendees(await AmpleHillsApi.fetchEventAttendees(name, variants).then(res => res.json()));
      setIsLoading(false);
    };

    fetchAttendees();
  }, [doc]);

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
                      <Text size={1}>Download</Text>
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Flex direction="column" marginTop={5}>
              {!!orders && orders.map(order => (
                <Flex wrap="wrap" marginBottom={3}>
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
                  <Flex align="center" style={{ width: '33%' }} paddingRight={4}>
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
                  <Flex align="center" style={{ width: '17%' }} paddingTop={2} paddingBottom={2}>
                    {!!order.order.cancelled_at ? (
                      <Badge mode="outline" tone="critical">Cancelled</Badge>
                    ) : (
                      <Flex align="center">
                        <IoTicketSharp style={{ marginRight: '.125rem', color: 'green' }} />
                        <Text size={1} style={{ fontWeight: 'bold', color: 'green' }}>{ticketsInOrder(date, order.order)}</Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Card>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default EventAttendees;
