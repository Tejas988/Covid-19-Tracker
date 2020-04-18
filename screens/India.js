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
  Thumbnail,
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
import IndiaItem from '../components/IndiaItems';
import Hospitals from '../components/Hospital';
import Telephone from '../components/Telephone';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

function Chart({c1, c2, c3, c4, lab, dat, val, bar}) {
  return (
    <View style={{flex: 3}}>
      <View
        style={{
          width: '100%',
          height: 40,
          borderRadius: 100,
          flexDirection: 'row',
          backgroundColor: bar,
          marginTop: 10,
        }}>
        <Text style={styles.axes} allowFontScaling={false}>
          X-Axis : Weeks
        </Text>
        <Text style={styles.axes} allowFontScaling={false}>
          Y-Axis : {val}
        </Text>
      </View>
      <LineChart
        data={{
          labels: lab,
          datasets: [
            {
              data: dat,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={380}
        verticalLabelRotation={-30}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: c1,
          backgroundGradientFrom: c2,
          backgroundGradientTo: c3,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: c4,
          },
        }}
        bezier
        style={{
          marginVertical: 4,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

export default class India extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
      summ: {},
      Hosp: {},
      Tel: {},
      History: {},
      case: true,
      hosp: false,
      tel: false,
      loadd: false,
      recov: false,
      death: false,
    };
  }

  componentDidMount() {
    fetch('https://api.rootnet.in/covid19-in/stats/latest', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        function compare(a, b) {
          const bandA = a.confirmedCasesIndian + a.confirmedCasesForeign;
          const bandB = b.confirmedCasesForeign + b.confirmedCasesIndian;

          let comparison = 0;
          if (bandA < bandB) {
            comparison = 1;
          } else if (bandA > bandB) {
            comparison = -1;
          }
          return comparison;
        }

        this.setState({
          Data: json.data.regional.sort(compare),
        });
      })
      .catch(err => {
        console.log(err);
      });
    fetch('https://corona.lmao.ninja/countries/India', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          summ: json
        });
        
      })
      .catch(err => {
        console.log(err);
      });

    fetch('https://api.rootnet.in/covid19-in/stats/hospitals', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({Hosp: json.data});
      })
      .catch(err => {
        console.log(err);
      });
    fetch('https://api.rootnet.in/covid19-in/contacts', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({Tel: json.data});
      })
      .catch(err => {
        console.log(err);
      });
    fetch('https://corona.lmao.ninja/v2/historical/India', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({History: json.timeline, loadd: true});
        console.log(json);
      })
      .catch(err => {
        console.log(err);
      });
  }

  Labels = A => {
    const CDK = [];
    let k = 0;
    for (let i in A) {
      k++;
      if (k % 7 == 0 && k > 30) CDK.push(`W${k / 7 - 4}`);
    }
    return CDK;
  };
  Data = A => {
    const CDV = [];
    let k = 6;
    for (let i in A) {
      k++;
      if (k % 7 == 0 && k > 24) {
        CDV.push(parseInt(A[i]));
      }
    }
    return CDV;
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#F3F9FB',
        }}>
        <ScrollView>
          <View style={{flex: 1, width: '100%', height: 350}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 0.5}}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    marginTop: 6,
                  }}
                  source={{
                    uri:
                      'https://cdn.pixabay.com/photo/2018/01/21/14/36/india-flag-3096740_1280.png',
                  }}
                />
              </View>
              <View style={{flex: 3, paddingBottom: 100}}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                  allowFontScaling={false}>
                  INDIA
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 5,
                backgroundColor: 'white',
                height: 300,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <Image
                style={{width: '100%', height: 170}}
                source={{
                  uri:
                    'https://cdn.pixabay.com/photo/2018/08/29/09/27/india-3639503_1280.jpg',
                }}
              />
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                marginVertical: 10,
                height: 300,
              }}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold'}}
                allowFontScaling={false}>
                Total Cases :{' '}
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#330000'}}
                  allowFontScaling={false}>
                  {this.state.summ.cases}
                </Text>
              </Text>
              <Text
                style={{fontSize: 20, fontWeight: 'bold'}}
                allowFontScaling={false}>
                Total Recovered :{' '}
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#00CC33'}}
                  allowFontScaling={false}>
                  {this.state.summ.recovered}
                </Text>
              </Text>
              <Text
                style={{fontSize: 20, fontWeight: 'bold'}}
                allowFontScaling={false}>
                Total Deaths :{' '}
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#FF0033'}}
                  allowFontScaling={false}>
                  {this.state.summ.deaths}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              borderTopWidth: 0.75,
              borderColor: '#99A3A4',
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                width: 60,
                height: 60,
                margin: 10,
                backgroundColor: '#273746',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}
              onPress={() => {
                this.setState({loadd: true, recov: false, death: false});
              }}>
              <Text
                style={{color: 'white', fontWeight: 'bold'}}
                allowFontScaling={false}>
                Cases
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                width: 60,
                height: 60,
                margin: 10,
                backgroundColor: '#6C3483',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}
              onPress={() => {
                this.setState({loadd: false, recov: true, death: false});
              }}>
              <Text
                style={{color: 'white', fontWeight: 'bold'}}
                allowFontScaling={false}>
                Recov
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                width: 60,
                height: 60,
                margin: 10,
                backgroundColor: '#A93226',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}
              onPress={() => {
                this.setState({loadd: false, recov: false, death: true});
              }}>
              <Text
                style={{color: 'white', fontWeight: 'bold'}}
                allowFontScaling={false}>
                Deaths
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.loadd && (
            <Chart
              c1="#1C2833"
              c2="#2C3E50"
              c3="#ABB2B9"
              c4="#EAECEE"
              lab={this.Labels(this.state.History.cases)}
              dat={this.Data(this.state.History.cases)}
              val="Cases"
              bar="#1C2833"
            />
          )}
          {this.state.death && (
            <Chart
              c1="#641E16"
              c2="#922B21"
              c3="#E53935"
              c4="#FDEDEC"
              lab={this.Labels(this.state.History.deaths)}
              dat={this.Data(this.state.History.deaths)}
              val="Deaths"
              bar="#641E16"
            />
          )}
          {this.state.recov && (
            <Chart
              c1="#1a001a"
              c2="#4d004d"
              c3="#990099"
              c4="#ffb3ff"
              lab={this.Labels(this.state.History.recovered)}
              dat={this.Data(this.state.History.recovered)}
              val="Recovered"
              bar="#1a001a"
            />
          )}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 25,
              borderTopWidth: 0.75,
              borderColor: '#99A3A4',
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                width: 60,
                height: 60,
                margin: 10,
                backgroundColor: '#273746',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}
              onPress={() => {
                this.setState({case: true, hosp: false, tel: false});
              }}>
              <Text
                style={{color: 'white', fontWeight: 'bold'}}
                allowFontScaling={false}>
                Cases
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                width: 60,
                height: 60,
                margin: 10,
                backgroundColor: '#6C3483',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}
              onPress={() => {
                this.setState({case: false, hosp: true, tel: false});
              }}>
              <Text
                style={{color: 'white', fontWeight: 'bold'}}
                allowFontScaling={false}>
                Hosp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                width: 60,
                height: 60,
                margin: 10,
                backgroundColor: '#A93226',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}
              onPress={() => {
                this.setState({case: false, hosp: false, tel: true});
              }}>
              <Text
                style={{color: 'white', fontWeight: 'bold'}}
                allowFontScaling={false}>
                Help
              </Text>
            </TouchableOpacity>
          </View>

          {this.state.case && (
            <View style={{flex: 4, width: '100%', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#1C2833',
                  width: DEVICE_WIDTH - 26,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  height: 50,
                  flexDirection: 'row',
                }}>
                <Text style={styles.productNameHeader} allowFontScaling={false}>
                  States
                </Text>
                <Text style={styles.itemsHeader} allowFontScaling={false}>
                  Cases
                </Text>
                <Text style={styles.priceHeader} allowFontScaling={false}>
                  Deaths
                </Text>
              </View>

              <ScrollView>
                <View>
                  <FlatList
                    style={styles.flatlist}
                    data={this.state.Data}
                    // scrollEnabled={true}
                    renderItem={({item}) => <IndiaItem item={item} />}
                    keyExtractor={item => item.loc}
                  />
                </View>
              </ScrollView>
            </View>
          )}
          {this.state.hosp && (
            <View style={{flex: 4, width: '100%', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#6C3483',
                  width: DEVICE_WIDTH - 26,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  height: 50,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    flex: 0.7,
                    alignSelf: 'flex-start',
                    fontSize: 18,
                    marginLeft: 18,
                    fontWeight: 'bold',
                    paddingTop: 10,
                    color: 'white',
                  }}
                  allowFontScaling={false}>
                  States
                </Text>
                <Text
                  style={{
                    flex: 0.4,
                    fontSize: 18,
                    fontWeight: 'bold',
                    paddingTop: 10,
                    color: 'white',
                  }}
                  allowFontScaling={false}>
                  Hospitals
                </Text>
                <Text
                  style={{
                    flex: 0.3,
                    marginLeft: 15,
                    fontSize: 18,
                    fontWeight: 'bold',
                    paddingTop: 10,
                    color: 'white',
                  }}
                  allowFontScaling={false}>
                  Beds
                </Text>
              </View>

              <ScrollView>
                <View>
                  <FlatList
                    style={styles.flatlist}
                    data={this.state.Hosp.regional}
                    // scrollEnabled={true}
                    renderItem={({item}) => <Hospitals item={item} />}
                    keyExtractor={item => item.state}
                  />
                </View>
              </ScrollView>
            </View>
          )}
          {this.state.tel && (
            <View style={{flex: 4, width: '100%', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#A93226',
                  width: DEVICE_WIDTH - 26,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  height: 50,
                  flexDirection: 'row',
                }}>
                <Text style={styles.productNameHeader} allowFontScaling={false}>
                  States
                </Text>
                <Text style={styles.priceHeader} allowFontScaling={false}>
                  Helpline
                </Text>
              </View>

              <ScrollView>
                <View>
                  <FlatList
                    style={styles.flatlist}
                    data={this.state.Tel.contacts.regional}
                    // scrollEnabled={true}
                    renderItem={({item}) => <Telephone item={item} />}
                    keyExtractor={item => item.loc}
                  />
                </View>
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </View>
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
  },
  axes: {
    color: 'white',
    fontFamily: 'monospace',
    fontWeight: '900',
    fontSize: 15,
    paddingLeft: 18,
    paddingTop: 10,
  },
  tableHeader: {
    backgroundColor: '#1C2833',
    // backgroundColor: 'red',
    // alignSelf: 'stretch',
    width: DEVICE_WIDTH - 26,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 50,
    flexDirection: 'row',
  },
  productNameHeader: {
    flex: 0.8,
    fontSize: 18,
    paddingLeft: 6,
    fontWeight: 'bold',
    paddingTop: 10,
    marginLeft: 10,
    color: 'white',
  },
  itemsHeader: {
    flex: 0.3,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    color: 'white',
  },
  priceHeader: {
    flex: 0.3,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    color: 'white',
  },
  modal_bg: {
    backgroundColor: '#000c',
    height: 600,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
    marginBottom: 20,
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
