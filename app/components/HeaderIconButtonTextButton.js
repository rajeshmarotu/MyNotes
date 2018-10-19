import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
export default class HeaderIconButtonTextButton extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent  onPress={ () =>  { this.props.navigation.goBack(); }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            { 
              this.props.addNote ? <Title>{this.props.title}</Title> : 'Faffa'
            }
          </Body>
          <Right>
            <Button transparent onPress={ () => { this.props.addNote(this.props.note); this.props.navigation.navigate('Home')}}>
              <Text>Save</Text>
            </Button>
            
          </Right>
        </Header>
      </Container>
    );
  }
}