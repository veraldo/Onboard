import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements'
import DataUtils from '../domain/DataUtils'
import { primaryColor, StyledWrapper } from './StyledComponents';


export default class DetailsScreen extends React.Component<any, any>{

  state = {
    userData: {
      name: "",
      role: "",
      email: ""
    }
  }

  async componentDidMount() {
    let id: string;
    let token: string;
    id = this.props.navigation.getParam('id', 'no-id');
    token = this.props.navigation.getParam('token', 'no-token');

    DataUtils.getUserDetails(id, token).then(
      (data) => this.setState(
        {
          userData: data
        })
    )

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
        <StyledWrapper>
          <Button
            backgroundColor={primaryColor}
            onPress={this.onPressEditButton} title="Editar" />
        </StyledWrapper>
      </View>
    </Card>;
  }

  onPressEditButton = () => {
    this.props.navigation.navigate("Edit",
      {
        data: this.state.userData,
        id: this.props.navigation.getParam('id', 'no-id'),
        token: this.props.navigation.getParam('token', 'no-token')
      }
    )
  }




}
