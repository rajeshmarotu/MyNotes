import React, { Component } from 'react';
import { AsyncStorage, Platform,  StyleSheet, Text, Button, View, TouchableOpacity, ScrollView,TextInput, Dimensions,Keyboard, BackAndroid} from 'react-native';

// import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
//import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base'
import { StackNavigator, TabNavigator }from 'react-navigation';
import Expo, { AppLoading } from 'expo';
// import axios from 'axios';
// import axiosMiddlware from 'redux-axios-middleware';
import { MenuContext } from 'react-native-popup-menu';

import { PersistGate } from 'redux-persist/lib/integration/react';

import configureStore from './app/store/configureStore.js';
import Home from './app/containers/homeContainer.js';
import AddNotes from './app/containers/addNotesContainer.js';
import ViewNote from './app/containers/viewNoteContainer.js'; 


class Detail extends Component{

  

  static navigationOptions = {
    title: 'Detail'
  };

  render(){
    return(

      <View>
        <Text>
            Detail
        </Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Home', { name: 'rajesh' })
          }
        >
          <Text>
              Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}



// class ViewNote extends Component{

//   static navigationOptions = {
//     title: 'View',
//     header:null
//   };

//   render(){
//     return(

//       <View>
//         <Text>
//             View
//         </Text>
//         <TouchableOpacity
//           onPress={() =>
//             this.props.navigation.goBack()
//           }
//         >
//           <Text>
//               goBack
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }



const Stack = StackNavigator({
  Home: {
    screen: Home
  },
  Detail: {
    screen: Detail
  },
  AddNotes: {
    screen: AddNotes
  },
  ViewNote: {
    screen: ViewNote
  },

});

export default class App extends Component {
  constructor() { 
    super(); 
    this.state = { isReady: false }; 
  } 

  

  async componentWillMount() {
   await Expo.Font.loadAsync({ 
    Roboto: require("native-base/Fonts/Roboto.ttf"), 
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"), 
    Feather:require("./assets/fonts/Feather.ttf"),
    FontAwesome:require("./assets/fonts/FontAwesome.ttf"),
    Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf") }); 
    this.setState({ isReady: true });
   }
  render() {
    const initialState = window.___INTITIAL_STATE__;

    var { store, persistor } = configureStore(initialState);

    if (!this.state.isReady) { 
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={<Expo.AppLoading />} persistor={persistor}>
          
            <View style={styles.container}>
              <MenuContext>
                <Stack />
              </MenuContext>
            </View>
          
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textInput: {
    paddingLeft: 10,
    fontSize: 17,
    flex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
});
