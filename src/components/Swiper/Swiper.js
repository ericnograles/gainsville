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
  AlertIOS,
  TouchableOpacity
} from 'react-native';

var window = Dimensions.get('window');
import Picture from '../Picture/Picture';

class Swiper extends Component {
  constructor(props) {
    super(props);
  }

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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default Swiper;