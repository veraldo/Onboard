import React from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
export interface Props {
  data: Array<Object>;
}

export default class UserList extends React.Component<Props>{
  constructor(props: Props) {
    super(props);

    if (!props.data) {
      props.data = [];
    };
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={(item)=>this.renderItem(item.item)}
        keyExtractor={(user: any) => user.id.toString()}
        >
      </FlatList>
    );
  };

  renderItem(user: any){
      return <ListItem data={user}></ListItem>;
  }

};
