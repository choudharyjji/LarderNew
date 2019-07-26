import { createStackNavigator ,createAppContainer ,createDrawerNavigator,createBottomTabNavigator} from 'react-navigation';
import Slider from './Slider.js';
import Splash from './Splash.js';
import Login from './Login.js';
import Ser from './Ser.js';
import Signup from './Signup.js';
import Forget from './Forget.js';
import Support from './Support.js';
import Dislaimner from './Dislaimner.js';
import MyBlog from './MyBlog.js';
import Kyc from './Kyc.js';
import MyScratch from './MyScratch.js';
import BlogDetail from './BlogDetail.js';
import OrderHistory from './OrderHistory.js';
import Otp from './Otp.js';
import Faq from './Faq.js';
import Tdetail from './Tdetail.js';
import Payment from './Payment.js';
import Recommended from './Recommended.js';
import OrderDetail from './OrderDetail.js';
import Landing from './Landing.js';
import BoothList from './BoothList.js';
import BoothDetail from './BoothDetail.js';
import Ingredients from './Ingredients.js';
import QrScan from './QrScan.js';
import Organisation from './Organisation.js';
import Wallet from './Wallet.js';
import Quiz from './Quiz.js';
import Home from './Home.js';
import Account from './Account.js';
import EditProfile from './EditProfile.js';
import WalletHistory from './WalletHistory.js';
import Search from './Search.js';
import MobikwikOtp from './MobikwikOtp.js'
import Video from './Video.js';
import My from './My.js';
import WalletList from './WalletList.js';
import Pay from './Pay.js';
import ChangePassword from './ChangePassword.js';
import {NavigationActions} from 'react-navigation';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,Button,Image,Alert} from 'react-native';


const TabNavigator = createBottomTabNavigator({
            Home: { screen: Home,
            navigationOptions : {
    title:'Explore',

    tabBarLabel: 'Explore',

          swipeEnabled: false,
          gesturesEnabled: false,
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('./searchs.png')}
        style={{width:20, height:20}}
      />
      }
       },
           QrScan: { screen: QrScan ,
                navigationOptions : {
    title:'Scan',
    tabBarLabel: 'Scan',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('./scan.png')}
        style={{width:20, height:20}}
      />
      }
    },

    Recommended: { screen: Recommended ,
          navigationOptions : {
    title:'',
    tabBarLabel: '',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>

      <View style={{height:70, width:70, borderRadius:35,backgroundColor: 'transparent',
          }}>

      <Image
        source={require('./homeeee.png')}
        style={{width:70, height:70,alignSelf:'center',resizeMode:'contain'}}
        />
     </View>

      }},


           BoothList: { screen: BoothList ,
                navigationOptions : {
    title:'Booths',
    tabBarLabel: 'Booths',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('./booths.png')}
        style={{width:20, height:20}}
      />
      }
    },
            Account :{screen:Account,
                  navigationOptions : {
    title:'Account',
    tabBarLabel: 'Account',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('./account.png')}
        style={{width:20, height:20}}
      />
      }
},
  },


 {
    defaultNavigationOptions: ({ navigation }) => ({

      swipeEnabled: false,
      gesturesEnabled: false,

      tabBarIcon: () => (
      <Image
        source={require('./account.png')}
        style={{width:20, height:20}}
      />
      )
    }),
    tabBarOptions: {

            swipeEnabled: false,
            gesturesEnabled: false,
      activeTintColor: '#90BA45',
      inactiveTintColor: 'white',
      inactiveBackgroundColor:'black',
      activeBackgroundColor:'black',
      showIcon:'true'
    },

  }
);


const StackNavigator = createStackNavigator({

   Splash: { screen: Splash },

  Slider: { screen: Slider },
    Landing: { screen: Landing },
    Forget: { screen: Forget },
    TabNavigator: { screen: TabNavigator },

  EditProfile: { screen: EditProfile },
    Support: { screen: Support },
ChangePassword: { screen: ChangePassword },
    MyScratch: { screen: MyScratch },
      My: { screen: My },
    Search: { screen: Search },
            Home: { screen: Home },
    Recommended: { screen: Recommended },
    Quiz: { screen: Quiz },
    MyBlog: { screen: MyBlog },
    Account: { screen: Account },
  WalletHistory: { screen: WalletHistory },
  Dislaimner: { screen: Dislaimner },
        WalletList :{screen :WalletList},
        Faq: { screen: Faq },
    Wallet: { screen: Wallet },
    QrScan: { screen: QrScan },
OrderHistory: { screen: OrderHistory },
BlogDetail: { screen: BlogDetail },
    MobikwikOtp :{screen :MobikwikOtp},
        Kyc :{screen :Kyc},
           BoothList: { screen: BoothList },
           BoothDetail: { screen: BoothDetail },
Tdetail: { screen: Tdetail },
           Video: { screen: Video },
           Login: { screen: Login },
           Ingredients: { screen: Ingredients },
OrderDetail: { screen: OrderDetail },
        Payment: { screen: Payment },
           Signup: { screen: Signup ,
navigationOptions: ({ navigation }) => ({
 headerTintColor: 'white',
   title: 'Signup',
    headerStyle: {
    backgroundColor: 'black'

  }

}),
},

Otp: { screen: Otp ,
navigationOptions: ({ navigation }) => ({
headerTintColor: 'white',
title: 'Otp',
headerStyle: {
backgroundColor: 'black'

}

}),
},


Organisation: { screen: Organisation ,
navigationOptions: ({ navigation }) => ({
headerTintColor: 'white',
title: 'Organisation',
headerStyle: {
backgroundColor: 'black'

}

}),
},

},
{headerMode :'none'},
);

export default createAppContainer(StackNavigator);
