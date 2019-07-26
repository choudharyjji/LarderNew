import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import Button from 'react-native-button'
const GLOBAL = require('./Global');
import { DrawerActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
type Props = {};
import DeviceInfo from 'react-native-device-info';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
var codes = "";
var randomString = require('random-string');

export default class Otp extends Component<Props> {
  showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }
state = {
    phone: '',
    password:'',
    loading :false,
  };

  buttonClickListenerss = () =>{
    var x = randomString({
   length: 5,
   numeric: true,
   letters: false,
   special: false,

   });

          this.showLoading()
          const url = "http://139.59.76.223/larder/webservice/resend_otp"

        fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile: GLOBAL.mobile,
      otp : x,



    }),
  }).then((response) => response.json())
      .then((responseJson) => {

           GLOBAL.otps =  x;

  this.hideLoading()

  if (responseJson[0].result == "success"){

  } else {
    alert('Please enter valid credentials')
  }


      })
      .catch((error) => {
          this.hideLoading()
        console.error(error);
      });


  }
  buttonClickListener = () =>{


     if (codes == ''){
       alert('Please Enter Otp')
     } else if (codes != GLOBAL.otps){
        alert('Invalid OTP Entered')
     } else if  ( GLOBAL.screen == "signup") {




      this.showLoading()

       const url = 'http://139.59.76.223/larder/webservice/signup'

       fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     name: GLOBAL.username,
     mobile: GLOBAL.mobile,
     email: GLOBAL.email,
     password: GLOBAL.password,
     image :'user.png',
     organisation: GLOBAL.organisationID,
     deviceType: Platform.OS,
     deviceToken: GLOBAL.deviceToken,
     deviceID  : DeviceInfo.getUniqueID(),
     authID : "",
     auth : "Normal",
     employeeID : GLOBAL.employeeId,


   }),
  }).then((response) => response.json())
     .then((responseJson) => {
  this.hideLoading()

   if (responseJson[0].result == "success"){
     AsyncStorage.setItem('mobile', responseJson[0].mobile);
     AsyncStorage.setItem('userID', responseJson[0].userID);
     AsyncStorage.setItem('username', responseJson[0].name);
     AsyncStorage.setItem('email', responseJson[0].email);
     GLOBAL.userID = responseJson[0].userID;
     GLOBAL.username = responseJson[0].name;
     GLOBAL.mobile = responseJson[0].mobile;
     GLOBAL.email = responseJson[0].email;
     this.props.navigation.replace('TabNavigator')

   }
     })
     .catch((error) => {
       console.error(error);
        alert('Unable to process your request Please try again after some time')
     });
     }

   else {
    this.props.navigation.navigate('Forget')

     }
   }

 _YesLogout=()=>{

 this.props.navigation.replace('TabNavigator')
 }








  _onFulfill(code){
  codes =  code
  this.buttonClickListener()
  }

  render() {
    let { phone,password } = this.state;
    if(this.state.loading){
 return(
   <View style={{flex: 1,  backgroundColor: 'black'}}>
   <ActivityIndicator style = {{ position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
      }}

  size="large" color="#90BA45" />
   </View>
 )
}
    return (

      <KeyboardAwareScrollView style = {{backgroundColor:'black',width : windowW ,height :windowH,flex:1}}>

      <View style = {{flexDirection :'row', marginTop :20}}>

       <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
     <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
    source={require('./back.png')}/>
    </TouchableOpacity>
    <Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
    Mobile Verification
    </Text>

    </View>
 <View style={{margin: 0,marginTop: 40}}>

 <Text style = {{margin : 10 ,width : windowW - 20 ,color :'white' ,fontSize :28 ,fontFamily :'TypoGraphica'}}>
Verify your number
 </Text>

 <Text style = {{margin : 10 ,width : windowW - 40 ,color :'white' ,fontSize :22 ,fontWeight :'bold'}}>
Otp has been sent to your mobile number.
 </Text>


 <CodeInput
     ref="codeInputRef1"
     keyboardType="numeric"
     secureTextEntry
     className={'border-b'}
     space={5}
     size={30}
     inputPosition='center'
     activeColor = 'white'
     inactiveColor =  'white'
     onFulfill={(code) => this._onFulfill(code)}
   />


</View>

<Button
    containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
    disabledContainerStyle={{backgroundColor: 'grey'}}
    style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
       onPress={this.buttonClickListenerss}>
    Resend Otp?
  </Button>

      </KeyboardAwareScrollView>

    );
  }
}
