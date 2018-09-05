import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class HomeScreen extends Component {
    render() {

    return (
      <View>
        <Button 
            title="Entrar"
            onPress={() => this.props.navigation.navigate("Login") }
        />
      </View>
    );
  }
}