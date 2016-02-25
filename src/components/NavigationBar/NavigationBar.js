import React, { View, Image, Text, Component, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var backButton;
    if (this.props.hasBackButton) {
      backButton =
        <TouchableHighlight>
          <Text>Back</Text>
        </TouchableHighlight>;
    }
    return (
      <View style={[styles.container]}>
        <TouchableHighlight style={[styles.backButton]}>
          <Text style={[styles.backButtonText]}>Back</Text>
        </TouchableHighlight>
        <Image style={[styles.logo]}
               resizeMode={Image.resizeMode.cover}
               source={require('../../assets/images/logo-text.png')}></Image>
      </View>
    )
  }
}

var window = Dimensions.get('window');
var styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
  backButton: {
    //paddingRight: 40
  },
  backButtonText: {
    color: '#fff'
  },
  logo: {
    height: 30,
    width: window.width - 150
  },
});

export default NavigationBar;