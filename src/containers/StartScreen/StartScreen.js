'use strict';
import React,  {
  AppRegistry,
  Navigator,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Component
} from 'react-native';

import Login from '../../components/Login/Login';

var window = Dimensions.get('window');
class StartScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image style={[styles.background]} source={require('../../assets/images/background.png')} resizeMode="cover">
        <Login navigator={this.props.navigator}></Login>
      </Image>
    );
  }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,
    height: window.height,
    width: window.width
  }
});

export default StartScreen;
