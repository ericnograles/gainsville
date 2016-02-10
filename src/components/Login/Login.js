'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions
} from 'react-native';

var window = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.userName = null;
    this.password = null;
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount() {
    console.log('Login componentDidMount');
  }

  componentWillMount() {
    console.log('Login componentWillMount');
  }

  componentWillUnmount() {
    console.log('Login componentWillUmount');
  }

  onChangeText(text) {
    this.setState({userName: text});
  }

  render() {
    return (
        <View style={[styles.container]}>
          <Text>Username</Text>
          <View>
            <TextInput style={[{
            height: 20, width: window.width,
            borderColor: 'gray',
            borderWidth: 1
            }]} onChangeText={this.onChangeText}>
            </TextInput>
          </View>
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Login;