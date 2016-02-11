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
  TouchableHighlight,
  LayoutAnimation
} from 'react-native';

var window = Dimensions.get('window');
var Firebase = require('firebase');
import Swiper from '../Swiper/Swiper';

import Picture from '../Picture/Picture';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loading: false
    };

    this.loginOrRegister = this.loginOrRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.navigateToSwiper = this.navigateToSwiper.bind(this);
    this.showError = this.showError.bind(this);
  }

  navigateToSwiper(userData) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.props.navigator.replace({
      title: 'Gainsville',
      component: Swiper,
      props: {profile: userData}
    });
  }

  showError(message) {
    Alert.alert('Error', message);
    this.setState({loading: false});
  }

  loginOrRegister() {
    var self = this;
    self.setState({loading: true});
    if (!this.state.email || !this.state.password) {
      self.showError('Bruh, you need to give me an email and a password.');
    } else {
      var gainsvilleFirebase = new Firebase('https://gainsville.firebaseio.com');
      gainsvilleFirebase.authWithPassword({
        email: self.state.email,
        password: self.state.password
      }, function(err, userData) {
        if (err) {
          if (err.code === 'INVALID_USER') {
            gainsvilleFirebase.createUser({
              email: self.state.email,
              password: self.state.password
            }, function(error, userData) {
              if (error) {
                self.showError(error.message);
              } else {
                self.navigateToSwiper(userData);
              }
            });
          } else {
            self.showError(err.message);
          }
        } else {
          self.navigateToSwiper(userData);
        }
      });
    }
  }
  
  onChangeEmail(text) {
    this.setState({email: text});
  }
  
  onChangePassword(text) {
    this.setState({password: text});
  }

  render() {
    var loginButton;
    if (this.state.loading) {
      loginButton =
        <TouchableHighlight style={[styles.loginButton]}>
          <Text>Logging in...</Text>
        </TouchableHighlight>;
    } else {
      loginButton =
        <TouchableHighlight style={[styles.loginButton]} onPress={this.loginOrRegister.bind(this)}>
          <Text>Enter Gainsville</Text>
        </TouchableHighlight>;
    }
    return (
      <View style={[styles.container]}>
        <Image style={[{height: window.width, width: window.width}]}
          source={{uri: 'http://rlv.zcache.com/gainesville_script_logo_in_white_postcard-r885cf23a3c96480d92d96bbe5a9580a6_vgbaq_8byvr_324.jpg'}} />
        <View style={[styles.formContainer]}>
          <Text>Email</Text>
          <TextInput style={[styles.formText]}
                     onChangeText={this.onChangeEmail}>
          </TextInput>
        </View>
        <View style={[styles.formContainer]}>
          <Text>Password</Text>
          <TextInput style={[styles.formText]}
                     secureTextEntry={true}
                     keyboardType={'email-address'}
                     onChangeText={this.onChangePassword}>
          </TextInput>
        </View>
        <View style={[styles.formContainerLast]}>
          {loginButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  formContainer: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 0
  },
  formContainerLast: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginTop: 10
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
  loginButton: {
    backgroundColor: '#557ebf',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: .2,
    shadowOffset: {height: 5},
    shadowRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default Login;