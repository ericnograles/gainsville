'use strict';
import React,  {
  AppRegistry,
  Navigator,
  View,
  StyleSheet,
  Component
} from 'react-native';

import Login from '../../components/Login/Login';

class StartScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Login navigator={this.props.navigator}></Login>
    );
  }
}

var styles = StyleSheet.create({

});

export default StartScreen;
