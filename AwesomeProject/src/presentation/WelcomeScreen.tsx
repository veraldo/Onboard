import React, { Component } from 'react';
import UserList from "./common/components/UserList";
import GetUserList from "../domain/useCases/GetUserList"
import { GetParams } from "../domain/useCases/interface/QueryModels"
import User from "../domain/entities/User";
import ActionButton from 'react-native-action-button';
import FlashMessage from "react-native-flash-message";
import { StyledView, StyledText, primaryColor } from './common/components/StyledComponents';
export default class WelcomeScreen extends Component<any> {
  screen = this;

  state = {
    name: "",
    page: 0,
    data: [{}],
    userDetails: {}
  };

  message: any;

  componentWillMount() {
    let params: GetParams = {
      id: undefined,
      page: 0,
      window: 7,
      token: this.props.navigation.getParam('token', 'no-token')
    };

    (new GetUserList()).exec(params)
      .then(
        (newData: User[]) => {
          this.setState({ data: newData })
        }
      )
    this.setState({ name: this.props.navigation.getParam('name', 'unknown') });
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
          buttonColor={primaryColor}
          onPress={() => { this.onPressButton() }} />
        <FlashMessage ref={(message: any) => this.message = message} position="top" />
      </StyledView>
    );
  }

  incrementPage = () => {

    this.setState({ page: this.state.page + 1 },
      () => {
        let params: GetParams = {
          page: this.state.page,
          window: 7,
          token: this.props.navigation.getParam('token', 'no-token')
        };
        (new GetUserList()).exec(params)
          .then((newData: User[]) => {
            this.setState({
              data: this.state.data.concat(newData)
            });

          })
          .catch((error) => {
            this.message.showMessage({
              message: "Erro: " + error,
              type: "danger"
            });
          })
      }
    );

  }

  onPressItem = (id: string) => {
    this.props.navigation.navigate("Details", {
      id: id,
      token: this.props.navigation.getParam('token', 'no-token')
    })
  }

  onPressButton = () => {
    this.props.navigation.navigate("Create", {
      token: this.props.navigation.getParam('token', 'no-token')
    })
  }


}
