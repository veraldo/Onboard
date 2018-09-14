import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { primaryColor, StyledWrapper } from './common/components/StyledComponents';
import { GetParams } from '../domain/useCases/interface/QueryModels';
import User from '../domain/entities/User';
import GetUser from '../domain/useCases/GetUser';
import { NavigationEvents } from 'react-navigation';
import FlashMessage from 'react-native-flash-message';

export default class DetailsScreen extends React.Component<any, any>{

  state = {
    userData: {
      name: "",
      role: "",
      email: ""
    }
  }

  message: any;

  updateUser = () => {
    let request: GetParams = {
      id: this.props.navigation.getParam('id', 'no-id'),
      token: this.props.navigation.getParam('token', 'no-token')
    };


    (new GetUser()).exec(request).then(
      (data: User) => this.setState(
        {
          userData: data
        })
    )

  };

  render() {
    return <View>
    <Card >
      <View >
        <NavigationEvents onWillFocus={() => this.updateUser()}/>
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
    </Card>
    <FlashMessage ref={(message: any) => this.message = message} position="top" />

    </View>;
  }

  onPressEditButton = () => {
    this.props.navigation.navigate("Edit",
      {
        data: this.state.userData,
        id: this.props.navigation.getParam('id', 'no-id'),
        token: this.props.navigation.getParam('token', 'no-token'),
        message: this.message
      }
    )
  }




}
