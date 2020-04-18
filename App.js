import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {Header} from 'react-native-elements';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import India from './screens/India';
import {NavigationContainer} from '@react-navigation/native';
import List from './screens/List';
import Updates from './screens/Updates';
import TakeCare from './screens/TakeCare';
import {Icon} from 'react-native-vector-icons/FontAwesome';
import Pie from 'react-native-pie';

const Tab = createMaterialTopTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: {},
      load: false,
      modal: false,
      death: null,
      act: null,
      rec: null,
      cases: null,
    };
  }
  componentDidMount() {
    return fetch('https://corona.lmao.ninja/all', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({data: json, load: true});
        console.log();
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const Tab = createMaterialTopTabNavigator();

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={{flex: 1, marginTop: 3}}>
            <Text style={styles.heading} allowFontScaling={false}>
              COVID-19 STATS
            </Text>
          </View>
          <View style={{flex: 3, flexDirection: 'row', marginTop: 6}}>
            <View style={{flex: 3}}>
              <Text style={styles.dataa} allowFontScaling={false}>
                Total Active Cases :{' '}
                <Text style={{color: 'white'}} allowFontScaling={false}>
                  {this.state.data.active}
                </Text>
              </Text>
              <Text style={styles.dataa} allowFontScaling={false}>
                Total Recovered :{' '}
                <Text style={{color: '#00FF33'}} allowFontScaling={false}>
                  {this.state.data.recovered}
                </Text>
              </Text>

              <Text style={styles.dataa} allowFontScaling={false}>
                Total Deaths :
                <Text style={{color: '#CC0033'}} allowFontScaling={false}>
                  {' '}
                  {this.state.data.deaths}
                </Text>
              </Text>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.load) {
                    const sum =
                      this.state.data.deaths +
                      this.state.data.cases +
                      this.state.data.recovered +
                      this.state.data.active;

                    this.setState({death: this.state.data.deaths / sum});
                    this.setState({act: this.state.data.active / sum});
                    this.setState({cases: this.state.data.cases / sum});
                    this.setState({rec: this.state.data.recovered / sum});

                    this.setState({modal: true});
                  }
                }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 100,
                    backgroundColor: 'black',
                    marginLeft: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'white',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{fontWeight: 'bold', color: 'white'}}
                    allowFontScaling={false}>
                    STATS
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          style={{paddingLeft: 10, paddingRight: 10}}
          animationType="slide"
          transparent={true}
          visible={this.state.modal}>
          <View style={styles.modal_bg}>
            <View
              style={{
                flex: 3.2,
                marginTop: 18,
                flexDirection: 'column',
                paddingLeft: 20,
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={styles.txt} allowFontScaling={false}>
                  {' '}
                  {Math.round(this.state.death * 100)} %{' '}
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    backgroundColor: '#C70039',
                  }}></View>

                <Text style={styles.txt} allowFontScaling={false}>
                  Deaths
                </Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={styles.txt} allowFontScaling={false}>
                  {' '}
                  {Math.round(this.state.cases * 100)} %
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    backgroundColor: '#FBC02D',
                  }}></View>
                <Text style={styles.txt} allowFontScaling={false}>Total Cases</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={styles.txt} allowFontScaling={false}>
                  {' '}
                  {Math.round(this.state.rec * 100)} %
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    backgroundColor: '#44CD40',
                  }}></View>
                <Text style={styles.txt} allowFontScaling={false}>Recovered</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={styles.txt} allowFontScaling={false}>
                  {' '}
                  {Math.round(this.state.act * 100)} %
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    backgroundColor: '#2196F3',
                  }}></View>
                <Text style={styles.txt} allowFontScaling={false}> Active </Text>
              </View>
            </View>
            <View
              style={{flex: 4, paddingHorizontal: 100, alignSelf: 'center'}}>
              <Pie
                radius={110}
                innerRadius={60}
                sections={[
                  {
                    percentage: this.state.death * 100,
                    color: '#C70039',
                  },
                  {
                    percentage: this.state.cases * 100,
                    color: '#FBC02D',
                  },
                  {
                    percentage: this.state.rec * 100,
                    color: '#44CD40',
                  },
                  {
                    percentage: this.state.act * 100,
                    color: '#2196F3',
                  },
                ]}
                strokeCap={'butt'}
              />
            </View>
            <View style={{flex: 1}}>
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
                  marginTop: 30,
                }}
                onPress={() => {
                  this.setState({modal: false});
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}} allowFontScaling={false}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
              activeTintColor: 'black',
              labelStyle: {fontSize: 10, fontWeight: '700'},
              style: {backgroundColor: '#E3F2FD'},
            }}>
            <Tab.Screen
              name="List"
              component={List}
              options={{tabBarLabel: 'World'}}
            />
            <Tab.Screen
              name="India"
              component={India}
              options={{tabBarLabel: 'IND'}}
            />
            <Tab.Screen
              name="Updates"
              component={Updates}
              options={{tabBarLabel: 'Updates'}}
            />
            <Tab.Screen
              name="TakeCare"
              component={TakeCare}
              options={{tabBarLabel: 'Care'}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#212F3C',
    width: '100%',
    height: '13.5%',
  },
  heading: {
    fontWeight: '900',
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
    paddingBottom: 3,
    flexDirection: 'row',
  },
  dataa: {
    fontFamily: 'monospace',
    fontSize: 15,
    alignSelf: 'flex-start',
    color: '#B2BABB',
  },
  modal_bg: {
    backgroundColor: '#000c',
    height: '80%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: '20%',
    marginBottom: '20%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'white',
  },
});
