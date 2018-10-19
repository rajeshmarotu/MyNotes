import React , { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions, Keyboard, Platform, Modal,Share, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Body, Right, Button,Title} from 'native-base';
import HeaderIconButtonTextButton from './HeaderIconButtonTextButton.js';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default class Add extends Component{


  constructor(props) {
    super(props);
    this.state = {
      note: {
        content:this.props.navigation.state.params.note.content,
        },
      keyboardVisibility:false,
      notesHeight:windowHeight,
      modalVisible:false,
      height:100,
      timestamp:this.props.navigation.state.params.note.timestamp,

    }
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
  }

  componentWillUnmount () {
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  
  _keyboardDidShow (e) {
    this.setState({keyboardVisibility:true,notesHeight:windowHeight - e.endCoordinates.height-80})
  }

  _keyboardDidHide () {
    
    this.setState({keyboardVisibility:false,notesHeight:windowHeight})
  }

  share( message ){
        Share.share({
        message: message+"\n\n\n"+"This note is shared using MyNotes App\n\nGet \"MyNotes\" App using following link\nhttps://play.google.com/store?hl=en",
        title: 'Get MyNotes App using following link'
      }, {
        // Android only:
        dialogTitle: 'Share this Note',

      })
  }
  static navigationOptions = {
    title: 'Add',
    header:null 
  };

  _onChange(value) {
    this.setState({ note:{content: value }});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});

  }

  updateSize= ( height ) =>{
    this.setState({
      height,
    });
  }


  render(){

  	var { updateNote, deleteNote } = this.props;
    const { height } = this.state;
    let newStyle={
      height
    };
    var d=new Date(this.state.timestamp);
    var date=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
    return(

          <View style={{backgroundColor:'white',paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,flex:1}}>
            <Header
              style={{
                backgroundColor:'#c87c31'
              }}
            >
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
                  <Title>View note</Title>
                </Body>
                <Right>
                  <View style={{
                    flexDirection:'row'
                  }}>
                    <View style={{
                      flex:0.7
                    }}>
                       <Button transparent  style={{
                         alignSelf:'flex-end'
                       }}
                       onPress={ () =>  {
                          if(this.state.note.content.length!=0){
                            updateNote(this.state.note.content,this.props.navigation.state.params.note.noteId)
                          };
                          if(this.state.note.content.length==0){
                            deleteNote(this.props.navigation.state.params.note.noteId);
                          }
                          Keyboard.dismiss();
                       }}>
                          <Icon name='save'  style={{fontSize:20,color:'white'}} />
                       </Button>
                    </View>
                    <View style={{
                      flex:0.3
                    }}>
                      <Menu>
                        <MenuTrigger>
                              <Icon name='ellipsis-v'  style={{alignSelf:'flex-end',color:'white',fontSize:20, marginTop:'25%',marginRight:'5%'}}/>
                        </MenuTrigger>
                        <MenuOptions>
                          <MenuOption onSelect={() => { deleteNote(this.props.navigation.state.params.note.noteId); this.props.navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [NavigationActions.navigate({ routeName: 'Home' })]
                    })) ;Keyboard.dismiss() }} >
                            <Text style={{color: 'red'}}>Delete</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => {this.share(this.state.note.content);updateNote(this.state.note.content,this.props.navigation.state.params.note.noteId)} }  text='Share' />
                          <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Change background' />
                          <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Info' />
                        </MenuOptions>
                      </Menu>
                    </View>
                  </View>
                </Right>
              </Header>
            <View
              style={{
                flex:this.state.keyboardVisibility ? 0.5 : 1,
                padding:'3%'
              }}
            >
              <ScrollView 
                  keyboardShouldPersistTaps="always"
                  showsVerticalScrollIndicator={false}
                >
                  <TextInput
                    placeholder="Write notes"
                    onChangeText={(value)=> this._onChange(value)}
                    style={[styles.textInput,newStyle ]}
                    editable={true}
                    multiline={true}
                    value={this.state.note.content }
                    underlineColorAndroid="transparent"
                    autoFocus={true}
                    onContentSizeChange={(e)=> this.updateSize(e.nativeEvent.contentSize.height)}
                  />
              </ScrollView>
              { !this.state.keyboardVisibility && (
                  <Text style={{ alignSelf:'flex-end', marginRight:'5%',fontSize:18}}>{date}</Text>
                )
              }
          </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 10,
    fontSize: 17,
    flex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
});
