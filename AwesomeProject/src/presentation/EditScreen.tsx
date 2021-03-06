import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import FlashMessage from 'react-native-flash-message'
import EditUser from '../domain/useCases/EditUser';
import { primaryColor, StyledWrapper } from './common/components/StyledComponents';
import { MessageBody } from '../domain/useCases/interface/QueryModels';
export default class EditScreen extends React.Component<any>{

  async componentDidMount() {
    let data = this.props.navigation.getParam('data', 'no-data');
    this.setState({
      name: data.name,
      email: data.email,
      role: data.role,
      id: this.props.navigation.getParam('id', 'no-token'),
      token: this.props.navigation.getParam('token', 'no-token')
    })
  }

  state = {
    name: "",
    id: "",
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

  message: any;

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
            value={this.state.name}
            shake={!this.state.nameValid}
            onChangeText={(value) => this.setState({ name: value })} />
          {!this.state.nameValid && <FormValidationMessage >Required, should have only letters</FormValidationMessage>}

          <FormLabel>Role*</FormLabel>
          <RNPickerSelect
            value={this.state.role}
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
            value={this.state.email}
            shake={!this.state.emailValid}
            onChangeText={(value) => this.setState({ email: value })}
            autoCapitalize='none'
          />
          {!this.state.emailValid && <FormValidationMessage >Invalid email format</FormValidationMessage>}
          <StyledWrapper>
            <AnimateLoadingButton
              ref={(thisButton: any) => (this.loadingButton = thisButton)}
              backgroundColor={primaryColor}
              title="Salvar"
              width={300}
              height={50}
              disabled={this.state.disableButton}
              onPress={() => this.handleSubmit()
              }
            />
          </StyledWrapper>
        </View>
      </Card>
      <FlashMessage ref={(message: any) => this.message = message} position="top" />

    </View>

  }

  async validate() {
    let regexEmail = new RegExp(".+@.+\..+");
    let regexName = new RegExp("^([A-Za-z]| )+$");

    await this.setState(
      {
        emailValid: regexEmail.test(this.state.email),
        roleValid: !!this.state.role,
        nameValid: regexName.test(this.state.name),
      }
    );


    return this.state.emailValid
      && this.state.roleValid
      && this.state.nameValid
      ;
  }

  private async handleSubmit() {
    this.validate()
      .then(
        (formValid: boolean) => {
          if (formValid) {
            this.loadingButton.showLoading(true);
            this.setState({ disableButton: true });
            let request: MessageBody = {
              id: this.state.id,
              name: this.state.name,
              role: this.state.role,
              email: this.state.email,
              password: this.state.password,
              token: this.state.token
            };
            (new EditUser()).exec(request)
              .then((response) => {
                if (!response.errorMessage) {
                  this.props.navigation.goBack();
                  //dispara a mensagem da tela de detalhes
                  this.props.navigation.getParam('message', 'no-message').showMessage({
                    message: "Sucesso. Id com alteracoes: " + response.id,
                    type: "success"
                  });
                } else {
                  this.message.showMessage({
                    message: "Erro: " + response.errorMessage,
                    type: "danger"
                  });
                }
              });
          };

        })
      .then(() => {
        this.setState({ disableButton: false });
        this.loadingButton.showLoading(false);
      });
  };

}
