import React, { Component } from 'react';
import { Text, TextInput, View, Switch } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import LoginUtils from '../common/LoginUtils';
import { Card } from 'react-native-elements'
import FlashMessage from "react-native-flash-message";

export default class LoginScreen extends Component<any, any> {
  navigationOptions = {
    title: 'Login'
  };
  state = {
    email: "",
    password: "",
    rememberMe: false,
    emailValid: true,
    passwordValid: true,
    disableButton: false
  };

  loadingButton: any;
  message: any;

  render() {

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Card>
          <TextInput
            style={{ height: 40, borderBottomWidth: 1, borderBottomColor: this.getColor(this.state.emailValid) }}
            textContentType='emailAddress'
            placeholder="E-mail"
            autoCapitalize='none'
            onChangeText={(text) => this.setState({ email: text })}
          />
          {!this.state.emailValid && <Text>E-mail inválido</Text>}
          <TextInput
            style={{ height: 40, borderBottomWidth: 1, borderBottomColor: this.getColor(this.state.passwordValid) }}
            textContentType="password"
            secureTextEntry={true}
            placeholder="Senha"
            onChangeText={(text) => this.setState({ password: text })}
          />
          {!this.state.passwordValid && <Text>A senha deve ter pelo menos 4 caracteres</Text>}
          <Switch
            value={this.state.rememberMe}
            onValueChange={() => this.setState({ rememberMe: !this.state.rememberMe })} />
          <Text>Remember me</Text>
          <AnimateLoadingButton
            ref={(thisButton: any) => (this.loadingButton = thisButton)}
            title="Entrar"
            width={300}
            height={50}
            disabled={this.state.disableButton}
            onPress={() => this.handleSubmit(this.state.email, this.state.password, this.state.rememberMe)
            }
          />
        </Card>
        <FlashMessage ref={(message: any) => this.message = message} position="top" />
      </View>
    );
  }

  private async handleSubmit(email: string, password: string, rememberMe: boolean) {
    this.validate(email, password)
      .then(
        (formValid: boolean) => {
          if (formValid) {
            this.loadingButton.showLoading(true);
            this.setState({ disableButton: true });
            LoginUtils.doLogin(email, password, rememberMe)
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.data) {
                  this.props.navigation.navigate("Welcome", {
                    name: responseJson.data.user.name,
                    token: responseJson.data.token
                  });
                  this.setState({ disableButton: false });
                } else {
                  this.message.showMessage({
                    message: "Erro: " + responseJson.errors[0].message,
                    type: "danger",
                  });
                  this.setState({ disableButton: false });
                };
                this.loadingButton.showLoading(false);
              })
              .catch((error) => {
                this.message.showMessage({
                  message: "Erro: " + error,
                  type: "danger"
                });
                this.setState({ disableButton: false });
              });;
          };
        });
  }

  async validate(email: string, password: string) {
    let regex = new RegExp(".+@.+\..+");
    let formIsValid = true;

    await this.setState(
      {
        passwordValid: password.length >= 4,
        emailValid: regex.test(email)
      }
    );

    formIsValid = this.state.emailValid && this.state.passwordValid;

    return formIsValid;
  }

  getColor(valid: boolean) {
    if (valid) {
      return "blue"
    } else {
      return "red"
    };
  }


}
