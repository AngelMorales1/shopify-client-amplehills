import React, { FC, useEffect, useState } from 'react';
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
  Flex
} from '@sanity/ui';

import SanityClient from './../lib/SanityClient';

const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5050'
  : 'https://ample-hills-api.web.app';

const newTotalsArray = (
  totals: { [key: string]: number | string }[],
  matchId: string, 
  flavorId: string,
  value: number | string
) => totals.reduce((newTotals: { [key: string]: number | string }[], match) => {
  if (match.match !== matchId) return newTotals.concat([ match ]);

  return newTotals.concat([{
    ...match,
    [flavorId]: parseInt(value as string)
  }]);
}, [])

const FlavorFrenzyPane: FC<{ document: any }> = ({ document }) => {
  const [flavors, setFlavors] = useState<{ _id: string; name: string; }[]>([]);
  const [totals, setTotals] = useState<{ [key: string]: number | string }[]>([]);
  const [editedMatches, setEditedMatches] = useState<string[]>([]);
  const [pendingChanges, setPendingChanges] = useState<string>('');
  const [votesInQueue, setVotesInQueue] = useState<number>(0);
  const [isMigratingVotes, setIsMigratingVotes] = useState<boolean>(false);

  const { published } = document;
  const { rounds } = published;

  useEffect(() => {
    const fetchFlavors = async () => {
      setFlavors(await SanityClient.fetch(`*[_type == 'flavor']`));
    };

    const fetchTotals = async () => {
      setTotals(await fetch(`${BASE_URL}/api/v1/flavor_frenzy/votes/admin_total`).then(
        res => res.json()
      ));
    };

    const fetchVotesInQueue = async () => {
      setVotesInQueue(await fetch(`${BASE_URL}/api/v1/flavor_frenzy/votes/total?id=${published.name}`).then(
        res => res.json()
      ));
    };

    fetchFlavors();
    fetchTotals();
    fetchVotesInQueue();
  }, []);

  useEffect(() => {
    if (!!pendingChanges) {
      const postChanges = async () => {
        const match = totals.find(total => total.match === pendingChanges);

        await fetch(`${BASE_URL}/api/v1/flavor_frenzy/votes/match_total`, {
          method: 'post',
          body: JSON.stringify({ match })
        });

        window.location.reload();
      };

      postChanges();
    }
  }, [pendingChanges]);

  useEffect(() => {
    if (isMigratingVotes) {
      const migrateVotes = async function() {
        await fetch(`${BASE_URL}/api/v1/flavor_frenzy/votes/migrate?id=${published.name}`)

        setIsMigratingVotes(false);
        window.location.reload();
      }

      migrateVotes();
    }
  }, [isMigratingVotes])

  return (
    <ThemeProvider theme={studioTheme}>
      <Card 
        padding={[3, 3, 4]}
      >
        <Flex justify="flex-end" align="center">
          <span style={{ marginRight: '1rem' }}><strong>Votes Queued: </strong>{votesInQueue}</span>
          <Button
            tone="positive"
            disabled={isMigratingVotes || !votesInQueue}
            onClick={() => setIsMigratingVotes(true)}
            text="Migrate Votes in Queue"
          />
        </Flex>
      </Card>
      <Stack space={[3, 3, 4]}>
        {rounds.map(round => {
          const roundMatches = round.matches.map(match => match._key);
          const totalVotes = totals.filter(total => roundMatches.includes(total.match)).reduce((totalVotes: number, match) => {
            Object.values(match).forEach(value => {
              if (typeof value === 'number') totalVotes += value;
            });

            return totalVotes;
          }, 0);

          return (
            <Card
              padding={[3, 3, 4]}
              radius={2}
              shadow={1}
            >
              <Flex justify="space-between" align="center">
                <Heading size={3}>
                  <Inline marginBottom={3} style={{ alignItems: 'center' }}>
                    {round.name}
                    {round.isActive ? (
                      <Badge marginLeft={2} tone="positive">Active</Badge>
                    ) : (
                      <Badge marginLeft={2} mode="outline">Inactive</Badge>
                    )}
                  </Inline>
                </Heading>
                {!!totals.length ? (
                  <Flex>
                    <span style={{ marginRight: '1rem' }}><strong>Total Votes: </strong>{totalVotes}</span>
                    <span><strong>Estimated Participants: </strong>~{(totalVotes / roundMatches.length).toFixed(0)}</span>
                  </Flex>
                ) : (
                  <Spinner />
                )}
              </Flex>
              {round.matches.map((match, i) => {
                const matchTotals = totals.find(total => total.match === match._key);
                const flavor1 = flavors.find(flavor => match.flavor1._ref === flavor._id);
                const flavor2 = flavors.find(flavor => match.flavor2._ref === flavor._id);

                const flavor1Total = matchTotals && flavor1
                  ? matchTotals[flavor1?._id] as number
                  : 0;

                const flavor2Total = matchTotals && flavor2
                  ? matchTotals[flavor2?._id] as number
                  : 0;

                if (!flavor1 || !flavor2 || !matchTotals) return (
                  <Card 
                    marginTop={3}
                    padding={[3, 3, 4]}
                    radius={2}
                    shadow={1}
                    tone="primary"
                    width="25%"
                  >
                    <Spinner />
                  </Card>
                );

                return (
                  <Card 
                    marginTop={3}
                    padding={[3, 3, 4]}
                    radius={2}
                    shadow={1}
                    tone="primary"
                    width="25%"
                  >
                    <Inline marginBottom={2}>
                      <Heading size={2}>Match #{i + 1}</Heading>
                      <Button
                        tone="positive"
                        padding={[2, 2, 3]}
                        style={{
                          marginLeft: '1rem',
                          marginRight: '1rem',
                          opacity: editedMatches.includes(match._key) ? '1' : '0',
                          pointerEvents: editedMatches.includes(match._key) ? 'all' : 'none'
                        }}
                        disabled={pendingChanges === match._key}
                        text="Update"
                        onClick={() => {
                          setPendingChanges(match._key)
                        }}
                      />
                      {pendingChanges === match._key && (
                        <Spinner />
                      )}
                    </Inline>
                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                      <div style={{ width: '50%', paddingRight: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem'}}>
                          <strong style={{ marginRight: '6px' }}>{flavor1?.name}:</strong>
                          <Badge
                            mode="outline"
                            tone={flavor1Total > flavor2Total ? "positive" : "critical"}
                          >
                            {(flavor1Total / (flavor1Total + flavor2Total) * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <div>
                          <TextInput
                            border={true}
                            style={{ background: 'white' }}
                            fontSize={[2, 2, 3, 4]}
                            padding={[3, 3, 4]}
                            value={flavor1Total}
                            onChange={e => {
                              setTotals(
                                newTotalsArray(totals, match._key, flavor1._id, e.currentTarget.value)
                              );
                              setEditedMatches(editedMatches.concat([match._key]));
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ width: '50%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem'}}>
                          <strong style={{ marginRight: '6px' }}>{flavor2?.name}:</strong>
                          <Badge
                            mode="outline"
                            tone={flavor1Total < flavor2Total ? "positive" : "critical"}
                          >
                            {(flavor2Total / (flavor1Total + flavor2Total) * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <div>
                          <TextInput
                            border={true}
                            style={{ background: 'white' }}
                            fontSize={[2, 2, 3, 4]}
                            padding={[3, 3, 4]}
                            value={flavor2Total}
                            onChange={e => {
                              setTotals(
                                newTotalsArray(totals, match._key, flavor2._id, e.currentTarget.value)
                              );
                              setEditedMatches(editedMatches.concat([match._key]));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </Card>
          )
        })}
      </Stack>
    </ThemeProvider>
  );
};

export default FlavorFrenzyPane;
