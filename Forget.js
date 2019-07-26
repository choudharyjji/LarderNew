import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar, Text,TextInput,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const GLOBAL = require('./Global');

const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);


export default class Forget extends Component<Props> {

  static navigationOptions = {
  title: 'BoothList',
  header: null
};
resPress = (resId,index) => {
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
      oldpass:'',
      newpass:'',
      confpass:'',
      loading :'',
    }

  }
 _keyExtractor = (item, index) => item.organisationID;

 resPress = (resId,index) => {
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
        <TouchableOpacity onPress={() =>  this.resPress(item.boothID,item)}>
     <View style = {{height : 80 ,width : window.width ,flex :1 ,flexDirection :'row'}} >

     <Image style={{marginLeft : 20 ,height : 60 ,marginTop :15 , width : 60,resizeMode :'contain'}}
     source={require('./back.png')}/>

       <View style = {{margin : 10 ,flexDirection :'column'}}>
     <Text style = {{margin :10 ,color :'white',fontFamily :'TypoGraphica' ,fontSize :14}}>
   {item.boothname}
      </Text>

      <Text style = {{marginLeft :10 ,marginTop :2,color :'#90BA45',fontFamily :'TypoGraphica' ,fontSize :14}}>
    {item.address}
       </Text>

 </View>

     </View>

 </TouchableOpacity>





   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/change_password'

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userID: "1",


  }),
}).then((response) => response.json())
    .then((responseJson) => {
        this.hideLoading();


       this.setState({ moviesList: responseJson[0].booths})



    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
        alert('Unable to process your request Please try again after some time')

    });
 }

   componentWillMount() {
     //this.getMoviesFromApiAsync()

    }


 _handlePress() {
    if( this.state.newpass!=null && this.state.confpass!=null){



      if(this.state.newpass===this.state.confpass){
        this.showLoading()
        const url = "http://139.59.76.223/larder/webservice/forgot_password"

      fetch(url, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      mobile: GLOBAL.mobile,
      password: this.state.newpass,




      }),
      }).then((response) => response.json())
      .then((responseJson) => {
      this.hideLoading()

      if (responseJson[0].result == "success"){
        alert('Password Reset Succesfully')
      } else{
        alert('Password Mismatch')
      }


      })
      .catch((error) => {
      console.error(error);
        this.hideLoading()
      });

    }
    else{
      alert("password mismatch")
    }


    }
    else{
      alert("password cannot be empty")
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
    <View style={{flex: 1 ,backgroundColor: 'black'}}>
    <ActivityIndicator style = {styles.loading}

   size="large" color="#90ba45" />
    </View>
  )
}
  return (
<KeyboardAwareScrollView>
    <View style = {{flex : 1 , width : width ,height : window.height ,backgroundColor:'black' }}>

    <Text style = {{marginTop :30 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>

    </Text>

    <View style = {{flexDirection :'row'}}>

     <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
   <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
source={require('./back.png')}/>
</TouchableOpacity>
<Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
Forget Password
</Text>

</View>
 <View style={{margin:10, flexDirection:'column'}}>



<Text style={styles.title}>NEW PASSWORD</Text>
<TextInput style ={{height:35,fontSize:15,borderBottomWidth:2, borderBottomColor:'grey', marginLeft:15,marginRight:15, color:'white'}}
secureTextEntry={true} onChangeText={(text) => this.setState({newpass:text})}/>

<Text style={styles.title}>CONFIRM PASSWORD</Text>
<TextInput style ={{height:35,fontSize:15,borderBottomWidth:2, borderBottomColor:'grey', marginLeft:15,marginRight:15, color:'white'}}
secureTextEntry={true}  onChangeText={(text) => this.setState({confpass:text})}/>

 </View>
<Button
    containerStyle={{ height:50 ,marginTop:50,margin : 10, backgroundColor: '#90BA45', padding:10,bottom:0}}
    disabledContainerStyle={{backgroundColor: '#90BA45'}}
    style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}

    onPress={() => this._handlePress()}

    >
   SAVE
  </Button>

    </View>
</KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title:{
    fontSize:15,
    color:'#90BA45',
    marginTop:15,
    marginLeft:10,
    fontFamily :'TypoGraphica',

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
