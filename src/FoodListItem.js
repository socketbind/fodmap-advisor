import React from 'react';
import {ListItem, StyleService, Text, useStyleSheet} from "@ui-kitten/components";

export const FoodListItem = (props) => {
  const styles = useStyleSheet(themedStyles);

  const {item} = props;

  const advisory = (item) => {
    switch (item.color) {
      case 'r':
        return <Text status="danger">Avoid</Text>;
      case 'g':
        return <Text status="success">No Limit</Text>;
      case 'y':
        return <Text status="warning">In Moderation</Text>;
      default:
        return <Text>Unknown</Text>;
    }
  }

  return item.header ?
    <ListItem style={styles.item} title={item.name} titleStyle={styles.categoryTitle}/> :
    <ListItem style={styles.item} title={item.name} accessory={style => advisory(item)}/>;
}

const themedStyles = StyleService.create({
  list: {
    flex: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  categoryTitle: {
    fontFamily: "Montserrat-SemiBold"
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3'
  },
});