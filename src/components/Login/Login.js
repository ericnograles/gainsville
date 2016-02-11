'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  Alert,
  TouchableHighlight
} from 'react-native';

var window = Dimensions.get('window');
var Firebase = require('firebase');
import Swiper from '../Swiper/Swiper';

import Picture from '../Picture/Picture';

class Login extends Component {
  constructor(props) {
    super(props);
    this.email = null;
    this.password = null;

    this.loginOrRegister = this.loginOrRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  navigateToSwiper(userData) {
    this.props.navigator.push({
      title: 'Gainsville',
      component: Swiper,
      props: {profile: userData}
    });
  }

  loginOrRegister() {
    var self = this;
    var gainsvilleFirebase = new Firebase('https://gainsville.firebaseio.com');
    gainsvilleFirebase.authWithPassword({
      email: self.email,
      password: self.password
    }, function(err, userData) {
      if (err) {
        if (err.code === 'INVALID_USER') {
          gainsvilleFirebase.createUser({
            email: self.email,
            password: self.password
          }, function(error, userData) {
            if (error) {
              console.log(error);
            } else {
              self.navigateToSwiper(userData);
            }
          });
        } else {
          console.log(err);
        }
      } else {
        self.navigateToSwiper(userData);
      }
    });
  }
  
  onChangeEmail(text) {
    this.email = text;
  }
  
  onChangePassword(text) {
    this.password = text;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.formContainer]}>
          <Text>Email</Text>
          <TextInput style={[styles.formText]}
                     onChangeText={this.onChangeEmail}>
          </TextInput>
          <Text>Password</Text>
          <TextInput style={[styles.formText]}
                     secureTextEntry={true}
                     keyboardType={'email-address'}
                     onChangeText={this.onChangePassword}>
          </TextInput>
          <TouchableHighlight onPress={this.loginOrRegister.bind(this)}>
            <Text>Enter Gainsville</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  picture: {
    height: window.width,
    width: window.width
  },
  formText: {
    height: 20,
    width: window.width,
    borderColor: 'gray',
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Login;