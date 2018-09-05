import React, { Component } from 'react';
import {Button, Text, TextInput, View } from 'react-native';


export default class LoginScreen extends Component {
    navigationOptions = {
        title:'Login'
    };
    state = {
      email: "",
      password: "",
      emailInvalid: false,
      passwordInvalid: false
    };

  render() {

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TextInput
          style={{height: 40, borderBottomWidth: 1, borderBottomColor:this.getBorder(this.state.emailInvalid)}}
          textContentType='emailAddress'
          placeholder="E-mail"
          onChangeText={(text) => this.setState({email:text})}
        />
        {this.state.emailInvalid && <Text>E-mail inválido</Text>}
        <TextInput
          style={{height: 40, borderBottomWidth: 1, borderBottomColor:this.getBorder(this.state.passwordInvalid)}}
          textContentType="password"
          secureTextEntry={true}
          placeholder="Senha"
          onChangeText={(text) => this.setState({password:text})}
        />
        {this.state.passwordInvalid && <Text>A senha deve pelo menos 4 caracteres</Text>}
        <Button 
            title="Entrar"
            onPress={() => this.validate(this.state.email,this.state.password)
            }
        />
      </View>
    );
  }

  validate(email: string, password: string) {

    var regex = new RegExp(".+@.+\..+");
    if (password.length < 4) {
      this.setState({passwordInvalid:true})
    }else{
      this.setState({passwordInvalid:false})
    };

    if (!regex.test(email)) {
      this.setState({emailInvalid:true})
    }else{
      this.setState({emailInvalid:false})
    };
  
  }

  getBorder(invalid: boolean) {
    if(invalid) {
     return "red"
    } else {
      return "blue"
     };
  }
}