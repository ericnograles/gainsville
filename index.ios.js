/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Picture from './src/components/Picture/Picture';
var Firebase = require('firebase');
global.gainsvilleFirebase = new Firebase('https://gainsville.firebaseIO.com');

class gainsville extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Gainsville
        </Text>
        <Picture></Picture>
        <View>
          <TouchableOpacity>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('gainsville', () => gainsville);
