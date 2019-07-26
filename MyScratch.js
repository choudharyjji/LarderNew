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

export default class MyScratch extends Component<Props> {


resPress = (resId,index) => {
   GLOBAL.productid =  resId;
   this.props.navigation.navigate('Detail')
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

   componentDidMount() {


        this.props.navigation.addListener('willFocus',this._handleStateChange);

       }

       _handleStateChange = state => {

      this.getMoviesFromApiAsyncs()
    };

   resPress = (item) => {
     GLOBAL.myAmount = item.amount;
     GLOBAL.myCode = item.code;
     var c = item.redeem_status;
     if (c == "Y"){

     } else {
     this.props.navigation.navigate('My')
   }

     }


 _renderItem = ({item,index}) => {

var amount = `You Won : Rs ${item.amount} `;
var c = item.redeem_status;
   return (
     <TouchableOpacity

        onPress={() => this.resPress(item)}
          >
     <View style={{backgroundColor:'white',color :'white' , flex: 1 ,margin: 10, height: 130,borderRadius :12,width : window.width/2 - 20, shadowColor: '#000',
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.6,
     shadowRadius: 2,
     elevation: 5 }}>
     {index%2 == 0 && (
     <Image style={{margin : 10,height :90,width :window.width/2 - 30,marginLeft: 5,resizeMode:'contain'}}
                        source={require('./booth.png')} />
                      )}
                      {index%2 == 1 && (
                      <Image style={{margin : 10,height :90,width :window.width/2 - 30,marginLeft: 5,resizeMode:'contain'}}
                                         source={require('./booth.png')} />

                                       )}



    {c == "N" && (
      <Text style = {{margin:8,marginTop : - 8,alignSelf :'center',fontSize : 14,color :'black',fontWeight :'bold'}}>
      You Won Rs :
      </Text>
    )}


  {c == "Y" && (
    <Text style = {{margin:8,marginTop : - 8,alignSelf :'center',fontSize : 14,color :'black',fontWeight :'bold'}}>
    {amount}
    </Text>
  )}

  {c == "N" && (
            <View style = {{backgroundColor:'rgba(144,186,69,0.8)' ,marginTop : -127 ,width:window.width/2 - 20,height :130,borderRadius :12,shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
            elevation: 5}}>
            </View>
)}
      </View>

</TouchableOpacity>


   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/get_scratch_card'

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userID: GLOBAL.userID,


  }),
}).then((response) => response.json())
    .then((responseJson) => {
        this.hideLoading();


       this.setState({ moviesList: responseJson[0].data})



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

    componentDidMount() {

      this.props.navigation.addListener('willFocus',this._handleStateChange);
     }
     _handleStateChange = state => {

   this.getMoviesFromApiAsync()
   };
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
Scratch Cards
</Text>

 </View>
 <FlatList
   data={this.state.moviesList}
   numColumns={2}
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
       },

  content: {
    flex: 1,
    backgroundColor:'#000000',
  },
});
