import React, { Component } from 'react';
import { Text, TextInput, View, Switch } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import Login from '../domain/useCases/Login';
import { Card } from 'react-native-elements';
import FlashMessage from "react-native-flash-message";
import { StyledWrapper, primaryColor } from "./common/components/StyledComponents"
import { MessageBody } from '../domain/useCases/interface/QueryModels';
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
          <StyledWrapper>
            <Switch
              onTintColor={primaryColor}
              value={this.state.rememberMe}
              onValueChange={() => this.setState({ rememberMe: !this.state.rememberMe })} />
          </StyledWrapper>
          <Text >Remember me</Text>
          <StyledWrapper>
            <AnimateLoadingButton
              backgroundColor={primaryColor}
              ref={(thisButton: any) => (this.loadingButton = thisButton)}
              title="Entrar"
              width={300}
              height={50}
              disabled={this.state.disableButton}
              onPress={() => this.handleSubmit(this.state.email, this.state.password, this.state.rememberMe)
              }
            />
          </StyledWrapper>
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
            let requestBody :MessageBody ={
              email:email,
              password: password,
              rememberMe: !!rememberMe
            };
            (new Login()).exec(requestBody)
              .then((response: MessageBody) => {
                if (!response.errorMessage) {
                  this.props.navigation.navigate("Welcome", {
                    name: response.name,
                    token: response.token
                  });
                } else {
                  this.message.showMessage({
                    message: "Erro: " + response.errorMessage,
                    type: "danger",
                  });

                };
                this.loadingButton.showLoading(false);
              });
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
      return primaryColor
    } else {
      return "red"
    };
  }


}
