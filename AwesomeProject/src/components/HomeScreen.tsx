import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class HomeScreen extends Component {
  render() {

    return (
      <View
        style={{ flexDirection: "column", justifyContent: "center" }}>
        <Text>Onboard</Text>
        <Button
          title="Entrar"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Criar conta"
          onPress={() => { }}
        />
      </View>
    );
  }
}
