import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar, Text,Alert,TextInput,View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
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

var arrayholders = [];

export default class BoothDetail extends Component<Props> {

  static navigationOptions = {
  title: 'BoothList',
  header: null
};
  constructor(props) {
    super(props)
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: [],
      beer: [],
      text:'',
      menu_image :'',
      count : "0",
    }

  }
 _keyExtractor = (item, index) => item.productID;

 resPress = (resId,index) => {
    GLOBAL.productid =  resId;
    this.props.navigation.navigate('Ingredients')
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

var type = item.product_type
     var my = 0
     if (type == "veg"){
         my = 0
     }else {
         my = 1
     }

   return (
     <TouchableOpacity onPress={() =>  this.resPress(item.productID,item)}>
     <View style = {{width : window.width ,flex :1 ,flexDirection :'row', marginLeft:10, marginRight:10, marginTop:10}} >
     <Image
              style={{ width:80, height: 90, marginTop:3}}
              source={{ uri: item.product_image }}
            />

            <View style={{width:window.width,flexDirection:'column',alignSelf:'flex-start', marginLeft:10,width : width - 150}}>
    <Text style = {{width:window.width,marginRight:10, color:'white',fontSize :15,fontWeight:'bold'}}>
    {item.product_name}
    </Text>
                <Text style = {{ marginTop : 3 ,color:'white',fontSize :15,}}>
                    Brand: {item.brand}
                </Text>
    <Text style = {{ marginTop : 3 ,color:'white',fontSize :15,}}>
    Qty: {item.productNum}
    </Text>

       <View style = {{flexDirection :'row'}}>
    <Text style = {{marginTop : 3 ,color:'#90ba45',fontSize :15,fontWeight:'bold'}}>
    INR
    </Text>
           <Text style = {{marginTop : 3,textDecorationColor: 'black' ,color:'#90ba45',fontSize :15,fontWeight:'bold',textDecorationStyle: 'double', }}>
                {item.retail_price}
           </Text>
           <Image
               style={{ height:18,width :18  ,marginLeft :-20,marginTop:3}}
               source={require('./crosss.png')}/>
           <Text style = {{marginTop : 3 ,color:'#90ba45',fontSize :15,fontWeight:'bold'}}>
            &nbsp;{item.sale_price}
           </Text>
       </View>
                {my == 0 && (

                    <Image
                        style={{ height:10,width :10 ,position  :'absolute' ,top : 3 ,left :-24}}
                        source={require('./veg.png')}/>



                )}


                {my == 1 && (
                    <Image
                        style={{ height:10,width :10 ,position  :'absolute' ,top : 3 ,left :-24}}
                        source={require('./non-veg.png')}/>
                )}


 </View>

 </View>
   </TouchableOpacity>





   )
 }

 SearchFilterFunction(text){
//   alert(item.product_name)
       const newData = arrayholders.filter(function(item){
              const itemData = item.product_name.toUpperCase()
              const textData = text.toUpperCase()
              return itemData.indexOf(textData) > -1
          })
          this.setState({
              moviesList: newData,
              text: text


          })

      }


 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/boothwise_inventory'

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    accessToken: GLOBAL.accessToken,
    boxId :GLOBAL.boxId,


  }),
}).then((response) => response.json())
    .then((responseJson) => {

        this.hideLoading();

       this.setState({ moviesList: responseJson[0].products})
      this.setState({ menu_image: responseJson[0].menu_image})
      arrayholders = responseJson[0].products

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
        alert('Unable to process your request Please try again after some time')

    });
 }

   componentWillMount() {
     {this.getMoviesFromApiAsync()}
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

   size="large" color="#90ba45" />
    </View>
  )
}
  return (

    <View style = {{flex : 1 , width : width ,height : height ,backgroundColor:'black' }}>
    <Image style={{marginLeft : 0 ,height : 180 ,marginTop :0 , width : width}}
      source={{ uri: this.state.menu_image }}/>
    <Text style = {{marginTop : -150 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>
    {GLOBAL.username}
    </Text>

     <View style = {{flexDirection :'row'}}>

      <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
    <Image style={{marginLeft : 10 ,height : 30 ,marginTop :5 , width : 30,resizeMode :'contain'}}
source={require('./back.png')}/>
</TouchableOpacity>
<Text style = {{fontFamily:'TypoGraphica',color :'#90BA45',fontSize : 30 ,marginLeft : -20, marginTop :90 }}>
Our Menu
</Text>

 </View>

 <View style = {{flexDirection :'row'}}>
 <TextInput
            style={{marginRight:40,marginLeft:10,marginBottom:4, paddingLeft:25,height: 40,borderWidth :0.5 ,borderRadius:10,borderColor :'white',color:'white',width :width - 80}}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.text}
            multiline={false}
            placeholderTextColor="white"
            underlineColorAndroid='transparent'
            placeholder="Search Products..."
            />
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Wallet')}>
            <Image style={{ marginLeft:-35,height : 30  , width : 30,resizeMode :'contain'}}
          source={require('./walletw.png')}/>
          </TouchableOpacity>
</View>

 <FlatList
   data={this.state.moviesList}
   numColumns={1}
   keyExtractor={this._keyExtractor}
  renderItem={this._renderItem}
  extraData={this.state}
 />
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
