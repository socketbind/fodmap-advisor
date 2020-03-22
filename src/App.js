/**
 * @format
 * @flow
 */

import React, {Fragment, useState} from 'react';
import {SafeAreaView} from 'react-native';

import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  Input,
  Layout,
  List,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components';

import {FoodListItem} from "./FoodListItem";

import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {light as lightTheme, mapping} from '@eva-design/eva';
import {default as appTheme} from './custom-theme.json';
import {default as customMapping} from './custom-mapping.json';
import {performSearch} from "./foodDatabase";

const theme = {...lightTheme, ...appTheme}

const App: () => React$Node = () => {
  const styles = useStyleSheet(themedStyles);

  const [query, setQuery] = useState("");
  const results = performSearch(query);

  const stickies = results.flatMap((item, index) => item.header ? [index] : []);

  const renderHeader = () => (
    <Layout
      style={styles.header}
      level='1'>
      <Input
        value={query} onChangeText={setQuery} placeholder="Search"
        icon={style => <Icon {...style} name="search"/>}
      />
    </Layout>
  );

  return (
    <Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <SafeAreaView style={{flex: 1}}>
        <ApplicationProvider mapping={mapping} theme={theme} customMapping={customMapping}>
          <List
            style={styles.list}
            ListHeaderComponent={renderHeader}
            stickyHeaderIndices={stickies}
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <FoodListItem item={item} />}
          />
        </ApplicationProvider>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;

const themedStyles = StyleService.create({
  list: {
    flex: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  }
});
