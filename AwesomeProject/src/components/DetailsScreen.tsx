import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements'
import DataUtils from '../common/DataUtils'

export interface Props {
  userData: any;
}

export default class DetailsScreen extends React.Component<any>{
  constructor(props: Props) {
    super(props);

  };

  state = {
    userData: {
      name: "",
      role: "",
      email: ""
    }
  }

  async componentWillMount() {
    let id: any;
    let token: any;
    await AsyncStorage.getItem('id').then((storedId) => id = (storedId || "").toString());
    console.log("id:" + id);
    await AsyncStorage.getItem('token')
      .then((storedToken) => { token = storedToken || "" })

    DataUtils.getUserDetails(id, token).then((data) => this.setState({
      userData: data
    }))

  };

  render() {
    return <Card >
      <View >
        <Text style={{ fontWeight: 'bold' }}>
          Name: {this.state.userData.name}
        </Text>
        <Text >
          Role: {this.state.userData.role}
        </Text>
        <Text >
          Email: {this.state.userData.email}
        </Text>

      </View>
    </Card>;



  }


}
