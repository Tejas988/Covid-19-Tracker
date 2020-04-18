import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import News from '../components/News';

export default class Updates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
    };
  }

  componentDidMount() {
    fetch(
      'https://newsapi.org/v2/top-headlines?country=in&apiKey=40c2f51183ae4e23a6ab70c6081c2516&pageSize=100',
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        let A = json.articles;
        let Ary = [];
        for (let i in A) {
          if (
            A[i].title.includes('COVID-19') ||
            A[i].title.includes('Covid-19') ||
            A[i].title.includes('covid-19') ||
            A[i].title.includes('coronavirus') ||
            A[i].title.includes('Coronavirus') ||
            A[i].title.includes('CORONA VIRUS') ||
            A[i].title.includes('Corona Virus') ||
            A[i].title.includes('CoronaVirus')
          ) {
            Ary.push(A[i]);
          }
        }
        this.setState({Data: Ary});
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#47476b',
        }}>
        <ScrollView>
          <View style={{flex: 1}}>
            <FlatList
              style={{width: '100%'}}
              data={this.state.Data}
              // scrollEnabled={true}
              renderItem={({item}) => <News item={item} />}
              keyExtractor={item => item.title}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
// 40c2f51183ae4e23a6ab70c6081c2516
