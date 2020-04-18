import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
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
  Modal,
  Button,
  Image,
} from 'react-native';
import ListItem from '../components/ListItem';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      img: null,
      name: '',
      casesToday: '',
      TotalDeath: '',
      TodayDeath: '',
      Active: '',
      recover: '',
      critical: '',
      modal: false,
    };
  }

  componentDidMount() {
    fetch('https://corona.lmao.ninja/countries?sort=country', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        const Alpha = {
          A: 12,
          B: 5,
          C: 10,
          D: 1,
          E: 2,
          F: 5,
          G: 4,
          H: 3,
          I: 9,
          J: 2,
          K: 2,
          L: 2,
          M: 5,
          N: 5,
          O: 1,
          P: 10,
          Q: 1,
          R: 2,
          S: 17,
          T: 3,
          U: 6,
          V: 1,
          Z: 1,
        };
        const dataa = [];
        for (let obj in json) {
          if (Alpha[json[obj].country[0]] > 0) {
            dataa.push(json[obj]);
            Alpha[json[obj].country[0]] -= 1;
          }
        }
        this.setState({Data: dataa.reverse()});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container style={{backgroundColor: '#F3F9FB'}}>
        <Content>
          {/* the entire outerpart */}
          <Modal
            style={{paddingLeft: 40, paddingRight: 40}}
            animationType="slide"
            transparent={true}
            visible={this.state.modal}>
            <View style={styles.modal_bg}>
              <View style={{flex: 3, marginTop: 30}}>
                <Image
                  style={{width: 180, height: 180, borderRadius: 100,borderWidth:3,borderColor:'white'
                  ,alignSelf:'center'}}
                  source={{uri: this.state.img}}
                />
                <View style={{marginTop: 20,alignItems:'center'}}>
                  <Text
                    style={{color: 'white', fontSize: 35, fontWeight: 'bold'}} allowFontScaling={false}>
                    {' '}
                    {this.state.name}
                  </Text>
                </View>
                <View style={{marginTop: 30, justifyContent: 'space-between',alignItems:'center'}}>
                  <Text style={styles.tt} allowFontScaling={false}>
                    {' '}
                    Active Cases : {this.state.Active}{' '}
                  </Text>
                  <Text style={styles.tt} allowFontScaling={false}>
                    {' '}
                    Recovered : {this.state.recover}
                  </Text>
                  <Text style={styles.tt} allowFontScaling={false}>
                    {' '}
                    Deaths : {this.state.TotalDeath}
                  </Text>
                  <Text style={styles.tt} allowFontScaling={false}>
                    {' '}
                    Deaths Today : {this.state.TodayDeath}
                  </Text>
                </View>
              </View>

              <View style={{flex:0.6}}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  width: 100,
                  height: 40,
                  backgroundColor: '#6C3483',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={() => {
                  this.setState({modal: false});
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}} allowFontScaling={false}>BACK</Text>
              </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Body style={styles.listContainer}>
            {/* the header of table */}
            <View style={styles.tableHeader}>
              <CardItem style={{backgroundColor: 'rgba(255,255,255,0)'}}>
                <Text style={styles.productNameHeader} allowFontScaling={false}>Country</Text>
                <Text style={styles.itemsHeader} allowFontScaling={false}>Cases</Text>
                <Text style={styles.priceHeader} allowFontScaling={false}>Deaths</Text>
              </CardItem>
            </View>

            {/* the inner list */}
            <ScrollView>
              <View>
                <FlatList
                  style={styles.flatlist}
                  data={this.state.Data}
                  // scrollEnabled={true}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          img: item.countryInfo.flag,
                          name: item.country,
                          casesToday: item,
                          TotalDeath: item.deaths,
                          TodayDeath: item.todayDeaths,
                          Active: item.active,
                          recover: item.recovered,
                          critical: item.critical,
                          modal: true,
                        });
                      }}>
                      <ListItem item={item} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.countryInfo._id}
                />
              </View>
            </ScrollView>
          </Body>
        </Content>
      </Container>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    borderColor: '#858585',
    borderWidth: 0.5,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
    width: DEVICE_WIDTH - 32,
    // flexDirection: 'column',
    // backgroundColor: 'blue',
  },
  flatlist: {
    width: DEVICE_WIDTH - 32,
    backgroundColor: '#fff',
    height: '100%',
  },
  tableHeader: {
    backgroundColor: '#BCAAA4',
    // backgroundColor: 'red',
    // alignSelf: 'stretch',
    width: DEVICE_WIDTH - 26,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  productNameHeader: {
    flex: 0.8,
    fontSize: 18,
    paddingLeft: 6,
    fontWeight: 'bold',
  },
  itemsHeader: {
    flex: 0.3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceHeader: {
    flex: 0.3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal_bg: {
    backgroundColor: '#000c',
    height: DEVICE_HEIGHT-100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tt: {
    color: 'white',
    fontSize: 24,
    marginBottom: 9,
  },
});
