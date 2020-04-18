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

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(this.props.item.url);
        }}>
        <View style={{flexDirection: 'column', marginBottom:10,backgroundColor:'#F3F9FB',borderTopWidth:5,borderBottomWidth:5,borderColor:'white'}}>
          <View style={{flex: 0.8,paddingVertical:10}}>
          <Text allowFontScaling={false}>Click to view full update</Text>
            <Text style={styles.source} allowFontScaling={false}>Source  :  {this.props.item.source.name}</Text>
          </View>
          <View style={{flex: 4}}>
            <Image
              style={{width: '100%', height: 200,borderWidth:1.5,borderColor:'black'}}
              source={{
                uri: this.props.item.urlToImage,
              }}
            />
          </View>
          <View style={{flex: 1,paddingVertical:5}}>
            <Text style={styles.title} allowFontScaling={false}>{this.props.item.title}</Text>
          </View>
          <View style={{flex: 2,paddingVertical:8}}>
            <Text style={styles.descript} allowFontScaling={false}>{this.props.item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  source: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: '800',
    color:'#600080'
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descript: {
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: '400',
    color:'#602020'
  },
});
