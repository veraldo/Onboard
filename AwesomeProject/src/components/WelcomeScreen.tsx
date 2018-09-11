import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import styled from "styled-components";
import UserList from "./UserList";
import DataUtils from "../common/DataUtils";
import Pagination, { Icon, Dot } from 'react-native-pagination';//{Icon,Dot} also available

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
  screen = this;
  state = {
    name: "",
    token: "",
    page: 0,
    data: [{}]
  };
  componentWillMount() {
    this.retrieveStoredCredentials()
      .then(() => {
        DataUtils.fetchData(0, 7, this.state.token)
          .then(
            (newData) => {
              this.setState({ data: newData })
            }
          )
      });
  }

  render() {
    return (
      <StyledView>
        <StyledText>Olá, {this.state.name}!</StyledText>
        <UserList incrementPage={this.incrementPage} data={this.state.data}></UserList>
      </StyledView>
    );
  }

  private async retrieveStoredCredentials() {
    try {
      const name = await AsyncStorage.getItem('name');
      const token = await AsyncStorage.getItem('token');

      if (name !== null) {
        this.setState({ name: name })
      };
      if (token !== null) {
        this.setState({ token: token })
      }
    } catch (error) {
      alert("Erro ao recuperar dados");
    }
  }

  incrementPage = () => {

    this.setState({ page: this.state.page + 1 },
      () => DataUtils.fetchData(this.state.page, 7, this.state.token)
        .then((newData) => {
          this.setState({
            data: this.state.data.concat(newData)
          });

        })
        .catch((error) => { console.log(error) })
    );


  }

}
