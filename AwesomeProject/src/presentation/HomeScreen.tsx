import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements'

import { StyledText, StyledWrapper, primaryColor, StyledView } from './StyledComponents';

export default class HomeScreen extends Component<any,any> {
  render() {

    return (
      <StyledView
        style={{ flexDirection: "column", justifyContent: "center" }}>
        <StyledText>Onboard</StyledText>
        <StyledWrapper>
          <Button
            title="Entrar"
            backgroundColor={primaryColor}
            onPress={() => this.props.navigation.navigate("Login")}/>
        </StyledWrapper>
      </StyledView>
    );
  }
}
