import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import styled from "styled-components";
import UserList from "./UserList"
import DataUtils from "../common/DataUtils"

const StyledView = (styled as any).View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledText = (styled as any).Text`
  color: palevioletred;
`;

export default class WelcomeScreen extends Component {
  componentWillMount() {
    this.retrieveData();
  }
  state = {
    name: ""
  };
  render() {
    return (
      <StyledView>
        <StyledText>Olá, {this.state.name}!</StyledText>
        <UserList data={DataUtils.getUserData()}></UserList>
      </StyledView>
    );
  }

  private async retrieveData () {
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
