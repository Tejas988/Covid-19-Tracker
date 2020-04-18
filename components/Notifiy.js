import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  Linking,
} from 'react-native';

export default class Notify extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 5,
          backgroundColor: '#212F3D',
          borderTopWidth: 3,
          borderBottomWidth: 3,
          borderColor: 'black',
          borderRadius: 5,
        }}>
        <View style={{flex: 1, paddingVertical: 5}}>
          <Text style={styles.title} allowFontScaling={false}>
            {this.props.item.title.length > 100
              ? this.props.item.title.substr(0, 80) + '...'
              : this.props.item.title}
          </Text>
        </View>
        <View style={{flex: 2, paddingVertical: 8}} allowFontScaling={false}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(this.props.item.link);
            }}>
            <Text style={styles.descript} allowFontScaling={false}>Read</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  source: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: '800',
  },
  title: {
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 25,
    color: 'white',
    padding: 3,
  },
  descript: {
    fontFamily: 'serif',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 25,
    color: '#81D4FA',
    fontStyle: 'italic',
    padding: 3,
  },
});
