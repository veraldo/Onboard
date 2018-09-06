import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

export default class WelcomeScreen extends Component {
  componentWillMount() {
    this.retrieveData();
  }
  state = {
    name: ""
  };
  render() {
    return (
      <View
        style={{ flexDirection: "column", justifyContent: "center" }}>
        <Text>Olá, {this.state.name}!</Text>

      </View>
    );
  }

  private retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        this.setState({ name: value })
      }
    } catch (error) {
      alert("Erro ao recuperar dados");
    }
  }
}
