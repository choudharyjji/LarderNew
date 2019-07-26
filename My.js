import React, { Component } from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
import ScratchImageView from 'react-native-scratch-view';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
var flag=0;

const equalWidth =  (width -20 )
export default class My extends Component {

constructor(props) {
   super(props);

   this.state = {
     onRevealPercentChanged: 0,
     onRevealed: "false"
   };
   this.onRevealPercentChanged = this.onRevealPercentChanged.bind(this);
   this.onRevealed = this.onRevealed.bind(this);
}

onRevealed() {

}

componentDidMount() {


     this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    _handleStateChange = state => {

  flag = 0;
 };

onRevealPercentChanged(e) {
  // this.setState({onRevealPercentChanged: e});

   if (e > 45.0) {

    flag ++ ;

    if(flag == 1){



           const url = 'http://139.59.76.223/larder/webservice/redeem_card'

          fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: GLOBAL.userID,
        code :GLOBAL.myCode,


      }),
    }).then((response) => response.json())
        .then((responseJson) => {

      this.props.navigation.goBack()



        })
        .catch((error) => {
          console.error(error);
           this.hideLoading();
            alert('Unable to process your request Please try again after some time')

        });


}

   }
}

render() {
  var amount  = ""
  if  (GLOBAL.myAmount == "0"){
 amount = `Better luck next time.`;
  } else {
   amount = `Congratulation You Won : Rs ${GLOBAL.myAmount} `;
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

 </Text>

  </View>

  <Image style={{marginLeft : width/2 -50 ,height : 100 ,marginTop :45 , width : 100,resizeMode :'contain'}}
source={require('./booths.png')}/>


  <Text style = {{alignSelf :'center',marginLeft :width/2 -80 ,color:'white', marginTop :  1 ,fontFamily :'TypoGraphica',fontSize : 22,width : 200}}>
   {amount}
  </Text>
        <ScratchImageView
	  style={{height: 300, width: width - 50,marginTop : - 250 ,marginLeft :25 , }}
	  onRevealPercentChanged={this.onRevealPercentChanged}
	  onRevealed={this.onRrevealPercent=100}
    amount= "500"
	  imageScratched={{uri: 'https://static.iris.net.co/semana/upload/images/2016/6/2/476094_1.jpg'}}
	  imagePattern={{uri: 'http://139.59.76.223/larder/uploads/bg.jpg'}}
	/>



     </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});
