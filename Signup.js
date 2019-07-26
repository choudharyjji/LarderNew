import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import Button from 'react-native-button'

import { DrawerActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const GLOBAL = require('./Global');
var randomString = require('random-string');
type Props = {};
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height



export default class Signup extends Component<Props> {
  showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }
state = {
    name :'',
    email :'',
    employeeId :'',
    phone: '',
    password:'',
    loading :false,
    address :'Enter Organisation',
  };

  buttonClickListener = () =>{
   var x = randomString({
  length: 5,
  numeric: true,
  letters: false,
  special: false,

  });

      if (this.state.name == ''){
        alert('Please enter username.')
      } else if (this.state.email == ''){
        alert('Please enter email id.')
      }else if (this.state.phone == ''){
        alert('Please enter mobile number.')
      }

         else if (this.state.password == ''){
        alert('Please enter password.')
      }    else {
        this.showLoading()
          GLOBAL.otps = x,
          GLOBAL.username = this.state.name,
    GLOBAL.email  = this.state.email,
    GLOBAL.mobile  = this.state.phone,
    GLOBAL.employeeId = this.state.employeeId,
    GLOBAL.password  = this.state.password

        const url = "http://139.59.76.223/larder/webservice/check_user_signup"


        fetch(url, {




    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.state.email,
      mobile: this.state.phone,
      otp: GLOBAL.otps,
      employeeID :this.state.employeeId,


    }),
  }).then((response) => response.json())
      .then((responseJson) => {

  this.hideLoading()
   if (responseJson[0].result == "success"){
       GLOBAL.screen = "signup";
      GLOBAL.otps =  responseJson[0].otp
       this.props.navigation.navigate('Otp')
} else {
  alert(responseJson[0].result)
}


      })
      .catch((error) => {
        console.error(error);
        this.hideLoading()
         alert('Unable to process your request Please try again after some time')
      });
      }
    }

  onSelect = data => {

    this.setState({ address: data.address})
      //this.setState(data);
    };
    onPress = () => {
       this.props.navigation.navigate("Organisation", { onSelect: this.onSelect });
     };
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


 <View style={{margin: 0,marginTop: 20}}>

 <Text style = {{margin : 10 ,width : windowW - 20 ,color :'#90BA45' ,fontSize :28 ,fontFamily :'TypoGraphica'}}>
 Looks Good
 </Text>

 <Text style = {{margin : 10 ,width : windowW - 40 ,color :'white' ,fontSize :22 ,fontFamily :'TypoGraphica'}}>
Make sure your information is correct before Continuing.
 </Text>


 <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'#90BA45' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
 NAME
 </Text>
 <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}
   placeholder="Enter Name"
   placeholderTextColor="white"
    onChangeText={(text) => this.setState({name:text})}
   >
</TextInput>

   <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'#90BA45' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
   EMAIL
   </Text>
   <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW - 20 ,height : 40 ,color :'white' ,fontSize : 16 }}
     placeholder="Enter Email"
     placeholderTextColor="white"
  onChangeText={(text) => this.setState({email:text})}
     >
 </TextInput>
        <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'#90BA45' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
        MOBILE
        </Text>
        <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}
          placeholder="Enter Mobile No"
          placeholderTextColor="white"
          keyboardType = "number-pad"
            onChangeText={(text) => this.setState({phone:text})}
          >
        </TextInput>


        <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'#90BA45' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
        ORGANISATION
        </Text>


         <TouchableOpacity onPress={() =>  this.onPress()}>
        <Text style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}


          >

          {this.state.address}
        </Text>


         </TouchableOpacity>

  <View style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW - 20 ,height : 1 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}>
  </View>

        <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'#90BA45' ,fontSize :14 ,fontFamily :'TypoGraphica'}}>
        PASSWORD
        </Text>
        <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}
          placeholder="Enter Your Password"
          placeholderTextColor="white"
          secureTextEntry={true}
onChangeText={(text) => this.setState({password:text})}
          >


        </TextInput>



</View>
<TouchableOpacity
   onPress={() => this.buttonClickListener()}>
<Image style={{width : 50 ,height : 40 ,marginTop :10 , marginLeft:windowW - 70,resizeMode :'contain'}}
source={require('./next.png')}/>
</TouchableOpacity>


  <Button
      containerStyle={{marginBottom:80,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
      disabledContainerStyle={{backgroundColor: 'grey'}}
      style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
       onPress={()=>this.props.navigation.goBack()}>
      Already Have an Account
    </Button>

      </KeyboardAwareScrollView>

    );
  }
}
