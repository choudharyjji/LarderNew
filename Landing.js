import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import Button from 'react-native-button'
const GLOBAL = require('./Global');
import { DrawerActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {};
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height



export default class Landing extends Component<Props> {
  static navigationOptions = {
  title: 'Login',
  swipeEnabled: false,
  gesturesEnabled: false,
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
   this.props.navigation.replace('Signup')
  }
  buttonClickListener = () =>{

    if (this.state.phone == ''){
          alert('Please Enter Mobile no')
        }     else {
          this.showLoading()
          const url = "http://139.59.76.223/larder/webservice/forgot_password"

        fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile: this.state.phone,



    }),
  }).then((response) => response.json())
      .then((responseJson) => {
  this.hideLoading()
  this.setState({phone: ""})
    this.setState({password: ""})
  if (responseJson[0].result == "success"){
 alert('Password sent your registered Mobile No')
  } else {
    alert('Please enter valid credentials')
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
        alert('Please Enter Mobile no')
      }    else if (this.state.password == ''){
        alert('Please Enter Password')
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
    deviceID: '',
    deviceType: Platform.OS,
    deviceToken: '',


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
      <Image style={{width : 250 ,height : 100 ,marginTop :150 , marginLeft:windowW/2 - 125,resizeMode :'contain'}}
 source={require('./logo.png')}/>

 <View style={{margin: 20,marginTop: 24}}>
 <Button
     containerStyle={{ height:50 ,margin:10, backgroundColor: '#90BA45', padding:15,bottom:0 ,


    borderRadius:10,
    borderWidth: 1,
    }}
     disabledContainerStyle={{backgroundColor: '#90BA45'}}
     style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}

     onPress={() => this.props.navigation.replace('Login')}

     >
    LOGIN
   </Button>

   <Button
   containerStyle={{ height:50 ,margin:10, backgroundColor: '#90BA45', padding:15,bottom:0 ,


  borderRadius:10,
  borderWidth: 1,
  }}
       disabledContainerStyle={{backgroundColor: '#90BA45'}}
       style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}

        onPress={() => this.props.navigation.replace('Signup')}

       >
      SIGNUP
     </Button>

      </View>

      </KeyboardAwareScrollView>

    );
  }
}
