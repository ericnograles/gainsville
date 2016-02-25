import React, {
  View,
  Image,
  Text,
  Component,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native';

import StartScreen from '../../containers/StartScreen/StartScreen';
import UserActions from '../../actions/UserActions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
    this._back = this._back.bind(this);
  }

  _logout() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    UserActions.logout();
    this.props.navigator.replace({
      component: StartScreen
    });
  }

  _back() {
    this.props.navigator.pop();
  }

  render() {
    var backButton;
    if (this.props.hasBackButton) {
      backButton =
        <TouchableHighlight onPress={this._back} style={[styles.backButton]}>
          <Text style={[styles.backButtonText]}>Back</Text>
        </TouchableHighlight>;
    }

    var logoutButton;
    if (this.props.hasLogoutButton) {
      logoutButton =
        <TouchableHighlight onPress={this._logout} style={[styles.logoutButton]}>
          <Text style={[styles.logoutButtonText]}>X</Text>
        </TouchableHighlight>;
    }
    return (
      <View style={[styles.container]}>
        <View>
          {backButton}
        </View>
        <Image style={[styles.logo]}
               resizeMode={Image.resizeMode.cover}
               source={require('../../assets/images/logo-text.png')}></Image>
        <View style={[styles.button]}>
          {logoutButton}
        </View>
      </View>
    )
  }
}

var window = Dimensions.get('window');
var styles = StyleSheet.create({
  container: {
    height: 80,
    width: window.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#1f2429',
  },
  backButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -25,
    right: 10,
    padding: 10,
    width: 60,
    borderRadius: 10,
    backgroundColor: '#a60707'
  },
  backButtonText: {
    color: '#fff'
  },
  button: {
    paddingBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    justifyContent: 'center',
    top: -6,
    left: 40,
    height: 30,
    width: 30,
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#a60707'
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  logo: {
    height: 30,
    width: window.width - 150
  },
});

export default NavigationBar;