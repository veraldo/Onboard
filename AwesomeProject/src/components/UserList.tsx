import React from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
export interface Props {
  data: Array<Object>;
  incrementPage: any;
}

export default class UserList extends React.Component<Props>{
  constructor(props: Props) {
    super(props);

    if (!props.data) {
      props.data = [];
    };

  };

  state = {

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

  renderItem(user: any) {
    return <ListItem data={user}></ListItem>;
  }

};
