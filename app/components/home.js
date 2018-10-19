import React,{ Component } from 'react'
import { StatusBar,View, Text, TouchableOpacity, List,ListItem, FlatList, ListView, ScrollView, Keyboard, Dimensions, StyleSheet, Platform, BackHandler } from 'react-native';
import { Item, Input, Container, Header, Left, Body, Right, Button,  Title } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Tts from 'react-native-tts';
import Expo from 'expo';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default class Home extends Component{

  constructor(props){
    super(props);
    this.state={
      searchedText:"",
      searchedNotes:[],
      notes:this.props.notes,
      searchClicked:false,
      multiSelect:false,
      multiSelectedIndexes:[],
      grid:true
    }
  }
  static navigationOptions = {
    title: 'Notes',
    header:null
  };

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

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      console('leaving??')
    });
  }

  _keyboardDidShow (e) {
    this.setState({searchClicked:true})
  }

  _keyboardDidHide () {

    this.setState({searchClicked:false,multiSelect:false})
  }

  _onLongPressButton() {
    alert('multiSelect')
    //this.setState({multiSelect:true})
  }

  onclick(data) {
          console.log(data.noteId)

          let indexes = this.state.multiSelectedIndexes.slice(0);
          if(indexes.indexOf(data.noteId) == -1){
             indexes.push(data.noteId);
          }
          else{
             let id = indexes.indexOf(data.noteId);
             indexes.splice(id, 1);
          }
          console.log(indexes)
          console.log(typeof(indexes))
          if(indexes.length==0){
            this.setState({multiSelect:false});
          }
          this.setState({multiSelectedIndexes:indexes});
          //this.changeMultiSelect();
        }

 changeMultiSelect(){
    console.log('multiSelect')
    console.log(this.state.multiSelectedIndexes)
  if(this.state.multiSelectedIndexes.length==0){
    this.setState({multiSelect:false})
  }
 }

  navigateToScreen(screenId,options){
    this.props.navigation.navigate(screenId, options);
  }

  sortNotesByDate(notes){
    var temp;
    var notes=notes.reverse();
    for(var i=0;i<notes.length;i++){
      for(var j=0;j<notes.length-i-1;j++){
        if(notes[j]['timestamp']<notes[j+1]['timestamp']){
          temp=notes[j];
          notes[j]=notes[j+1];
          notes[j+1]=temp;
        }
      }
    }
    return notes;
  }
  searchedNotes(searchedText){
    console.log("searched text:"+searchedText);
     var searchedNotes=[]
     if(searchedText.length!=0){
      searchedNotes = this.state.notes.filter((note)=>{
       //return adress.street.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
       short=note["content"].toLowerCase();
       return short.indexOf(searchedText.toLowerCase()) > -1;
     });
     }

     this.setState({searchedNotes: searchedNotes});
  }
  
  readOutNotes(){
    for(var i=0;i<5;i++){
      setTimeout(()=>{
        console.log(i)
      },2000)
    }
  }


  renderNote = ( note, sectionId,rowId ) => {
    return (
        <TouchableOpacity
          key={rowId}
          onPress={
              () => {
                  Keyboard.dismiss();
                  /*this.props.navigation.navigate('ViewNote',{ 'note':note })*/
                  this.state.multiSelect  ?
                     this.onclick(note) : this.props.navigation.navigate('ViewNote',{ 'note':note })
                 }
            }

          onLongPress={
              () => {
                  this.setState({multiSelect:true});
                  this.onclick(note)
                  }
                }
          style={
            [
              styles.item,
              {
                width:this.state.grid?windowWidth/2-10 : windowWidth-10,
                height:160,
                backgroundColor: this.state.multiSelectedIndexes.indexOf(note.noteId) != -1 ? '#7c7c7c' :'#c3c3c3'
              }
            ]
          }
        >
          <Text style={{
            color: note.status ? 'black' : 'red'
          }}>
            { note.content }

          </Text>

        </TouchableOpacity>
    )
  }


  render(){
    var { notes, status, parseNotes , multiDelete } = this.props;

    return(
      <View style={{paddingBottom:'1%',paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,flex:1,flexDirection:'column'}}>

        {
          this.state.multiSelect && (
          <Header
              style={{
                backgroundColor:'#c87c31',

              }}
            >

                <Body>
                  <Title>{this.state.multiSelectedIndexes.length} items selected</Title>
                </Body>

                <Right>
                  {
                    this.state.multiSelect && this.state.multiSelectedIndexes &&(
                        <View style={{flexDirection:'row'}}>

                            <Button transparent  onPress={ () =>  {
                                console.log('deleting items')
                                multiDelete(this.state.multiSelectedIndexes)
                                this.setState({multiSelect:false})
                                this.props.navigation.dispatch(NavigationActions.reset({
                                    index: 0,
                                    key: null,
                                    actions: [NavigationActions.navigate({ routeName: 'Home' })]
                                }))

                             }}>
                              <Icon name='trash' style={{fontSize:24,color:'white'}}/>
                            </Button>
                        </View>

                    )
                  }

                </Right>
          </Header>)
        }
        {
          !this.state.multiSelect && !this.state.searchClicked && (
          <Header
              style={{
                backgroundColor:'#c87c31',

              }}
            >
                <Left>
                  {
                    <Title style={{marginLeft:'0%'}}>Notes</Title>
                  }
                </Left>

                <Right>
                  <View style={{
                    flexDirection:'row'
                  }}>
                    <View style={{
                      flex:0.6
                    }}>
                       <Button transparent  style={{
                         alignSelf:'flex-end'
                       }}
                       onPress={ () =>  {
                          this.readOutNotes(this.state.notes)
                       }}>
                          <Icon name='search'  style={{fontSize:20,color:'white'}} />
                       </Button>
                    </View>
                    <View style={{
                      flex:0.2
                    }}>
                       <Button transparent  style={{
                         alignSelf:'flex-end'
                       }}
                       onPress={ () =>  {
                          this.setState({searchClicked:true})
                       }}>
                          <Icon name='search'  style={{fontSize:20,color:'white'}} />
                       </Button>
                    </View>

                    <View style={{
                      flex:0.2
                    }}>
                       { this.state.grid ? (
                          <Button transparent  style={{
                              alignSelf:'flex-end'
                             }}
                             onPress={ () =>  {
                                this.setState({grid:false})
                             }}>
                            <Ionicons name='ios-grid'  style={{fontSize:27,color:'white'}} />
                          </Button>) : (
                          <Button transparent  style={{
                              alignSelf:'flex-end'
                             }}
                             onPress={ () =>  {
                                this.setState({grid:true})
                             }}>
                            <Ionicons name='ios-list-box'  style={{fontSize:27,color:'white'}} />
                          </Button>)

                       }

                    </View>

                  </View>
                </Right>

          </Header>)
        }


        { this.state.searchClicked && (
          <View style={{
            flex:0.07
          }}>
              <View searchBar style={{marginLeft:5,marginRight:5}}>
                <Item>
                  <Ionicons name="ios-search" style={{paddingLeft:8,paddingRight:5,fontSize:20}}/>
                  <Input placeholder="Search Notes" autoCapitalize = "none" onChangeText={(value) => {this.setState({searchedText: value});this.searchedNotes(value)}}
                           value={this.state.searchedText} autoFocus={true}/>
                  { this.state.searchClicked && (
                      <Ionicons name="ios-close-circle" style={{fontSize:20}} onPress={() => { this.setState({searchedText:'',searchedNotes:[]})} }/>
                    )
                  }
                </Item>
              </View>
          </View>
          )
        }
        <View style={{

                  flex:this.state.searchClicked ? 0.93 : 1
                }}>


           {
                this.state.searchedNotes && this.state.searchClicked && (
                    <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}
                      style={{
                        flex:0.5
                      }}
                    >
                    <ListView
                                enableEmptySections= {true}
                                dataSource={ds.cloneWithRows(this.state.searchedNotes)}
                                renderRow={ this.renderNote }
                                contentContainerStyle={styles.list}

                                />
                    </ScrollView>


                )

              }

              { !this.state.searchClicked && this.state.notes &&
                <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} >
                  <ListView
                                enableEmptySections= {true}
                                dataSource={ds.cloneWithRows(this.sortNotesByDate(this.state.notes))}
                                renderRow={this.renderNote}

                                contentContainerStyle={styles.list}
                                scrollEnabled={true}
                                />
                </ScrollView>

              }

            </View>

        { !this.state.searchClicked &&(
            <Button style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#c87c31',
            position: 'absolute',
            bottom: 20,
            right: 5,
            justifyContent:'center',
            alignItems:'center'
          }}
            onPress={ () => this.navigateToScreen('AddNotes',{})}
          >
            <Ionicons name='ios-add' style={{fontSize: 25, color: 'white'}}/>
          </Button>)
        }


      </View>
    );
  }
}

var styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex:1,
        marginLeft:3
    },
    item: {
        margin: 3,
        padding:10,
        alignSelf:'center'
    },
});
