import React, { Component } from 'react';
import {Button, TextInput, View } from 'react-native';


export default class LoginScreen extends Component {
    navigationOptions = {
        title:'Login'
    };

  render() {

    return (
      <View>
        <TextInput
          style={{height: 40}}
          textContentType='emailAddress'
          placeholder="E-mail"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={{height: 40}}
          textContentType="password"
          placeholder="Senha"
          onChangeText={(text) => this.setState({text})}
        />
        <Button 
            title="Entrar"
            onPress={() => this.props.navigation.navigate("About")
            }
        />
      </View>
    );
  }
}