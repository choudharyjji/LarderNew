import React, {Component} from 'react';
import {ActivityIndicator,Linking,ScrollView,Platform, StyleSheet,StatusBar, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
import { NavigationActions,StackActions } from 'react-navigation';
import UserAvatar from 'react-native-user-avatar';
const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

export default class Account extends Component<Props> {
  static navigationOptions = {
  title: 'Account',
  swipeEnabled: false,
  gesturesEnabled: false,
  header: null
};
  navigateToScreen1 = (route) => () => {

     Alert.alert('Logout!','Are you sure you want to logout?',
       [{text:"Cancel"},
         {text:"Yes", onPress:()=>this._YesLogout()
  },
       ],
       {cancelable:false}
       )

   }

   navigateToScreen2 = (route) => () => {

      Alert.alert('Delete Account!','Are you sure you want to Delete Account?',
        [{text:"Cancel"},
          {text:"Yes", onPress:()=>this._YesLogout1()
   },
        ],
        {cancelable:false}
        )

    }

    _YesLogout1=()=>{


      this.showLoading();
            const url = 'http://139.59.76.223/larder/webservice/delete_account'

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


             AsyncStorage.removeItem('userID');

              this.props
              .navigation
              .dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Landing',
                    params: { someParams: 'parameters goes here...' },
                  }),
                ],
              }))


         })
         .catch((error) => {
           console.error(error);
            this.hideLoading();
             alert('Unable to process your request Please try again after some time')

         });









 }

   _YesLogout=()=>{

 AsyncStorage.removeItem('userID');

  this.props
  .navigation
  .dispatch(StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Landing',
        params: { someParams: 'parameters goes here...' },
      }),
    ],
  }))



}
  constructor(props) {
    super(props)
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: [],
      beer: [],
      image :'',
      email :'',
      mobile :'',
      name :'Larder',
      count : "0",
    }

  }
 _keyExtractor = (item, index) => item.organisationID;

 resPress = (resId,index) => {
    GLOBAL.productid =  resId;
    this.props.navigation.navigate('Ingredients')
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
       <TouchableOpacity onPress={() =>  this.resPress(item.productID,item)}>
     <View style = {{borderRadius : 2 ,borderColor :'white',margin : 10,height : window.width/3 + 30  ,width : window.width/3 - 10 ,flex :1 ,justifyContent:'center',flexDirection :'column' }} >

     <Image
              style={{ width: window.width/3 - 10, height: window.width/3 - 10}}
              source={{ uri: item.product_image }}
            />


   <Text style = {{  justifyContent:'flex-start' ,color:'white',fontSize :22,fontFamily:'TypoGraphica'}}>
   {item.product_name}
   </Text>
     </View>

  </TouchableOpacity>





   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/get_profile'

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

      AsyncStorage.setItem('username', responseJson[0].name);
        GLOBAL.profile = responseJson[0].image
         GLOBAL.username = responseJson[0].name
          GLOBAL.mobile = responseJson[0].mobile
        GLOBAL.mobiles = responseJson[0].mobile
         GLOBAL.email = responseJson[0].email
          GLOBAL.member = responseJson[0].member_since
           GLOBAL.dob = responseJson[0].dob
       {this.setState({image :responseJson[0].image})}
       {this.setState({mobile :responseJson[0].mobile})}
        {this.setState({email :responseJson[0].email})}
          {this.setState({name :responseJson[0].name})}


    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
        alert('Unable to process your request Please try again after some time')

    });
 }


 componentDidMount() {

   this.props.navigation.addListener('willFocus',this._handleStateChange);
  }
  _handleStateChange = state => {

 this.getMoviesFromApiAsync()
 };
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
     onSelect = data => {

{this.getMoviesFromApiAsync()}
         //this.setState(data);
       };
       onPress = () => {
          this.props.navigation.navigate("EditProfile", { onSelect: this.onSelect });
        };
     render() {
       var k;
       var s =  'http://139.59.76.223/larder/uploads/user.png';
       if (s == this.state.image){
         k = "0";
       } else {
         k = "1";
       }

         return (
           <View style={{ flex: 1,backgroundColor:'black',justifyContent:'flex-start', flexDirection:'column' }}>

    <Text style={{margin : 30,fontFamily:'TypoGraphica',fontSize:22, color:'white', alignSelf:'center', fontWeight:'bold'}}>{GLOBAL.username}</Text>

         <ScrollView>


     <View style={{flexDirection:'row'}}>



     {k == "0" &&(

       <UserAvatar style={{marginLeft:10,marginTop:10,alignSelf:'center'}}
               size="100" name={this.state.name} colors={['#90BA45','red','orange','purple']}/>

     )}

     {k == "1" &&(

       <Image style={{
   width: 100,
   height: 100,
    borderRadius: 50,
    marginLeft : 10,
    marginTop:10}}
        source=  {{ uri: this.state.image }}
        />

     )}

               <View style={{flexDirection:'column', marginLeft:40, marginTop:20}}>
                 <Text style={{fontSize:15,fontFamily:'TypoGraphica', color:'white', fontWeight:'bold'}}>{this.state.name}
                 </Text>
                 <Text style={{fontSize:10, color:'white', fontWeight:'bold',marginTop:5}}>{this.state.email}</Text>
                 <Text style={{fontSize:10, color:'white',fontFamily:'TypoGraphica', fontWeight:'bold',marginTop:5}}>{this.state.mobile}</Text>
     <Button
         containerStyle={{marginTop:10,padding:5, height:30, overflow:'hidden', borderRadius:25,    borderWidth: 2,
     borderColor:'white' ,backgroundColor: 'black'}}
         disabledContainerStyle={{backgroundColor: 'black'}}
         style={{fontSize: 10, color: 'white',fontFamily:'TypoGraphica'}}
         onPress={() =>     this.onPress()}>
        EDIT PROFILE
       </Button>
       </View>

     </View>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderHistory')}>
            <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                    My Order
                    </Text>

                    <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
                    source ={require('./nexts.png')}/>
              </View>
</TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Wallet')}>
            <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                  Booth Money
                    </Text>

                    <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
                    source ={require('./nexts.png')}/>
              </View>
              </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('WalletHistory')}>
                    <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                    Transaction History
                    </Text>

                    <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
                    source ={require('./nexts.png')}/>
              </View>
</TouchableOpacity>


<TouchableOpacity onPress={() => this.props.navigation.navigate('MyScratch')}>
    <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
    Scratch Cards
    </Text>

    <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
    source ={require('./nexts.png')}/>
</View>
</TouchableOpacity>



                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Video')}>
                    <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                    About
                    </Text>

                    <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
                    source ={require('./nexts.png')}/>
              </View>
              </TouchableOpacity>

            <TouchableOpacity onPress={() =>  Linking.openURL('https://www.larder.in/faq.html')}>
                 <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                 <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                 FAQ'S
                 </Text>

                 <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
                 source ={require('./nexts.png')}/>
           </View>
           </TouchableOpacity>


           <TouchableOpacity onPress={() =>  this.props.navigation.navigate(
             'Support')}>
              <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
              <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
              Support
              </Text>

              <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
              source ={require('./nexts.png')}/>
          </View>
          </TouchableOpacity>




              <TouchableOpacity onPress={() =>  Linking.openURL('https://www.larder.in/terms.html')}>
                    <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                    Terms and Conditions
                    </Text>

                    <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
                    source ={require('./nexts.png')}/>
              </View>
              </TouchableOpacity>
                          <TouchableOpacity onPress={() =>  Linking.openURL('https://www.larder.in/privacy.html')}>
                    <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                    Privacy Policy
                    </Text>

                    <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
                    source ={require('./nexts.png')}/>
              </View>
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                    <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                    Change Password
                    </Text>

                    <Image style={{width:20, height:20, marginTop: 25, resizeMode:'contain',marginRight:10  }}
                    source ={require('./nexts.png')}/>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
         onPress={this.navigateToScreen1('Login')}>
                    <View style = {{backgroundColor:'black',flexDirection:'row', justifyContent:'space-between',margin:10}}>
                    <Text style = {{fontWeight:'bold',color :'white', fontSize:20, marginTop:20}}>
                    Logout
                    </Text>

              </View>
          </TouchableOpacity>


            </ScrollView>
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
