import React, { Component } from 'react';
import { Button, Text, TextInput, View, Switch, AsyncStorage } from 'react-native';
import LoginUtils from '../common/LoginUtils';

export default class LoginScreen extends Component<any,any> {
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

  render() {

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
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
        <Button
          title="Entrar"
          disabled={this.state.disableButton}
          onPress={() => this.handleSubmit(this.state.email, this.state.password, this.state.rememberMe)
          }
        />
      </View>
    );
  }

  private async handleSubmit(email: string, password: string, rememberMe: boolean) {
    this.validate(email, password)
      .then(
        (formValid: boolean) => {
          if (formValid) {
            this.setState({ disableButton: true });
            LoginUtils.doLogin(email, password, rememberMe)
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.data) {
                  LoginUtils.storeData(responseJson.data.user.name, responseJson.data.token)
                    .then(
                      this.props.navigation.navigate("Welcome")
                    );
                } else {
                  alert("Erro: " + responseJson.errors[0].message);
                  this.setState({ disableButton: false });
                };
              })
              .catch((error) => {
                alert("Erro: " + error);
                this.setState({ disableButton: false });
              });;
          };
        });
  }

  async validate(email: string, password: string) {
    let regex = new RegExp(".+@.+\..+");
    let formIsValid = true;

    await this.setState({ passwordValid: password.length >= 4 })
    await this.setState({ emailValid: regex.test(email) });

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
