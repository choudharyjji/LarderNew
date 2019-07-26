import React, {Component} from 'react';
import {Platform, StyleSheet,Dimensions, Text, View, TouchableOpacity, Alert,ActivityIndicator} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';
const GLOBAL = require('./Global');
import { NavigationActions,StackActions } from 'react-navigation';
const window = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
export default class QrScan extends Component {
  static navigationOptions = {
  title: 'Login',
  header: null
};
  constructor(props) {
    super(props);
    this.state = {
      flashMode: false,
      zoom: 0.2,
      check :false,
      acessCode :'',
      boxID :'',
      loading :false,
      alertpresent :true,
            camEnabled: true

    };
  }
  showLoading() {
     this.setState({loading: true})
  }

  hideLoading() {
     this.setState({loading: false})
  }
  render() {

    if(this.state.loading){
  return(
    <View style={{flex: 1 ,backgroundColor: 'black'}}>
    <ActivityIndicator style = {styles.loading}

   size="large" color="#90ba45" />
    </View>
  )
}

    return (
      <View style={styles.container}>
        <QRscanner onRead={this.onRead}
        cornerBorderColor ='#90ba45'
        cornerRadius={40}
        isRepeatScan = {true}
        cornerBorderRadius={40}
        cornerColor ='#90ba45'
        scanBarColor='#90ba45'
        cornerBorderWidth={10}
        cornerBorderLength={60}
        hintText="Please Align QrCode"
        renderBottomView={this.bottomView} flashMode={this.state.flashMode} zoom={this.state.zoom} finderY={50}/>
      </View>
    );
  }
  bottomView = ()=>{
    return(
    <View style={{flex:1,flexDirection:'row',backgroundColor:'#0000004D'}}>
      <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({flashMode:!this.state.flashMode})}>
        <Text style={{color:'#fff'}}>Flashlight on</Text>
      </TouchableOpacity>
    </View>
    );
  }
  getMoviesFromApiAsyncs = () => {
this.showLoading();
  var acess = "";
    fetch('http://139.59.76.223/larder/webservice/machine_login')
     .then((response) => response.json())
     .then((responseJson) => {
         this.hideLoading();
       acess =  responseJson.data.accessToken
        this.setState({acessCode:acess})

     })
     .catch((error) => {
       console.error(error);
        this.hideLoading();
         alert('Unable to process your request Please try again after some time')

     });
  }

  getMoviesFromApiAsync = () => {


        const url = 'http://139.59.76.223/larder/webservice/check_order'

       fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     userID: GLOBAL.userID,
     mobile :GLOBAL.mobile,
     boxId :this.state.boxID,
     accessToken :GLOBAL.accessToken,



   }),
 }).then((response) => response.json())
     .then((responseJson) => {
       var ss = "1"

       if (responseJson.code == ss){
  //        this.setState({check :false})
  //   //   Alert.alert('Thank you!','Your order placed successfully.',
  //      [
  //        {text:"OK", onPress:()=>this._YesLogout()
  // },
  //      ],
  //      {cancelable:false}
  //      )
       } else {

        // this.getMoviesFromApiAsync()
       }






     })
     .catch((error) => {
       console.error(error);
        this.hideLoading();
         alert('Unable to process your request Please try again after some time')

     });
  }
_scanAga=()=>{
       Alert.alert('Wrong Code Scanned!','It seems you have scanned other than Larder code',
       [
         {text:"OK", onPress:()=>this._YesLogout()
  },
       ],
       {cancelable:false}
       )

}
componentWillMount() {
//this.getMoviesFromApiAsyncs()
}
componentDidMount() {


     this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    _handleStateChange = state => {
  this.setState({check :false})

 };
_YesLogout=()=>{
  this.setState({alertpresent :true})
      this.props
             .navigation
             .dispatch(StackActions.reset({
               index: 0,
               actions: [
                 NavigationActions.navigate({
                   routeName: 'TabNavigator',
                   params: { someParams: 'parameters goes here...' },
                 }),
               ]
             })
             )
}

  onRead = (res) => {
//alert(res)
    var y = res.hasOwnProperty("data");


  if (res.data.includes('=')){

  } else {
   if (this.state.alertpresent){
     this.setState({alertpresent : false})
    this._scanAga()
  }

  //  alert('It Seems you Scan Other Than Larder Code')
    return
  }

    var boxid = res.data.split("=")

    var k = boxid[1]
     this.setState({boxID:k})

    if (this.state.check == false){
      this.setState({check :true})




        const url = 'http://139.59.76.223/larder/webservice/open_door_by_scan'

       fetch(url, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     mobile: GLOBAL.mobile,
     accessToken :GLOBAL.accessToken,
     boxId :boxid[1],
     deviceID:  DeviceInfo.getUniqueID(),

    }),
    }).then((response) => response.json())
     .then((responseJson) => {
  //alert(JSON.stringify(responseJson))
       var status = "1200"
       var statuss = "0"
       var unfinished = "1314"
        var previous = "1204"
        var out = "1316"
       if (responseJson.code == "0"){
          alert(responseJson.desc)
          return
       }
      var code = responseJson.data.openDoorCode

       if (code == status) {
         this.getMoviesFromApiAsync();
 alert('Welcome to Larder Booth. Please open the door to shop!')
 setTimeout(()=>{
    this.setState({check :false})
  },5000);
    //  this.getMoviesFromApiAsync();
  }  else if (code == unfinished) {
alert('Please Wait. We are processing your previous order')
  }
       else if (code == previous) {
           alert('We are processing the previous order of your fellow mates. Please try again after 2 mins.')
       }
       else if (code == out) {
           alert('In the land of blackouts, we’re suffering from a “Net Out”. Please try after 2 minutes')
       }


  else if (code  == statuss){
    alert('You have Insufficient wallet balance. Please maintain 50 wallet point to continuing our service')
  }

       else {
         alert('Unable to process your request. Please try again after some time.')
         setTimeout(()=>{
            this.setState({check :false})
          },5000);


       }





     })
     .catch((error) => {
       console.error(error);
        this.hideLoading();
         alert('Unable to process your request Please try again after some time')

     });








  }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  loading: {
           position: 'absolute',
           left: window.width/2 - 30,

           top: window.height/2,

           opacity: 0.5,

           justifyContent: 'center',
           alignItems: 'center'
       },
});
