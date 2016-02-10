'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image
} from 'react-native';

var window = Dimensions.get('window');

class Picture extends Component {
  constructor(props) {
    super(props);
    this.picture = 'http://i.imgur.com/xVyoSl.jpg';
    this.description = null;

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
    this.setState({description: text})
  }

  render() {
    var image;
    if (this.picture) {
      image =
        <Image style={[styles.picture]} source={{uri:this.picture}}></Image>;
    }
    return (
      <View style={[styles.container]}>
        {image}
        <View>
          <TextInput style={[styles.formText]} onChangeText={this.onChangeText}>
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

export default Picture;