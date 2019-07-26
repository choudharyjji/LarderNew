import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

export default class Tdetail extends Component<Props> {

  static navigationOptions = {
  title: 'BoothList',
  header: null
};
resPress = (resId,index) => {
   GLOBAL.productid =  resId;
   //this.props.navigation.navigate('Detail')
  }
  constructor(props) {
    super(props)
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: [],
      beer: [],
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
alert(JSON.stringify(responseJson))


       this.setState({ moviesList: responseJson[0].product_indegridents})



    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
        alert('Unable to process your request Please try again after some time')

    });
 }

   componentWillMount() {
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
    <View style={{flex: 1 ,backgroundColor: 'black'}}>
    <ActivityIndicator style = {styles.loading}

   size="large" color="#90BA45" />
    </View>
  )
}


var trans=GLOBAL.dd.txnID;
var status=GLOBAL.dd.transaction_type;
var type = GLOBAL.dd.payment_type;

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
Transaction Details
</Text>

 </View>
 <View style={{flexDirection:'row', justifyContent:'space-between'}}>
 <Text style = {{margin :10  ,color :'#90ba45',fontWeight:'bold' ,fontSize :15}}>
  Transaction ID: {GLOBAL.dd.txnID}
  </Text>
 <Text style = {{margin :10  ,color :'#90ba45' ,fontSize :15}}>
{GLOBAL.dd.transaction_status}
  </Text>
</View>

<View style={{flexDirection:'row', justifyContent:'space-between'}}>
<Text style = {{margin :10  ,color :'white',fontWeight:'bold' ,fontSize :15}}>
 Mode:
 </Text>

 {status=='scratch_card' &&(
   <Text style = {{margin :10  ,color :'white',fontSize :15}}>
    Scratch Card</Text>
 )}

 {status=='signup' &&(
   <Text style = {{margin :10  ,color :'white',fontSize :15}}>
   Got Signup bonus</Text>
 )}

 {status=='refund' &&(
   <Text style = {{margin :10  ,color :'white',fontSize :15}}>
   Refund</Text>
 )}

{status=='order' &&(
  <Text style = {{margin :10  ,color :'white',fontSize :15}}>
  Order</Text>
)}
{status=='Quiz' &&(
  <Text style = {{margin :10  ,color :'white',fontSize :15}}>
  Quiz</Text>
)}
{status=='Referral' &&(
  <Text style = {{margin :10  ,color :'white',fontSize :15}}>
  Got Referral Bonus</Text>
)}

{status=='wallet' && trans=='Rajor' && trans=='' &&(
    <Text style = {{margin :10  ,color :'white',fontSize :15}}>
    Razorpay
    </Text>
)}
{status=='wallet' && trans!='Rajor' && type !='Mobikwik' &&(
    <Text style = {{margin :10  ,color :'white',fontSize :15}}>
    Paytm
    </Text>
)}

    {type =='Mobikwik' && (
        <Text style = {{margin :10  ,color :'white',fontSize :15}}>
            Mobikwik
        </Text>
    )}
</View>

<View style={{flexDirection:'row', justifyContent:'space-between'}}>
<Text style = {{margin :10  ,color :'white',fontWeight:'bold' ,fontSize :15}}>
 Date:
 </Text>
<Text style = {{margin :10  ,color :'white', fontSize :15}}>
{GLOBAL.dd.tdate}</Text>
</View>


<View style={{flexDirection:'row', justifyContent:'space-between'}}>
<Text style = {{margin :10  ,color :'white',fontWeight:'bold' ,fontSize :15}}>
 Time:
 </Text>
<Text style = {{margin :10  ,color :'white' ,fontSize :15}}>
{GLOBAL.dd.ttime}</Text>
</View>
    </View>
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
