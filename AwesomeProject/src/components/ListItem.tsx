import React from 'react';
import { Text, View, Image } from 'react-native';
import { Card, Button, Avatar } from 'react-native-elements'

export interface Props {
  data: any;
}

export default class ListItem extends React.Component<Props>{
  constructor(props: Props) {
    super(props);

  };

  render() {
    return <Card>
      <View >
        <Text style={{ fontWeight: 'bold' }}>
          {this.props.data.username}
        </Text>
        <Text >
          {this.props.data.user_role}
        </Text>
      </View>
    </Card>;
  };



};
