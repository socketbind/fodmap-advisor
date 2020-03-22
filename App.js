/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Body, Badge, Button, Container, Header, Icon, Input, Item, ListItem, StyleProvider, Text, Left, Right} from 'native-base';
import getTheme from './native-base-theme/components';

import FuzzySearch from 'fuzzy-search';

const {categories, foods} = require('./all_foods.json');
const searcher = new FuzzySearch(foods, ['name'], { caseSensitive: false });

function performSearch(query) {
  const trimmedQuery = query.trim();
  const matchingFoods = trimmedQuery !== '' && trimmedQuery.length > 2 ? searcher.search(trimmedQuery) : foods;

  const byCategory = new Map();

  for (const food of matchingFoods) {
    if (!byCategory.has(food.categoryId)) {
      byCategory.set(food.categoryId, []);
    }
    byCategory.get(food.categoryId).push(food);
  }

  const results = [];

  for (const [categoryId, items] of byCategory) {
    items.sort((a, b) => a.name.localeCompare(b.name))

    results.push({header: true, ...categories[categoryId], id: categoryId });

    for (const item of items) {
      results.push({header: false, ...item});
    }
  }

  return results;
}

function advisory(item) {
  switch (item.color) {
    case 'r': return <Badge danger><Text>Avoid</Text></Badge>;
    case 'g': return <Badge success><Text>No Limit</Text></Badge>;
    case 'y': return <Badge warning><Text>In Moderation</Text></Badge>;
    default:
      console.log(item);
      return <Text>Unknown</Text>;
  }
}

const App: () => React$Node = () => {
  const [query, setQuery] = useState("");
  const results = performSearch(query);

  const stickies = results.flatMap((item, index) => item.header ? [index] : []);

  return (
    <StyleProvider style={getTheme()}>
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search"/>
            <Input placeholder="Search" value={query} onChangeText={text => setQuery(text)}/>
            <Icon name="ios-close" style={{width: 36}} onPress={() => setQuery("")} />
          </Item>
        </Header>
        <FlatList
          stickyHeaderIndices={stickies}
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (item.header ? <ListItem itemDivider>
              <Body>
                <Text style={{ fontWeight: "bold" }}>
                  {item.name}
                </Text>
              </Body>
            </ListItem> :
              <ListItem icon>
                <Body>
                  <Text>{item.name}</Text>
                </Body>
                <Right>{advisory(item)}</Right>
              </ListItem>
          )}
        />
      </Container>
    </StyleProvider>
  );
};

export default App;
