import React from 'react';
import { FlatList, AsyncStorage } from 'react-native';
import ListItem from './ListItem';
export interface Props {
  data: Array<Object>;
  incrementPage: any;
  onPressItem: Function;
}

export default class UserList extends React.Component<Props>{
  constructor(props: Props) {
    super(props);

    if (!props.data) {
      props.data = [];
    };

  };

  state = {
    currentSelected: null,
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={(item) => this.renderItem(item.item)}
        onEndReached={
          this.props.incrementPage
        }
        onEndReachedThreshold={0}
        keyExtractor={(item, index) => index.toString()}
      >
      </FlatList>
    );
  };

  private renderItem(user: any) {
    return <ListItem
      onPressItem = {this.props.onPressItem}
      selected={this.state.currentSelected == user.id}
      data={user}
    ></ListItem>;
  }

};
