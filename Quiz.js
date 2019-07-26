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

export default class Quiz extends Component<Props> {

  static navigationOptions = {
  title: 'BoothList',
  header: null
};
resPress = (resId,index) => {
   GLOBAL.productid =  resId;
  // this.props.navigation.navigate('Detail')
  }
  constructor(props) {
    super(props)
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: [],
      question :'',
      questionID :'',
      quizID :'',
      partic :'',
      beer: [],
      count : "0",
      ischecked :'',
    }

  }
 _keyExtractor = (item, index) => item.organisationID;

 resPress = (resId,index) => {
  //  GLOBAL.productid =  resId;
  //  this.props.navigation.navigate('BoothDetail')
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



   buttonClickListenerA = (item) =>{
     if (this.state.ischecked != ""){
       alert('You have already played this quiz.')
       return
     }
     this.showLoading();
           const url = 'http://139.59.76.223/larder/webservice/store_quiz_participants'

          fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: GLOBAL.userID,
        quizID :this.state.quizID,
        questionID : this.state.questionID,
        optionID : item.optionID



      }),
    }).then((response) => response.json())
        .then((responseJson) => {
            this.hideLoading();
              this.setState({ ischecked: "Y"})
              var s =  responseJson[0]

            if (item.is_correct == "1"){
              alert('Congratulations! Your answer is correct. We will reward Soon.')
              this.setState({ ischecked: "Y"})
              this.setState({ moviesList: s.options})
            }else{
                this.setState({ moviesList: s.options})
           alert('Oops! Your answer is incorrect. Please try again tomorrow.')

            }
      //  alert("Thank you for playing! We will reach you soon.")

  // this.props.navigation.goBack()



        })
        .catch((error) => {
          console.error(error);
           this.hideLoading();
            alert('Unable to process your request Please try again after some time')

        });
   }


 _renderItem = ({item,index}) => {


   return (
     <View>
     { this.state.ischecked == "" && (

       <Button
           containerStyle={{ height:50 ,margin:15, backgroundColor: 'transparent', padding:10,bottom:0, borderRadius:4, borderColor:'white', borderWidth:2}}
           disabledContainerStyle={{backgroundColor: '#90BA45'}}
           style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}
           onPress={() => this.buttonClickListenerA(item)}
           >
          {item.option_value}
         </Button>
     )
     }

     { this.state.ischecked != "" && item.is_checked == "Y" && item.is_correct == "0" && (

       <Button
           containerStyle={{ height:50 ,margin:15, backgroundColor: 'red', padding:10,bottom:0, borderRadius:4, borderColor:'white', borderWidth:2}}
           disabledContainerStyle={{backgroundColor: '#90BA45'}}
           style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}
         onPress={() => this.buttonClickListenerA(item)}
           >
          {item.option_value}
         </Button>
     )
     }


     { this.state.ischecked != "" && item.is_checked == "Y" && item.is_correct == "1" && (

       <Button
           containerStyle={{ height:50 ,margin:15, backgroundColor: '#90BA45', padding:10,bottom:0, borderRadius:4, borderColor:'white', borderWidth:2}}
           disabledContainerStyle={{backgroundColor: '#90BA45'}}
           style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}
          onPress={() => this.buttonClickListenerA(item)}
           >
          {item.option_value}
         </Button>
     )
     }


     { this.state.ischecked != "" && item.is_checked == "N" && item.is_correct == "0" && (

       <Button
           containerStyle={{ height:50 ,margin:15, backgroundColor: 'transparent', padding:10,bottom:0, borderRadius:4, borderColor:'white', borderWidth:2}}
           disabledContainerStyle={{backgroundColor: '#90BA45'}}
           style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}
            onPress={() => this.buttonClickListenerA(item)}
           >
          {item.option_value}
         </Button>
     )
     }

     { this.state.ischecked != "" && item.is_checked == "N" && item.is_correct == "1" && (

       <Button
           containerStyle={{ height:50 ,margin:15, backgroundColor: '#90BA45', padding:10,bottom:0, borderRadius:4, borderColor:'white', borderWidth:2}}
           disabledContainerStyle={{backgroundColor: '#90BA45'}}
           style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}
           onPress={() => this.buttonClickListenerA(item)}
           >
          {item.option_value}
         </Button>
     )
     }

</View>

   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/get_quiz'

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userID: GLOBAL.userID


  }),
}).then((response) => response.json())
    .then((responseJson) => {
        this.hideLoading();

  var s =  responseJson[0].quiz
   this.setState({ question :s.question})
      this.setState({ questionID :s.questionID})
        this.setState({ quizID :s.quizID})
 this.setState({ partic: s.is_participated})
       this.setState({ moviesList: s.options})
 this.setState({ ischecked: s.checked_option_id})


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

    <Text style = {{marginTop :30 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>
    {GLOBAL.username}
    </Text>

     <View style = {{flexDirection :'row'}}>

      <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
    <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
source={require('./back.png')}/>
</TouchableOpacity>
<Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
Quiz
</Text>

 </View>

 <Text style = {{alignSelf :'center',color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
 {this.state.question}
 </Text>
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
       },

  content: {
    flex: 1,
    backgroundColor:'#000000',
  },
});
