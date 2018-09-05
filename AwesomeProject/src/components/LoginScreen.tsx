import React, { Component } from 'react';
import {Button, Text, TextInput, View, Switch, AsyncStorage } from 'react-native';


export default class LoginScreen extends Component {
    navigationOptions = {
        title:'Login'
    };
    state = {
      email: "",
      password: "",
      rememberMe: false,
      emailInvalid: false,
      passwordInvalid: false,
      disableButton: false
    };

  render() {

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TextInput
          style={{height: 40, borderBottomWidth: 1, borderBottomColor:this.getBorder(this.state.emailInvalid)}}
          textContentType='emailAddress'
          placeholder="E-mail"
          autoCapitalize = 'none'
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
        {this.state.passwordInvalid && <Text>A senha deve ter pelo menos 4 caracteres</Text>}
        <Switch value={this.state.rememberMe} 
        onValueChange={()=> this.setState({rememberMe: !this.state.rememberMe})}/>
        <Text>Remember me</Text>
        <Button 
            title="Entrar"
            disabled={this.state.disableButton}
            onPress={() => this.validate(this.state.email,this.state.password)
            }
        />
      </View>
    );
  }

  validate(email: string, password: string) {
    var invalid = false;
    var regex = new RegExp(".+@.+\..+");
    if (password.length < 4) {
      this.setState({passwordInvalid:true})
      invalid = true;
    }else{
      this.setState({passwordInvalid:false});
    };

    if (!regex.test(email)) {
      this.setState({emailInvalid:true});
      invalid = true;
    }else{
      this.setState({emailInvalid:false});
    };

    if(!invalid){
      this.login()
    }
  }

  getBorder(invalid: boolean) {
    if(invalid) {
     return "red"
    } else {
      return "blue"
     };
  }

  login(){
    this.setState({disableButton:true});
    fetch('https://tq-template-server-sample.herokuapp.com/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: this.state.password,
        email: this.state.email,
        rememberMe: this.state.rememberMe
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.data){
        console.log(responseJson);
        this._storeData(responseJson.data.user.name, responseJson.data.token).then(
          this.props.navigation.navigate("Welcome"));
      }else{
        alert("Erro: "+responseJson.errors[0].message);
        this.setState({disableButton:false});
      };
    })
    .catch((error) => {
      alert("Erro: "+error);
      this.setState({disableButton:false});
    });
  }
  _storeData = async (name:string,token:string) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('name', name);

    } catch (error) {
      alert("Erro ao salvar dados");
    }
  }
}