import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image, TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
const window = Dimensions.get('window');
type Props = {};
export default class Slider extends Component<Props> {

  static navigationOptions = ({ navigation }) => {
   return {
     swipeEnabled: false,
     gesturesEnabled: false,
      header: () => null
   }
}

  buttonClickListener = () =>{
 this.props.navigation.replace('Landing')
}

  render(){
    return (

    <View style={{width: '100%', height: '100%',flex: 1, flexDirection: 'column' ,backgroundColor :'black'}}>

      <Swiper
      style={styles.wrapper}

      showsPagination = {false}
    >
        <View style={{width :window.width,height :window.height}}>
       <Image style={styles.slide1}
       source={require('./firsts.png')}/>
       <View style = {{flexDirection:'row',height : 3 ,width : 15,marginLeft :62 ,marginTop :10}}>
        <View style = {{width : 50 ,height :3 ,backgroundColor :'white'}}>
        </View>
        <View style = {{marginLeft : 10 ,width : 50 ,height :3 ,backgroundColor :'grey'}}>
        </View>

       </View>
       <Text style = {{color :'#90BA45',marginLeft :59 ,marginTop :10 ,fontSize:22,fontFamily:'TypoGraphica'}}>
         Brands you'll love.

         </Text>
         <Text style = {{color :'white',marginLeft :59 ,marginTop :10 ,fontSize:16,fontFamily:'TypoGraphica'}}>
          Meals are sourced from the highest quality local brands.

           </Text>
        </View>
        <View style={{width :window.width,height :window.height}}>
               <Image style={styles.slide1}
       source={require('./seconds.png')}/>

       <View style = {{flexDirection:'row',height : 3 ,width : 15,marginLeft :62 ,marginTop :10}}>
        <View style = {{width : 50 ,height :3 ,backgroundColor :'grey'}}>
        </View>
        <View style = {{marginLeft : 10 ,width : 50 ,height :3 ,backgroundColor :'white'}}>
        </View>

       </View>


       <Text style = {{color :'#90BA45',marginLeft :59 ,marginTop :10 ,fontSize:22,fontFamily:'TypoGraphica'}}>
         Hassle free

         </Text>


         <Text style = {{color :'white',marginLeft :59 ,marginTop :10 ,fontSize:16,fontFamily:'TypoGraphica'}}>
          Larder delivers and stocks food in your office daily..

           </Text>
        </View>


      </Swiper>
      <Button
          containerStyle={{position:'absolute',right:0,marginTop : window.height - 50,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
          disabledContainerStyle={{backgroundColor: 'grey'}}
          style={{fontSize: 20, color: 'white',fontFamily:'TypoGraphica'}}
           onPress={this.buttonClickListener}>
          SKIP
        </Button>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {

    marginLeft : 50,
    marginTop :75,
    width: window.width - 50,
    height:window.height - 250,
    resizeMode:'contain',


  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
