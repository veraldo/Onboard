import React from 'react';
import { Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements'

export interface Props {
  data: any;
  selected: boolean;
  onPressItem: Function;
}

export default class ListItem extends React.Component<Props>{
  constructor(props: Props) {
    super(props);

  };

  render() {
    return <Card >
      <TouchableOpacity
        style={{ width: '100%' }}
        onPress={() => this.props.onPressItem(this.props.data.id.toString())}>
        <Text style={{ fontWeight: 'bold' }}>
          {this.props.data.name}
        </Text>
        <Text >
          {this.props.data.role}
        </Text>
      </TouchableOpacity>
    </Card>;
  };



};
