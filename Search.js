import React, {Component} from 'react';
import {ActivityIndicator,TextInput,Platform, StyleSheet,StatusBar, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
var arrayholder = [];

const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

export default class Search extends Component<Props> {

  static navigationOptions = {
  title: 'BoothList',
  header: null
};
resPress = (resId,index) => {
   GLOBAL.productid =  resId;

  }
  constructor(props) {
    super(props)
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: [],
      beer: [],
      value :'',
      count : "0",
    }

  }
 _keyExtractor = (item, index) => item.organisationID;

 resPress = (resId,index) => {
    GLOBAL.productid =  resId;

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



   SearchFilterFunction(text){
    const newData = arrayholder.filter(function(item){
           const itemData = item.name.toUpperCase()
           const textData = text.toUpperCase()
           return itemData.indexOf(textData) > -1
       })
       this.setState({
           moviesList: newData,
           text: text


       })

   }


 _renderItem = ({item,index}) => {



   return (
        <TouchableOpacity onPress={() =>  this.resPress(item.boothID,item)}>
     <View style = {{height : 80 ,width : window.width ,flex :1 ,flexDirection :'row'}} >

     <Image style={{marginLeft : 20 ,height : 60 ,marginTop :15 , width : 60,resizeMode :'contain'}}
     source={require('./booth.png')}/>

       <View style = {{margin : 10 ,flexDirection :'column'}}>
     <Text style = {{margin :10 ,color :'white',fontFamily :'TypoGraphica' ,fontSize :14}}>
   {item.name}
      </Text>

      <Text style = {{marginLeft :10 ,marginTop :2,color :'#90BA45',fontFamily :'TypoGraphica' ,fontSize :14}}>
    {item.brand}
       </Text>

 </View>

     </View>

 </TouchableOpacity>





   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
  var acess = ""
  fetch('https://www.larder.in/project/login.php')
   .then((response) => response.json())
   .then((responseJson) => {
    acess =  responseJson.data.accessToken

    const url = 'http://139.59.76.223/larder/webservice/product_list'

   fetch(url, {
method: 'POST',
headers: {
 'Content-Type': 'application/json',
},
body: JSON.stringify({
 userID: GLOBAL.userID,
 accessToken :acess,

}),
}).then((response) => response.json())
 .then((responseJson) => {
     this.hideLoading();


arrayholder =  responseJson.data.list



 })
 .catch((error) => {
   console.error(error);
    this.hideLoading();
     alert('Unable to process your request Please try again after some time')

 });
   })
   .catch((error) => {
     console.error(error);
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

    <Text style = {{marginTop :30 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>
    {GLOBAL.username}
    </Text>

     <View style = {{flexDirection :'row'}}>

      <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
    <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
source={require('./back.png')}/>
</TouchableOpacity>
<Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
Search
</Text>

 </View>
 <TextInput
          style={styles.TextInputStyleClass}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid='transparent'
          placeholder="Search Product"
           />
 <FlatList
   data={this.state.moviesList}
   numColumns={1}
   keyExtractor={this._keyExtractor}
  renderItem={this._renderItem}
  extraData={this.state}
 />
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
       },TextInputStyleClass:{

  textAlign: 'center',
  height: 40,
  borderWidth: 1,
  borderColor: '#009688',
  borderRadius: 7 ,
  backgroundColor : "#FFFFFF",
  margin :15

  },

  content: {
    flex: 1,
    backgroundColor:'#000000',
  },
});
