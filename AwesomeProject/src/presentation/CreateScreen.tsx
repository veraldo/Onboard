import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import FlashMessage from 'react-native-flash-message'
import DataUtils from '../domain/DataUtils'
import { primaryColor } from './StyledComponents';

export default class CreateScreen extends React.Component<any>{

  async componentDidMount() {
    this.setState({ token: this.props.navigation.getParam('token', 'no-token') })
  }

  message: any;

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameValid: true,
    roleValid: true,
    emailValid: true,
    passwordValid: true,
    confirmPasswordValid: true,
    disableButton: false,
    role: "",
    token: "",
    roleItems: [
      {
        label: 'User',
        value: 'user',
      },
      {
        label: 'Admin',
        value: 'admin',
      }
    ],

  }

  loadingButton: any;

  render() {
    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontSize: 13,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 4,
        backgroundColor: 'white',
        color: '#808080',
      }
    });

    return <View>
      <Card >
        <View >
          <FormLabel>Name*</FormLabel>
          <FormInput
            shake={!this.state.nameValid}
            onChangeText={(value) => this.setState({ name: value })} />
          {!this.state.nameValid && <FormValidationMessage >Required, should have only letters</FormValidationMessage>}

          <FormLabel>Role*</FormLabel>
          <RNPickerSelect
            shake={!this.state.roleValid}
            placeholder={{
              label: 'Select a role...',
              value: null,
            }}
            items={this.state.roleItems}
            style={pickerSelectStyles}
            onValueChange={(value: any) => {
              this.setState({
                role: value,
              });
            }}
          />
          {!this.state.roleValid && <FormValidationMessage >Required</FormValidationMessage>}

          <FormLabel>Email*</FormLabel>
          <FormInput
            shake={!this.state.emailValid}
            onChangeText={(value) => this.setState({ email: value })}
            autoCapitalize='none'
          />
          {!this.state.emailValid && <FormValidationMessage >Invalid email format</FormValidationMessage>}

          <FormLabel>Password*</FormLabel>
          <FormInput shake={!this.state.passwordValid}
            onChangeText={(value) => this.setState({ password: value })}
            secureTextEntry={true}
          />
          {!this.state.passwordValid && <FormValidationMessage >Minimum of 7 characters, with at least one digit and one letter
        </FormValidationMessage>}

          <FormLabel>Confirm password*</FormLabel>
          <FormInput shake={!this.state.confirmPasswordValid}
            onChangeText={(value) => this.setState({ confirmPassword: value })}
            secureTextEntry={true}
          />
          {!this.state.confirmPasswordValid && <FormValidationMessage >Must match</FormValidationMessage>}
          <AnimateLoadingButton
            backgroundColor={primaryColor}
            width={300}
            height={50}
            ref={(thisButton: any) => (this.loadingButton = thisButton)}
            title="Criar"
            disabled={this.state.disableButton}
            onPress={() => this.handleSubmit()
            }
          />
        </View>
      </Card>
      <FlashMessage ref={(message: any) => this.message = message} position="top" />
    </View>
  }

  getColor(valid: boolean) {
    if (valid) {
      return "blue"
    } else {
      return "red"
    };
  }

  async validate() {
    let regexEmail = new RegExp(".+@.+\..+");
    let regexOneNumber = new RegExp(".*[0-9].*");
    let regexOneLetter = new RegExp(".*[A-Za-z].*");
    let regexName = new RegExp("^([A-Za-z]| )+$");

    await this.setState(
      {
        passwordValid: regexOneLetter.test(this.state.password)
          && regexOneNumber.test(this.state.password)
          && this.state.password.length >= 7,
        confirmPasswordValid: this.state.confirmPassword == this.state.password,
        emailValid: regexEmail.test(this.state.email),
        roleValid: !!this.state.role,
        nameValid: regexName.test(this.state.name),
      }
    );


    return this.state.emailValid && this.state.passwordValid
      && this.state.roleValid && this.state.nameValid
      && this.state.confirmPasswordValid;
    ;
  }

  private async handleSubmit() {
    this.validate()
      .then(
        (formValid: boolean) => {
          if (formValid) {
            this.loadingButton.showLoading(true);
            this.setState({ disableButton: true });
            DataUtils.addUser(this.state.name, this.state.role, this.state.email, this.state.password, this.state.token)
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.data) {
                  this.message.showMessage({
                    message: "Sucesso. Novo id: " + responseJson.data.id,
                    type: "success"
                  });
                } else {
                  this.message.showMessage({
                    message: "Erro: " + responseJson.errors[0].message,
                    type: "danger"
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


}