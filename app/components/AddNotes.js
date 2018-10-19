import React , { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions, Keyboard, Platform, KeyboardAvoidingView, BackHandler } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, } from 'native-base';
import HeaderIconButtonTextButton from './HeaderIconButtonTextButton.js';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { NavigationActions } from 'react-navigation';
// import Icon from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default class Add extends Component{


  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      keyboardVisibility:false,
      notesHeight:windowHeight,
      height:40
    }
    this._handleBackPress = this._handleBackPress.bind(this);
  }

  // const handleAndroidBackButton = () => {
  //     BackHandler.addEventListener('hardwareBackPress', () => {
  //       this.props.navigation.goBack();
  //       return true;
  //     });
  // };

  // const removeAndroidBackButtonHandler = () => {
  //   BackHandler.removeEventListener('hardwareBackPress', () => {});
  // }

  componentDidMount () {
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    BackHandler.addEventListener('hardwareBackPress',this._handleBackPress);

  }

  componentWillUnmount () {
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }
  
  // componentWillMount(){
  //   BackHandler.addEventListener('hardwareBackPress', function() {
  // // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // // Typically you would use the navigator here to go to the last state.

  
  //     return true;
  
  //   });

  // }
  _handleBackPress(){
    console.log('leaving??');
  }

  _keyboardDidShow (e) {
    console.log(windowHeight - e.endCoordinates.height);
    this.setState({keyboardVisibility:true,notesHeight:windowHeight - e.endCoordinates.height-80})
  }

  _keyboardDidHide () {
    console.log(windowHeight)
    this.setState({keyboardVisibility:false,notesHeight:windowHeight})
  }

  static navigationOptions = {
    title: 'Add',
    header:null 
  };

  _onChange(event) {
    this.setState({ textValue: event.nativeEvent.text || '' });
  }

  updateSize= ( height ) =>{
    this.setState({
      height,
    });
  }

  render(){

  	var { addNote } = this.props;
    const { value, height } = this.state;
    let newStyle={
      height
    }
    return(
        <View  style={{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}}>
            
              <Header style={{
              	backgroundColor:'#c87c31'
              }}>
		          <Left>
		            <Button transparent  
                    onPress={ () =>  {
                      this.props.navigation.dispatch(NavigationActions.reset({
                          index: 0,
                          key: null,
                          actions: [NavigationActions.navigate({ routeName: 'Home' })]
                      }))

                     }}>
                    <Ionicons name='ios-arrow-back' style={{ fontSize:20,color:'white' }}/>
                  </Button>
		          </Left>
		          <Body>
		             <Title>Add Notes</Title> 
		          </Body>
		          <Right>
                {
                  this.state.textValue.length!=0 &&
  		            <Button transparent onPress={ () => { addNote(this.state.textValue); this.props.navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [NavigationActions.navigate({ routeName: 'Home' })]
                    })) ;Keyboard.dismiss()}}>
  		              <Text style={{color:'white'}}>Save</Text>
  		            </Button>
		            }
		          </Right>
		       </Header>
              <ScrollView keyboardDismissMode='interactive' keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  style={{
                    paddingTop:'2%',
                    paddingVertical:'1%'
                  }}
              >
                  
                  <TextInput
                    placeholder="Add notes"
                    onChangeText={(value)=>this.setState({textValue:value})}
                    style={[styles.textInput,newStyle ]}
                    editable={true}
                    multiline={true}
                    value={value}
                    underlineColorAndroid="transparent"
                    autoFocus={true}
                    onContentSizeChange={(e)=> this.updateSize(e.nativeEvent.contentSize.height)}
                  >

                  </TextInput>
              </ScrollView>

        </View>
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
    borderWidth: 0,
    borderRadius: 0,
  },
});
