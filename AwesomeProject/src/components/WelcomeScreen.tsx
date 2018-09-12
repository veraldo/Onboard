import React, { Component } from 'react';
import styled from "styled-components";
import UserList from "./UserList";
import DataUtils from "../common/DataUtils";
import ActionButton from 'react-native-action-button';

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

const StyledButton = (styled as any).Button`
  background: palevioletred;
  border-radius: 3px;
  color: white;
  position: absolute;
  bottom: 10;
  right: 10;
`;

export default class WelcomeScreen extends Component<any> {
  screen = this;
  state = {
    name: "",
    page: 0,
    data: [{}],
    userDetails: {}
  };
  componentWillMount() {
    DataUtils.getUserList(0, 7, this.props.navigation.getParam('token', 'no-token'))
      .then(
        (newData) => {
          this.setState({ data: newData })
        }
      )
    this.setState({name: this.props.navigation.getParam('name','unknown')});
  }

  render() {
    return (
      <StyledView>
        <StyledText>Olá, {this.state.name}!</StyledText>
        <UserList
          incrementPage={this.incrementPage}
          data={this.state.data}
          onPressItem={this.onPressItem}
        >
        </UserList>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { this.onPressButton() }} />
      </StyledView>
    );
  }

  incrementPage = () => {

    this.setState({ page: this.state.page + 1 },
      () => DataUtils.getUserList(this.state.page, 7, this.props.navigation.getParam('token', 'no-token'))
        .then((newData) => {
          this.setState({
            data: this.state.data.concat(newData)
          });

        })
        .catch((error) => {
          console.log(error)
        })
    );

  }

  onPressItem = (id: string) => {
    this.props.navigation.navigate("Details", {
      id: id,
      token: this.props.navigation.getParam('token', 'no-token')
    })
  }

  onPressButton = () => {
    this.props.navigation.navigate("Create",{
      token:this.props.navigation.getParam('token', 'no-token')
    })
  }


}
