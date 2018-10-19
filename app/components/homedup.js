import React,{ Component } from 'react'
import { StatusBar,View, Text, TouchableOpacity, ListView, ScrollView, Keyboard, Dimensions, StyleSheet, Platform } from 'react-native';
import { Item, Input, Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import { NavigationActions } from 'react-navigation';
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
      multiSelectedIndexes:[]
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
             indexes.splice(id, 1)

          }
          console.log(indexes)
          console.log(typeof(indexes))
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

  searchedNotes(searchedText){
    console.log("searched text:"+searchedText);
     var searchedNotes=[]
     if(searchedText.length!=0){
      searchedNotes = this.state.notes.filter((note)=>{
       //return adress.street.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
       return note["content"].indexOf(searchedText) > -1;
     });
     }
     

     this.setState({searchedNotes: searchedNotes});

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
                backgroundColor: this.state.multiSelectedIndexes.indexOf(note.noteId) != -1 ? 'red' :'green' 
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
      <View style={{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,flexGrow:1}}>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#6a51ae"
          />
        <Header
              style={{
                backgroundColor:'blue'
              }}
            >
          
                <Body>
                  <Title>View note</Title>
                </Body>
                <Right>
                  {
                    this.state.multiSelect && this.state.multiSelectedIndexes &&(
                      <View style={{flexDirection:'row'}}>
                        <Button transparent  onPress={ () =>  {
                        console.log('share');
                        this.setState({multiSelect:false})

                         }}>
                          <Icon name='ios-add' />
                        </Button>

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
                          <Icon name='ios-add' />
                        </Button>
                      </View>

                    )
                  }
                  
                </Right>
              </Header>
        <View searchBar style={{marginLeft:5,marginRight:5}}>
          <Item>
            <Icon name="ios-search" style={{paddingLeft:8,paddingRight:5}}/>
            <Input placeholder="Search" autoCapitalize = "none" onChangeText={(value) => {this.setState({searchedText: value});this.searchedNotes(value)}}
                     value={this.state.searchedText} />
            { this.state.searchClicked && (
                <Icon name="ios-close-circle" onPress={() => { this.setState({searchedText:'',searchedNotes:[]})} }/>
              )
            }
          </Item>
        </View>

      
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
        {
          this.state.searchedNotes && this.state.searchClicked && (
              <ListView
                          enableEmptySections= {true}
                          dataSource={ds.cloneWithRows(this.state.searchedNotes)}
                          renderRow={(rowData,sectionId,rowId) => { this.renderNote.bind(this,rowData,sectionId,rowId) }}
                          keyboardShouldPersistTaps="always"
                          contentContainerStyle={styles.list}
                          />
          )
        }

        { !this.state.searchClicked && this.state.notes && 
          <ListView
                          enableEmptySections= {true}
                          dataSource={ds.cloneWithRows(this.state.notes)}
                          renderRow={this.renderNote}
                          keyboardShouldPersistTaps="always"
                          contentContainerStyle={styles.list}
                          />
        }
          
          
        </ScrollView>
        {
            <Button style={{
            width: 60,  
            height: 60,   
            borderRadius: 30,            
            backgroundColor: 'blue',                                    
            position: 'absolute',                                          
            bottom: 80,                                                    
            right: 10, 
            justifyContent:'center',
            alignItems:'center'
          }}
            onPress={ () => this.navigateToScreen('AddNotes',{})}
          >
            <Icon name='ios-add' style={{fontSize: 25, color: 'white'}}/>
          </Button>
        }
      </View>
    );
  }
}

var styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex:1
    },
    item: {
        margin: 3,
        width: windowWidth/2-10,
        height:150,
        padding:10,
        alignSelf:'center'
    },
});
