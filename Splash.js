import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image, Button ,Alert,AsyncStorage,Dimensions ,TouchableOpacity} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import NotifService from './NotifService';
type Props = {};
export default class Splash extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
       animations: {
    setRoot: {
      waitForRender: false
    }
  }
    }
}
onRegister(token) {

    console.log(token);
  GLOBAL.deviceToken =  token.token;
  this.setState({ registerToken: token.token, gcmRegistered: true });
}

onNotif(notif) {
  console.log(notif);
  Alert.alert(notif.title, notif.message);
}

handlePerm(perms) {
  Alert.alert("Permissions", JSON.stringify(perms));
}
 changeComponent = (component) =>{
    this.setState({componentSelected: component});
  }
 constructor(props) {
    super(props)
    this.state = {
      isVideoPlaying :true

    }
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }


  getMoviesFromApiAsyncs = () => {

  var acess = "";
    fetch('http://139.59.76.223/larder/webservice/machine_login')
     .then((response) => response.json())
     .then((responseJson) => {

   if (responseJson.code == 1){
     acess =  responseJson.data.accessToken

    GLOBAL.accessToken =  acess


    var value =  AsyncStorage.getItem('userID');
      value.then((e)=>{
      if (e == '' || e == null ){
        this.props.navigation.navigate('Slider')
      }else {
         this.props.navigation.replace('TabNavigator')
      }

      })
   }else{
      alert('Unable to process your request Please try again')
   }


     })
     .catch((error) => {
       console.error(error);
        this.hideLoading();
         alert('Unable to process your request Please try again after some time')

     });
  }
  componentDidMount(){


    var value =  AsyncStorage.getItem('userID');
     value.then((e)=>{
      GLOBAL.userID = e;

     })
     var values =  AsyncStorage.getItem('username');
      values.then((e)=>{
       GLOBAL.username = e;

      })
      var values =  AsyncStorage.getItem('mobile');
       values.then((e)=>{
        GLOBAL.mobile = e;

       })


   this.getMoviesFromApiAsyncs()



}

  render() {
    return (
      <View style={styles.container}>
       <Image style = {{width :window.width ,height : window.height}}
         source={require('./splash.png')}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
});
