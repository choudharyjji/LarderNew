import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import Button from 'react-native-button'
const GLOBAL = require('./Global');
import { DrawerActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var randomString = require('random-string');
import DeviceInfo from 'react-native-device-info';
type Props = {};
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height



export default class Login extends Component<Props> {
  static navigationOptions = {
  title: 'Login',
  header: null
};
state = {
    phone: '',
    password:'',
    loading:false,
  };
    showLoading() {
         this.setState({loading: true})
      }

      hideLoading() {
         this.setState({loading: false})
      }
  buttonClickListeners = () =>{
   this.props.navigation.navigate('Signup')
  }
  buttonClickListener = () =>{
    var x = randomString({
   length: 5,
   numeric: true,
   letters: false,
   special: false,

   });
    if (this.state.phone == ''){
          alert('Please enter mobile number.')
        }     else {
          this.showLoading()
          const url = "http://139.59.76.223/larder/webservice/send_forgot_password"

        fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile: this.state.phone,
      otp : x,



    }),
  }).then((response) => response.json())
      .then((responseJson) => {
        GLOBAL.screen = "otp";
         GLOBAL.mobile =  this.state.phone;
           GLOBAL.otps =  responseJson[0].otp;

  this.hideLoading()

  if (responseJson[0].result == "success"){
    this.setState({phone: ""})
      this.setState({password: ""})

   this.props.navigation.navigate('Otp')
  } else {
    alert('Please enter valid credentials.')
  }


      })
      .catch((error) => {
          this.hideLoading()
        console.error(error);
      });
      }


}
resPress = () =>{
  if (this.state.phone == ''){
        alert('Please enter mobile number.')
      }    else if (this.state.password == ''){
        alert('Please enter password.')
      } else {
        this.showLoading()
        const url = "http://139.59.76.223/larder/webservice/login"

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mobile: this.state.phone,
    password: this.state.password,
    deviceID:  DeviceInfo.getUniqueID(),
    deviceType: Platform.OS,
    deviceToken: GLOBAL.deviceToken,


  }),
}).then((response) => response.json())
    .then((responseJson) => {
      this.setState({phone: ""})
        this.setState({password: ""})
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
     } else {
       alert('Please enter valid credentials')
     }


    })
    .catch((error) => {
      console.error(error);
      this.setState({phone: ""})
        this.setState({password: ""})
        this.hideLoading()
        alert('Unable to process this time Please try again after some time.')
    });
    }
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
      <Image style={{width : 250 ,height : 100 ,marginTop :100 , marginLeft:windowW/2 - 125,resizeMode :'contain'}}
 source={require('./logo.png')}/>

 <View style={{margin: 20,marginTop: 24}}>
        <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'#90BA45' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
        MOBILE
        </Text>
        <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW.width - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}
          placeholder="Enter Mobile No"
          placeholderTextColor="white"
          keyboardType = "number-pad"
           onChangeText={(text) => this.setState({phone:text})}
          >
        </TextInput>

        <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'#90BA45' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
        PASSWORD
        </Text>
        <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW.width - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}
          placeholder="Enter Your Password"
          placeholderTextColor="white"
          secureTextEntry={true}
           onChangeText={(text) => this.setState({password:text})}
          >


        </TextInput>



</View>
<TouchableOpacity

    onPress={() => this.resPress()}
  >
<Image style={{width : 50 ,height : 40 ,marginTop :10 , marginLeft:windowW - 70,resizeMode :'contain'}}
source={require('./next.png')}/>
</TouchableOpacity>
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
       onPress={this.buttonClickListeners}>
      Create an Account
    </Button>

      </KeyboardAwareScrollView>

    );
  }
}
