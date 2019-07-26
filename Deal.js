import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import Button from 'react-native-button'

import { DrawerActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {};
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height



export default class Deal extends Component<Props> {
  static navigationOptions = {
  title: 'Login',
  header: null
};
state = {
    phone: '',
    password:'',
  };


  buttonClickListener = () =>{
 this.props.navigation.navigate('Signup')
}


  render() {
        let { phone,password } = this.state;
    return (
      <KeyboardAwareScrollView style = {{backgroundColor:'black',width : windowW ,height :windowH,flex:1}}>
      <Image style={{width : 250 ,height : 100 ,marginTop :100 , marginLeft:windowW/2 - 125,resizeMode :'contain'}}
 source={require('./logo.png')}/>

 <View style={{margin: 20,marginTop: 24}}>
        <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'white' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
        MOBILE
        </Text>
        <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW.width - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}
          placeholder="Enter Mobile No"
          placeholderTextColor="white"
          keyboardType = "number-pad"
          >
        </TextInput>

        <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'white' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
        PASSWORD
        </Text>
        <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW.width - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}
          placeholder="Enter Your Password"
          placeholderTextColor="white"
          secureTextEntry={true}

          >


        </TextInput>



</View>

<Image style={{width : 50 ,height : 40 ,marginTop :10 , marginLeft:windowW - 70,resizeMode :'contain'}}
source={require('./next.png')}/>

<Button
    containerStyle={{position:'absolute',left:20,marginTop :410,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
    disabledContainerStyle={{backgroundColor: 'grey'}}
    style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
     onPress={this.buttonClickListener}>
    Forgot Password?
  </Button>

  <Button
      containerStyle={{marginBottom:80,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
      disabledContainerStyle={{backgroundColor: 'grey'}}
      style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
       onPress={this.buttonClickListener}>
      Create an Account
    </Button>

      </KeyboardAwareScrollView>

    );
  }
}
