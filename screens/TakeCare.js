import React, {Component} from 'react';
import {View, Text, ScrollView, Image, FlatList} from 'react-native';
import Notify from '../components/Notifiy';

export default class TakeCare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
    };
  }
  componentDidMount() {
    fetch('https://api.rootnet.in/covid19-in/notifications', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({Data: json.data.notifications});
        console.log(this.state.Data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F3F9FB',
          }}>
          <Text style={{fontFamily: 'Robot', fontSize: 25, fontWeight: 'bold',marginTop: 10}} allowFontScaling={false}>
            AREAS AFFECTED
          </Text>
          <Image
            style={{width: '100%', height: 300, marginTop: 38}}
            source={{
              uri:
                'https://www.telegraph.co.uk/content/dam/global-health/2020/03/05/DATA-UK-CORONAVIRUS-WORLD-tracker_trans_NvBQzQNjv4BqWIL5Vl0FjAAKFKfl2nMCs_RHbCYFqTjfsIo6JCIkFTg.jpg?imwidth=1280',
            }}
          />
          <View style={{ width: '100%', height: 400, marginTop: 30,flex:0.5}}>
            <Text
              style={{
                fontFamily: 'Robot',
                fontSize: 25,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: 18
              }} allowFontScaling={false}>
              SYMPTOMS
            </Text>
            <Image
              style={{width: '100%', height: 250, marginTop: 35,borderBottomWidth:0.75,borderColor:'black'}}
              source={{
                uri:
                  'https://image.shutterstock.com/z/stock-vector-coronavirus-ncov-symptoms-healthcare-and-medicine-infographic-1627696849.jpg',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: 'Robot',
                fontSize: 25,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginBottom:40
              }} allowFontScaling={false}>
              NOTIFICATIONS
            </Text>
            <FlatList
              style={{width: '100%'}}
              data={this.state.Data}
              // scrollEnabled={true}
              renderItem={({item}) => <Notify item={item} />}
              keyExtractor={item => item.title}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
