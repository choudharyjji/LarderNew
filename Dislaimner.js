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

export default class Dislaimner extends Component<Props> {


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
    this.props.navigation.navigate('Detail')
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



   goBack(item) {
        GLOBAL.organisationID = item.organisationID;
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onSelect({ address: item.organisation_name });
     }


 _renderItem = ({item,index}) => {




   return (
     <TouchableOpacity

         onPress={() => this.goBack(item)}
       >
     <View style = {{height : 80 ,width : window.width ,flex :1}} >
     <Text style = {{margin :10 ,color :'white',fontFamily :'TypoGraphica' ,fontSize :14}}>
   {item.organisation_name}
      </Text>

      <Text style = {{margin :10 ,color :'#90BA45',fontFamily :'TypoGraphica' ,fontSize :14}}>
    {item.address}
       </Text>

  <View style = {{marginLeft :0 ,height :1 ,width :window.width,backgroundColor :'white'}}>
  </View>

     </View>

</TouchableOpacity>





   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/organisation'

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    appID: "1",


  }),
}).then((response) => response.json())
    .then((responseJson) => {
        this.hideLoading();



       this.setState({ moviesList: responseJson[0].organisation})



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

   size="large" color="#90ba45" />
    </View>
  )
}
  return (





         <View style={styles.content}>
         <View style = {{flexDirection :'row' ,marginTop : 30}}>

          <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
        <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
      source={require('./back.png')}/>
      </TouchableOpacity>
      <Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
      Disclaimner
      </Text>

      </View>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1,marginTop : 5}}>

       <Text style = {{textAlign :'justify',margin : 10,color :'white',fontWeight:'bold'}}>

       1. Booth Money cannot be withdrawn or transferred to another person or Larder account. The
       same cannot be transferred to the respective banks as well. To know more about the same,
       kindly drop and email at knock@larder.in
       </Text>

       <Text style = {{textAlign :'justify',margin : 10,color :'white',fontWeight:'bold'}}>

       2. Booth Money expires upon completion of 1 year from the date of issuance. Larder reserves right
       to change/ extend this in case there is a genuine user request at the sole discretion of Larder.
       </Text>

       <Text style = {{textAlign :'justify',margin : 10,color :'white',fontWeight:'bold'}}>

       3. These terms and conditions are in addition to and not a substitution/ replacement for the terms
 and conditions on Larder Platform.
       </Text>
       <Text style = {{textAlign :'justify',margin : 10,color :'white',fontWeight:'bold'}}>

       4. These terms and conditions shall be governed by and constructed with the laws of India without
reference to conflict of laws, principles, and disputes arising in relation hereto which shall be
subject to the exclusive jurisdiction of courts, tribunals, forums and other governmental
authorities at New Delhi, India.
       </Text>

         </KeyboardAwareScrollView>
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
