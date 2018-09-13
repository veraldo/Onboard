import React, { Component } from 'react';
import UserList from "../components/UserList";
import DataUtils from "../domain/DataUtils";
import ActionButton from 'react-native-action-button';
import { StyledView, StyledText, primaryColor } from './StyledComponents';
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
          buttonColor={primaryColor}
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
