import React, {Component} from 'react';
import {ActivityIndicator,Platform,TextInput,DeviceEventEmitter, NativeModules, NativeEventEmitter, StyleSheet,StatusBar, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
var randomString = require('random-string');
import paytm from '@philly25/react-native-paytm';
const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const paytmConfig = {
    MID: 'MZnCpH36960975301996',
    WEBSITE: 'WEBSTAGING',
    CHANNEL_ID: 'WAP',
    INDUSTRY_TYPE_ID: 'Retail',
    CALLBACK_URL: 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID='
};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

export default class Pay extends Component<Props> {

  static navigationOptions = {
  title: 'BoothList',
  header: null
};
resPress = (resId,index) => {
   GLOBAL.productid =  resId;
   this.props.navigation.navigate('Detail')
  }
  constructor(props) {
    super(props)
    this.emitter = null;
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: [],
      beer: [],
      out :'',
      count : "0",
    }

  }
 _keyExtractor = (item, index) => item.organisationID;

 resPress = (resId,index) => {
    GLOBAL.productid =  resId;
    this.props.navigation.navigate('BoothDetail')
   }


    showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

 back = () => {

    this.props.navigation.goBack()
   }





 _renderItem = ({item,index}) => {



   return (
     <View style = {{height : 80 ,width : window.width ,flex :1}} >
     <Text style = {{margin :10 ,color :'white',fontFamily :'TypoGraphica' ,fontSize :14}}>
   {item.indegrident}
      </Text>

      <Text style = {{margin :10 ,color :'#90BA45',fontFamily :'TypoGraphica' ,fontSize :14}}>
    {item.qty}
       </Text>

  <View style = {{marginLeft :0 ,height :1 ,width :window.width,backgroundColor :'white'}}>
  </View>

     </View>




   )
 }

buttonClickListener=()=>{

  var x = randomString({
  length: 10,
  numeric: true,
  letters: false,
  special: false,

  });
  var commonHtml = `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${x}`;


  const url = 'http://139.59.76.223/larder/paytm/generateChecksum.php'

  fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  MID: "MZnCpH36960975301996",
  ORDER_ID: x,
  INDUSTRY_TYPE_ID: "Retail",
  CHANNEL_ID: "WAP",
  TXN_AMOUNT: "1911.00",
  WEBSITE: "WEBSTAGING",
  CUST_ID: "1",
  CALLBACK_URL: commonHtml,


  }),
  }).then((response) => response.json())
  .then((responseJson) => {
  const callbackUrl = commonHtml;
// alert(JSON.stringify(responseJson))
this.runTransaction('199', '1', x, '9896904632', "varun.singhal78@gmail.com", responseJson.CHECKSUMHASH)


  })
  .catch((error) => {
  alert(error);
  this.hideLoading();
  alert('Unable to process your request Please try again after some time')

  });

}

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/product_indegridents'

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productID: GLOBAL.productid,


  }),
}).then((response) => response.json())
    .then((responseJson) => {
        this.hideLoading();



       this.setState({ moviesList: responseJson[0].product_indegridents})



    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
        alert('Unable to process your request Please try again after some time')

    });
 }



 componentWillMount() {
  if (Platform.OS === 'ios') {
      const { RNPayTm } = NativeModules;

      this.emitter = new NativeEventEmitter(RNPayTm);
      this.emitter.addListener('PayTMResponse', this.onPayTmResponse);
  } else {
      DeviceEventEmitter.addListener('PayTMResponse', this.onPayTmResponse);
  }
}


onPayTmResponse = (resp) => {
    const {STATUS, status, response} = resp;
console.log(response)
    if (Platform.OS === 'ios') {
  this.setState({out:response})
      if (status === 'Success') {
        const jsonResponse = JSON.parse(response);
        const {STATUS} = jsonResponse;

        if (STATUS && STATUS === 'TXN_SUCCESS') {
          // Payment succeed!
        }
      }
    } else {
      if (STATUS && STATUS === 'TXN_SUCCESS') {
        // Payment succeed!
      }
    }
  };

  runTransaction(amount, customerId, orderId, mobile, email, checkSum) {
      const callbackUrl = `${paytmConfig.CALLBACK_URL}${orderId}`;
      const details = {
          mode: 'Staging', // 'Staging' or 'Production'
          MID: paytmConfig.MID,
          INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
          WEBSITE: paytmConfig.WEBSITE,
          CHANNEL_ID: paytmConfig.CHANNEL_ID,
          TXN_AMOUNT: '1911.00', // String
          ORDER_ID: orderId, // String
          CUST_ID: '1', // String
          CHECKSUMHASH: checkSum, //From your server using PayTM Checksum Utility
          CALLBACK_URL: callbackUrl,
      };

      paytm.startPayment(details);
  }
componentWillUnmount() {
  if (Platform.OS === 'ios') {
      this.emitter.removeListener('PayTMResponse', this.onPayTmResponse);
  } else {
      DeviceEventEmitter.removeListener('PayTMResponse', this.onPayTmResponse);
  }
}
 renderPage(image, index) {
         return (
             <View key={index}>
                 <Image style={{ width: window.width, height: 150 }} source={{ uri: image }} />
             </View>
         );
     }

  render() {
    if(this.state.loading){
  return(
    <View style={{flex: 1 ,backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
    <ActivityIndicator style = {styles.loading}

   size="large" color="#a71817" />
    </View>
  )
}
  return (

    <View style = {{flex : 1 , width : width ,height : height ,backgroundColor:'black' }}>

    <Text style = {{marginTop :30 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>
    {GLOBAL.username}
    </Text>

     <View style = {{flexDirection :'row'}}>

      <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
    <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
source={require('./back.png')}/>
</TouchableOpacity>
<Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
Ingredients Detail
</Text>

 </View>
 <Button
     containerStyle={{margin :50,marginTop :10,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#90BA45'}}
     disabledContainerStyle={{backgroundColor: 'white'}}
     style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
      onPress={this.buttonClickListener}>
     Add Money
   </Button>



    </View>




        //         <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        //  <View style={styles.content}>
        //  <View style = {{width :width , height : 60 ,backgroundColor :'black',flexDirection :'column'}}>
        //  <Text stle = {{fontSize : 20 ,fontFamily :'TypoGraphica',width : width ,height : 30 ,marginTop : 20 ,color :'white' }}>
        // Varun
        //  </Text>
        //
        //  </View>
        //
        //  <FlatList
        //    data={this.state.moviesList}
        //    numColumns={1}
        //    keyExtractor={this._keyExtractor}
        //   renderItem={this._renderItem}
        //   extraData={this.state}
        //  />
        //   </View>
        //    </KeyboardAwareScrollView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#910818',
    height: APPBAR_HEIGHT,



  },
  loading: {
           position: 'absolute',
           left: window.width/2 - 30,

           top: window.height/2,

           opacity: 0.5,

           justifyContent: 'center',
           alignItems: 'center'
       },

  content: {
    flex: 1,
    backgroundColor:'#000000',
  },
});
