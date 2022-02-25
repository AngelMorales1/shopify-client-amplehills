import React, { useCallback, useState, useEffect } from 'react';
import {
  Card,
  Button,
  Text,
  Box
} from '@sanity/ui';
import { ExportToCsv } from 'export-to-csv';

import SanityClient from './../lib/SanityClient';

const DownloadCSV = () => {
  const [stores, setStores] = useState([]);
  const download = useCallback(() => {
    const csvExporter = new ExportToCsv({ 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      filename: `retail_locations_export-${(new Date()).toDateString()}`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    });
  
    csvExporter.generateCsv(
      stores
        // 'Name' at front
        .map((store: any) => Object.assign(
          {},
          {
            'Name': store.name,
            ...store
          }, 
          { name: undefined })
        )
    );
  }, [stores])

  useEffect(() => {
    if (stores.length) return;

    const fetch = async () => {
      console.log('FETCHING STORES');
      setStores(await SanityClient.fetch(`*[_type == 'retailLocation'] { name, address, city, state, zip, "distributor": distributor_ref->title, "lat": geopoint.lat, "lng": geopoint.lng, }`));
      console.log('STORES FETCHED');
    };

    fetch();
  }, []);

  console.log('STORES', stores);

  return (
    <Card padding={4}>
      <Box marginBottom={3}>
        <Text>Click the button below to download a CSV of all <strong>{stores.length} published retail locations</strong> on file.</Text>
      </Box>
      <Button
        tone="positive"
        disabled={!stores.length}
        onClick={download}
      >
        Download
      </Button>
    </Card>
  );
};

export default DownloadCSV;
