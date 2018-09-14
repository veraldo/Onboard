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
    return <TouchableOpacity
      onPress={() => this.props.onPressItem(this.props.data.id.toString())}>
      <Card >
        <Text style={{ fontWeight: 'bold' }}>
          {this.props.data.name}
        </Text>
        <Text >
          {this.props.data.role}
        </Text>
      </Card>
    </TouchableOpacity>
  };



};
