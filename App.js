import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,NetInfo} from 'react-native';
import AppNavigator from './Navigator';


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {

      realm :null,

    };
    NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.onInitialNetConnection
        );

  }
  render() {
    StatusBar.setBarStyle('light-content', true);


    return (
       <AppNavigator/>
    );
  }

  onInitialNetConnection = (isConnected : boolean) => {
if (isConnected == true){
  Realm.open({
               schema: [{name: 'Requests', properties: {ids:'string',userID: 'string',amount :'string',transaction_status: 'string',txnID :'string'}}]
             }).then(realm => {

               this.setState({ realm });
               var info =  this.state.realm.objects('Requests')



              for(var i = 0; i < info.length; i++){
                var myid = info[i].ids
                const url = 'http://139.59.76.223/larder/webservice/add_wallet'

               fetch(url, {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID: info[i].userID,
              amount :info[i].amount,
             transaction_status :info[i].transaction_status,
             txnID :info[i].ids,



            }),
            }).then((response) => response.json())
             .then((responseJson) => {
            //     alert(JSON.stringify(responseJson))
            realm.write(() => {
      var cars = realm.objects('Requests').filtered('ids = "'+myid+'"');

realm.delete(cars)
                   });






             })
             .catch((error) => {
               console.error(error);



            //       alert('Unable to process your request Please try again after some time')

             });
              }
 })
}
  }
}
