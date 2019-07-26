import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar, Text,TextInput,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
const GLOBAL = require('./Global');
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import UserAvatar from 'react-native-user-avatar';
const { width, height } = Dimensions.get('window');
var s = GLOBAL.dob;
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);


export default class EditProfile extends Component<Props> {
  _handleDatePicked = (date) => {
    this.setState({ isDateTimePickerVisible: false });
      s = date.toString()

   GLOBAL.dob = s;

    };
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  static navigationOptions = {
  title: 'Edit Profile',
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
      flag:'N',
      dob :'',
      beer: [],
      count : "0",
      image : GLOBAL.profile,
      name:GLOBAL.username,
      email:GLOBAL.email,
      mobile:GLOBAL.mobile,
      isDateTimePickerVisible: false,
    }

  }
 _keyExtractor = (item, index) => item.organisationID;

 resPress = (resId,index) => {
    this.props.navigation.navigate('HomeScreen')
   }

   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

     _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

     _handleDatePickalert(date){
       console.log('A date has been picked: ', date);

       this._hideDateTimePicker();
     };


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
    buttonClickListener = () =>{



        if (this.state.name == ''){
          alert('Please Enter Name')
        } else if (this.state.email == ''){
           alert('Please Enter Email')
        }else if (this.state.mobile == ''){
           alert('Please Enter Mobile')
        }   else {
          this.showLoading()
      const url = "http://139.59.76.223/larder/webservice/edit_profile"
     const data = new FormData();
    data.append('userID', GLOBAL.userID);
    data.append('name', this.state.name);
      data.append('email', this.state.email);
    data.append('flag', this.state.flag);
    data.append('dob',Moment(GLOBAL.dob).format('DD-MM-YYYY'));
    // you can append anyone.
    data.append('image', {
      uri: GLOBAL.profile,
      type: 'image/jpeg', // or photo.type
      name: 'image.png'
    });
    fetch(url, {
      method: 'post',
      body: data,
      headers: {
          'Content-Type': 'multipart/form-data',
        }

    }).then((response) => response.json())
          .then((responseJson) => {
      this.hideLoading()

      const { navigation } = this.props;
      navigation.goBack();
      navigation.state.params.onSelect({ address: "Hello"});

        this.setState({
          name: responseJson.name,
        });

      this.setState({
          avatarSource: responseJson.image,
        });
      Global.name = this.state.name
       Global.profile = this.state.avatarSource
      console.log(responseJson)
    });
      }

    }

 _handlePress() {
    if(this.state.newpass!=null && this.state.newpass!=null && this.state.confpass!=null){
      if(this.state.newpass===this.state.confpass){
      this.props.navigation.navigate('HomeScreen')
    this.getMoviesFromApiAsync()
    }
    else{
      alert("password mismatch")
    }


    }
    else{
      alert("password cannot be empty")
    }

  }

  changeImages=()=>{
    GLOBAL.profile = 'http://139.59.76.223/larder/uploads/user.png';
      this.setState({flag : 'C'})
    this.setState({image :   GLOBAL.profile})

  }
changeImage=()=>{
   ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else {
    const source = { uri: response.uri };
 GLOBAL.profile = 'data:image/jpeg;base64,' + response.data
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    this.setState({flag :   'Y'})
  this.setState({image :   GLOBAL.profile})
    this.setState({
      avatarSource: source,
    });
  }
});
}
 renderPage(image, index) {
         return (
             <View key={index}>
                 <Image style={{ width: window.width, height: 150 }} source={{ uri: image }} />
             </View>
         );
     }

  render() {
    Moment.locale('en');


        var dt = GLOBAL.dob
        var k;
        var s =  'http://139.59.76.223/larder/uploads/user.png';
        if (s == this.state.image){
          k = "0";
        } else {
          k = "1";
        }

    if(this.state.loading){
  return(
    <View style={{flex: 1 ,backgroundColor: 'black'}}>
    <ActivityIndicator style = {styles.loading}

   size="large" color="#90ba45" />
    </View>
  )


}
  return (
<KeyboardAwareScrollView style = {{backgroundColor:'black'}}>
    <View style = {{flex : 1 , width : width ,height : window.height ,backgroundColor:'black' }}>

    <Text style = {{marginTop :30 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>
    {GLOBAL.username}
    </Text>

     <View style = {{flexDirection :'row'}}>

     <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
   <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
source={require('./back.png')}/>
</TouchableOpacity>
<Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
Edit Profile
</Text>

 </View>
 <View style={{margin:10, flexDirection:'column'}}>

{k == "0" &&(
<TouchableOpacity onPress={() => this.changeImage()}>
  <UserAvatar style={{marginLeft:10,marginTop:10,alignSelf:'center'}}
          size="110" name={GLOBAL.username} colors={['#90BA45','red','orange','purple']}/>
          </TouchableOpacity>

)}
{k == "1" &&(
  <TouchableOpacity onPress={() => this.changeImage()}>
<Image style={{
    width: 110,
    height: 110,
    alignSelf:'center',
     borderRadius: 50,
     marginLeft : 10,
     marginTop:10}}
     source={{ uri: this.state.image}}

          />
          </TouchableOpacity>
        )}

<TouchableOpacity style = {{position :'absolute'}}
onPress={() => this.changeImages()}>
<Image style={{ height : 30 ,top :15,left :window.width/2 + 28 , width : 30,resizeMode :'contain'}}
source={require('./cross.png')}/>
</TouchableOpacity>

<Text style={{    fontSize:20,
    color:'white',
    marginTop:15,
    marginLeft:10,    alignSelf:'center',}}>Upload Photo</Text>

<Text style={styles.title}>NAME</Text>
<TextInput style ={{height:35,fontSize:15,borderBottomWidth:2, borderBottomColor:'grey', marginLeft:15,marginRight:15, color:'white'}}
value={this.state.name}
onChangeText={(text) => this.setState({name:text})}
/>

<Text style={styles.title}>EMAIL</Text>
<TextInput style ={{height:35,fontSize:15,borderBottomWidth:2, borderBottomColor:'grey', marginLeft:15,marginRight:15, color:'white'}}
 value={this.state.email}
onChangeText={(text) => this.setState({email:text})}
/>
<DateTimePicker
         isVisible={this.state.isDateTimePickerVisible}
         onConfirm={this._handleDatePicked}
         maximumDate={Moment().toDate()}
         onCancel={this._hideDateTimePicker}
       />
<Text style={styles.title}>MOBILE</Text>
<TextInput style ={{height:35,fontSize:15,borderBottomWidth:2, borderBottomColor:'grey', marginLeft:15,marginRight:15, color:'white'}}
 value={this.state.mobile}
onChangeText={(text) => this.setState({mobile:text})}
/>

<Text style={styles.title}>DATE OF BIRTH</Text>
<TouchableOpacity onPress={this._showDateTimePicker}>
<Text style ={{marginTop : 5,height:23,fontSize:15,borderBottomWidth:2, borderBottomColor:'grey', marginLeft:15,marginRight:15, color:'white'}} >
{dt!= "" && (

  Moment(dt).format('DD/MM/YYYY')
)}
{dt == "" && (

'DD/MM/YYYY'
)}

</Text>
</TouchableOpacity>



 </View>
<Button
    containerStyle={{ height:50 ,margin:10, backgroundColor: '#90BA45', padding:10,bottom:0}}
    disabledContainerStyle={{backgroundColor: '#90BA45'}}
    style={{fontSize: 15, textAlign:'center',color: 'white', fontFamily:'TypoGraphica'}}

    onPress={() => this.buttonClickListener()}

    >
   SAVE
  </Button>

  <Text style = {{alignSelf :'center',color :'white',position :'absolute' ,bottom :0}}>
  Member Since : {GLOBAL.member}
  </Text>

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
