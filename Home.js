import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar, Text,Alert,Linking, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';

const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

export default class Home extends Component<Props> {
  renderPage(image, index) {
        return (

            <View style={{width : 100 ,height :100 ,backgroundColor :'black'}}
            key={index}>
                <Image style={{width :100}}

                source={{ uri: image }}/>

            </View>
        );
    }

    _renderItemm ({item, index}) {
        return (
            <View style={{width:130, height:130}}>

            <Image style={{width:130, height:130}}
            source={{ uri: item }}/>
            </View>
        );
    }

  static navigationOptions = {
  title: 'Home',
  swipeEnabled: false,
  gesturesEnabled: false,
  header: null
};
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
      wallet :'',
      blogs: [],
      beer: [],
      count : "0",
      calorie_image :'',
      quiz_image :'',

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



   _renderItems = ({item,index}) => {



     return (
       <View style = {{margin : 10,width : 120 ,height : 120 ,flex :1}}>

       <Image
                style={{ width:120, height: 120 ,resizeMode:'contain'}}
                source={{ uri: item.brand }}
              />

       </View>





     )
   }

//_renderItemss
blog = (item) =>{
  GLOBAL.blogurl = item;
  this.props.navigation.navigate('MyBlog')
}

_renderItemss = ({item,index}) => {



  return (
    <View style = {{margin : 10,width : width - 20 ,height : 150 ,flex :1,flexDirection :'row'}}>

    <Image
             style={{ width:150, height: 150}}
             source={{ uri: item.blog_image }}
           />

    <View style = {{flexDirection :'column', width : width-170}}>
    <Text style = {{margin :5 ,color :'white',fontSize:13,fontWeight :'bold'}}>
    {item.blog_date}
    </Text>
    <Text style = {{margin :5 ,color :'white',fontSize:15,fontWeight :'bold'}}
    numberOfLines = {3}>
    {item.description}
    </Text>
    <Button
        containerStyle={{marginTop :1,padding:8, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
        disabledContainerStyle={{backgroundColor: 'grey'}}
        style={{fontSize: 13, color: 'white',fontWeight:'bold'}}
         onPress= {()=> this.blog(item.link)}>
        CONTINUE READING
      </Button>

</View>
    </View>





  )
}



 _renderItem = ({item,index}) => {



   return (
     <View style = {{margin : 10,width : width - 80 ,height : 150 ,flex :1}}>

     <Image
              style={{ width: width - 80, height: 150}}
              source={{ uri: item.banner }}
            />

     </View>





   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/home'

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

  var my = [];
        {responseJson[0].brands.map((message) =>
         my.push(message.brand)

         )
       }
       this.setState({ wallet: responseJson[0].wallet})
 this.setState({ count: responseJson[0].calorie})
       this.setState({ moviesList: responseJson[0].banner})
          this.setState({ moviesLists: my})
 this.setState({ brandLists: responseJson[0].brands})
 this.setState({ blogs: responseJson[0].blogs})
  this.setState({ calorie_image: responseJson[0].calorie_image})
   this.setState({ quiz_image: responseJson[0].quiz_image})

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
        alert('Unable to process your request Please try again after some time')

    });
 }

   componentDidMount() {
     this.getMoviesFromApiAsync()
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
  <TouchableOpacity onPress={() => this.props.navigation.navigate('Wallet')}>
  <Image style={{marginLeft : width - 90 ,height : 30 ,marginTop :-30 , width : 30,resizeMode :'contain'}}
source={require('./walletw.png')}/>

<Text style = {{marginLeft : width - 50 ,color:'white' ,marginTop :-23 ,resizeMode :'contain',marginBottom :10,width :50}}>
{this.state.wallet}
</Text>
</TouchableOpacity>
  <KeyboardAwareScrollView>
<View style = {{height : 150,marginTop :8}}>
 <FlatList
   data={this.state.moviesList}
   horizontal={true}
   keyExtractor={this._keyExtractor}
  renderItem={this._renderItem}
  extraData={this.state}
 />
</View>
 <Text style = {{margin : 10 , fontSize : 22 ,fontWeight:'bold',color :'white'}}>
  Food Partners
 </Text>

 <Carousel
               ref={(c) => { this._carousel = c; }}
               data={this.state.moviesLists}
               autoplay={true}
               loop = {true}

               autoplayInterval={1000}
               renderItem={this._renderItemm}
               sliderWidth={window.width}
               itemWidth={130}
             />


 <Image style={{width : width ,height : 170 ,marginTop :15 }}
  source={{ uri: this.state.calorie_image }}/>

<Text style = {{alignSelf:'center',marginTop : -80 , fontSize : 25 ,fontWeight:'bold',color :'black'}}>
 {this.state.count}
</Text>
<Text style = {{alignSelf:'center',marginTop : 5 , fontSize : 12 ,color :'black'}}>
Today's Calorie Intake
</Text>

<TouchableOpacity onPress={() =>  this.props.navigation.navigate("Quiz")}>
<Image style={{width : width ,height : 170 ,marginTop :40 }}
  source={{ uri: this.state.quiz_image }}/>

<Text style = {{alignSelf:'center',marginTop : -70 , fontSize : 25 ,fontWeight :'bold',color :'black'}}>
QUIZ
</Text>
<Image style={{alignSelf:'center',marginTop : 8 ,width : 70 ,height : 25 ,resizeMode :'contain'}}
source={require('./play.png')}/>

</TouchableOpacity>
<Text style = {{marginLeft : 10,marginTop:30 , fontSize : 22 ,fontWeight :'bold',color :'white'}}>
 Blog
</Text>

<View style = {{height : 150}}>
 <FlatList
   data={this.state.blogs}
   horizontal={true}
   keyExtractor={this._keyExtractor}
  renderItem={this._renderItemss}
  extraData={this.state}
 />


</View>
  </KeyboardAwareScrollView>
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
  carousel:{
  width: 120,
  height:150,
  resizeMode :'contain',
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
