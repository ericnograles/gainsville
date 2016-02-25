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

import Firebase from 'firebase';
import Landing from '../../containers/Landing/Landing';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

var window = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loading: false
    };

    this.onUserStoreChange = this.onUserStoreChange.bind(this);
    this.loginOrRegister = this.loginOrRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.navigateToSwiper = this.navigateToSwiper.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.onUserStoreChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onUserStoreChange);
  }

  onUserStoreChange(state) {
    var self = this;
    if (state.status === 'logging_in') {
      self.setState({loading: true});
    } else if (state.error) {
      self.showError(state.error.message);
    } else if (state.status === 'authenticated') {
      self.navigateToSwiper(state.userData);
    }
  }

  navigateToSwiper(userData) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.props.navigator.push({
      title: 'Gainsville',
      component: Landing,
      props: {profile: userData}
    });
  }

  showError(message) {
    Alert.alert('Error', message);
    this.setState({loading: false});
  }

  loginOrRegister() {
    var self = this;
    if (!this.state.email || !this.state.password) {
      self.showError('Bruh, you need to give me an email and a password.');
    } else {
      UserActions.startLogin();
      UserActions.login(this.state.email, this.state.password);
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
          <Text style={[{color: '#fff'}]}>LOGGING IN...</Text>
        </TouchableHighlight>;
    } else {
      loginButton =
        <TouchableHighlight style={[styles.loginButton]} onPress={this.loginOrRegister.bind(this)}>
          <Text style={[{color: '#fff'}]}>ENTER</Text>
        </TouchableHighlight>;
    }
    return (
      <View style={[styles.container]}>
          <Image style={[styles.logo]} resizeMode="stretch"
            source={require('../../assets/images/logo-main.png')} />
          <View style={[styles.formContainer]}>
            <Text style={[styles.formLabel]}>Email</Text>
            <TextInput style={[styles.formText]}
                       onChangeText={this.onChangeEmail}>
            </TextInput>
          </View>
          <View style={[styles.formContainer]}>
            <Text style={[styles.formLabel]}>Password</Text>
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
  },
  logo: {
    height: window.width,
    width: window.width
  },
  formContainer: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 0,
    paddingLeft: 0,
    paddingTop: 10
  },
  formContainerLast: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingTop: 25,
  },
  picture: {
    height: window.width,
    width: window.width
  },
  formLabel: {
    height: 20,
    color: '#fff'
  },
  formText: {
    height: 40,
    width: window.width - 40,
    backgroundColor: '#1f2429',
    borderWidth: 1,
    borderColor: 'gray',
    color: '#fff'
  },
  loginButton: {
    backgroundColor: '#a60707',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: .2,
    shadowOffset: {height: 5},
    shadowRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    width: window.width - 40
  }
});

export default Login;