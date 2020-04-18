import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Button,
  Body,
  Input,
  Container,
  Content,
  Header,
  Right,
  Left,
  Item,
  Label,
  Card,
  CardItem,
} from 'native-base';
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
} from 'react-native';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
   
  }
  componentDidMount() {
    console.disableYellowBox = true;
   
  }

  render() {
    return (
      <View style={listItemStyles.container}>
        <CardItem style={{backgroundColor:'#FAFAFA'}}>
          <Text style={listItemStyles.name} allowFontScaling={false}>
            {' '}
            <Image
              style={listItemStyles.stretch}
              source={{uri: this.props.item.countryInfo.flag}}
              borderRadius="100"
            />      {this.props.item.country}
              
          </Text>
          <Text style={listItemStyles.items} allowFontScaling={false}>{this.props.item.cases}</Text>
          <Text style={listItemStyles.price} allowFontScaling={false}>{this.props.item.deaths}</Text>
        </CardItem>
      </View>
    );
  }
}

const listItemStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
  },
  stretch: {
    width: 28,
    height: 28,
    borderRadius:100,
  },
  name: {
    textAlign: 'left',
    flex: 0.99,
    fontSize: 16,
  },
  items: {
    flex: 0.4,
    fontSize: 15,
  },
  price: {
    flex: 0.22,
    fontSize: 15,
  },

  // backgroundColor: '#4796BD', blue
  // backgroundColor: '#E0E0E0', grey
});
