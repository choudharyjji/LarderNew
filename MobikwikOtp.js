import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import Button from 'react-native-button'
const GLOBAL = require('./Global');
import { DrawerActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
type Props = {};
import DeviceInfo from 'react-native-device-info';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
var codes = "";
var randomString = require('random-string');
var sha256 = require('js-sha256');
var hash = "";
var mobitoken = "";
var currentbalanceamount = "";
var randomString = require('random-string');
var userexist = false;
export default class MobikwikOtp extends Component<Props> {
    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }
    state = {
        phone: '',
        password:'',
        loading :false,
    };




    componentWillMount() {
        var x = randomString({
            length: 10,
            numeric: true,
            letters: false,
            special: false,

        });
        GLOBAL.mobiorderid = x;

        var mobile =  GLOBAL.mobiles
        var merchantid = GLOBAL.merchantId
        var merchantName= GLOBAL.merchantName
        var secret = GLOBAL.secretKey



        var msg = '\'existingusercheck\'\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\'500\''

        hash = sha256.hmac(secret, msg)





        var commonHtml = `https://walletapi.mobikwik.com/querywallet?checksum=${hash}&cell=${GLOBAL.mobiles}&msgcode=500&mid=${GLOBAL.merchantId}&merchantname=${GLOBAL.merchantName}&action=existingusercheck`



        let request = {
            method: 'GET',
            headers: {
                'payloadtype': 'json',
                //'Authorization': 'Bearer ' + myToken, // won't works same error
                //'Token': myToken, // won't works same error

            },
            //credentials: 'include',
        }

        fetch(commonHtml, request)
            .then((response) => response.json())
            .then((responseJson) => {



                if (responseJson.status == "FAILURE"){
                    userexist = false
                   // this.setState({link :true})
                   // this.createwallet()
                }else{
                    userexist = true
                }


            })
            .catch((error) => {
                console.error(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });







    }

    createwallet = () =>
     {
         if (codes == ''){
             alert('Please Enter Otp')

             return
         }
         var mobile =  GLOBAL.mobiles;
         var merchantid = GLOBAL.merchantId;
         var merchantName= GLOBAL.merchantName;
         var secret = GLOBAL.secretKey;
         var amount = GLOBAL.myAmount;
         var tokentype = '1';
         var email = GLOBAL.email;

//'9910057241''kasif@mobikwik.com''Test Merchant''MBK9006''502''123456'
         var msg = '\''+mobile+'\'\''+email+'\'\''+merchantName+'\'\''+merchantid+'\'\'502\'\''+codes+'\'';


         var hashs = sha256.hmac(secret, msg)



//https://walletapi.mobikwik.com/otpgenerate?checksum=abb25243ec1d608e10612c6dfa11e0e05a4591c4544acf18d604cd31ea23607d&cell=9910057241&amount=1&tokentype=1&msgcode=504&mid=MBK9006&merchantname=TestMerchant

         var commonHtml = `https://walletapi.mobikwik.com/createwalletuser?checksum=${hashs}&cell=${mobile}&msgcode=502&mid=${GLOBAL.merchantId}&merchantname=${GLOBAL.merchantName}&otp=${codes}&email=${GLOBAL.email}`



         let request = {
             method: 'GET',
             headers: {
                 'payloadtype': 'json',
                 //'Authorization': 'Bearer ' + myToken, // won't works same error
                 //'Token': myToken, // won't works same error

             },
             //credentials: 'include',
         }

         fetch(commonHtml, request)
             .then((response) => response.json())
             .then((responseJson) => {


                 if (responseJson.status == "SUCCESS"){
                   this.buttonClickListener()

                 }else{
                    alert(responseJson.statusdescription)
                 }


             })
             .catch((error) => {
                 console.error(error);
                 this.hideLoading();
                 alert('Unable to process your request Please try again after some time')

             });

    }



    balanceCheck = () =>{

        var mobile =  GLOBAL.mobiles;
        var merchantid = GLOBAL.merchantId;
        var merchantName= GLOBAL.merchantName;
        var secret = GLOBAL.secretKey;
        var amount = GLOBAL.myAmount;
        var tokentype = '1';
//'9910057241''Test Merchant''MBK9006''501''d81a49a4b0fb414b804e138e670ef421'

        var msg = '\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\'501\'\''+mobitoken+'\'';


        var hashs = sha256.hmac(secret, msg)



//https://walletapi.mobikwik.com/otpgenerate?checksum=abb25243ec1d608e10612c6dfa11e0e05a4591c4544acf18d604cd31ea23607d&cell=9910057241&amount=1&tokentype=1&msgcode=504&mid=MBK9006&merchantname=TestMerchant

        var commonHtml = `https://walletapi.mobikwik.com/userbalance?checksum=${hashs}&token=${mobitoken}&msgcode=501&mid=${GLOBAL.merchantId}&merchantname=${GLOBAL.merchantName}&cell=${GLOBAL.mobiles}`



        let request = {
            method: 'GET',
            headers: {
                'payloadtype': 'json',
                //'Authorization': 'Bearer ' + myToken, // won't works same error
                //'Token': myToken, // won't works same error

            },
            //credentials: 'include',
        }

        fetch(commonHtml, request)
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson))
                // this.addBalance()
                if (responseJson.status == "SUCCESS"){

                    currentbalanceamount =  responseJson.balanceamount
                    var cbalabnce = parseInt(currentbalanceamount)
                    var recbalance = parseInt(GLOBAL.myAmount)
                    if (cbalabnce >= recbalance){
                        this.props.navigation.goBack()
                    }else {
                        this.addBalance()
                    }


                }else{

                }


            })
            .catch((error) => {
                console.error(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });
    }
    addBalance = () =>{
        var mobile =  GLOBAL.mobiles;
        var merchantid = GLOBAL.merchantId;
        var merchantName= GLOBAL.merchantName;
        var secret = GLOBAL.secretKey;
        var amount = GLOBAL.myAmount;
        var tokentype = '1';
        var orderid = GLOBAL.mobiorderid;
//'9910057241''Test Merchant''MBK9006''501''d81a49a4b0fb414b804e138e670ef421'
//'amount''cellno''merchantname''mid''orderid''redirecturl''token'
        var msg = '\''+amount+'\'\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\''+orderid+'\'\''+GLOBAL.redirecturl+'\'\''+mobitoken+'\'';


        var hashs = sha256.hmac(secret, msg)



//https://walletapi.mobikwik.com/otpgenerate?checksum=abb25243ec1d608e10612c6dfa11e0e05a4591c4544acf18d604cd31ea23607d&cell=9910057241&amount=1&tokentype=1&msgcode=504&mid=MBK9006&merchantname=TestMerchant

        var commonHtml = `https://walletapi.mobikwik.com/addmoneytowallet?checksum=${hashs}&amount=${GLOBAL.myAmount}&mid=${merchantid}&merchantname=${merchantName}&redirecturl=${GLOBAL.redirecturl}&orderid=${orderid}&token=${mobitoken}&cell=${mobile}`
      console.log(commonHtml)


        GLOBAL.html = commonHtml
        this.props.navigation.navigate('Kyc')

        // let request = {
        //     method: 'GET',
        //     headers: {
        //         'payloadtype': 'json',
        //         //'Authorization': 'Bearer ' + myToken, // won't works same error
        //         //'Token': myToken, // won't works same error
        //
        //     },
        //     //credentials: 'include',
        // }
        //
        // fetch(commonHtml, request)
        //     .then((response) => response.text())
        //     .then((data) => {
        //       // alert(data)
        //      GLOBAL.html = data
        //     this.props.navigation.navigate('Kyc')
        //
        //
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         this.hideLoading();
        //         alert('Unable to process your request Please try again after some time')
        //
        //     });
    }

    debitBalance = () =>{
        var mobile =  GLOBAL.mobiles;
        var merchantid = GLOBAL.merchantId;
        var merchantName= GLOBAL.merchantName;
        var secret = GLOBAL.secretKey;
        var amount = GLOBAL.myAmount;
        var tokentype = '1';
        var comment = 'Debit';
        var type = 'debit';
        var orderid = GLOBAL.mobiorderid;
//'9910057241''Test Merchant''MBK9006''501''d81a49a4b0fb414b804e138e670ef421'
//'amount''cellno''merchantname''mid''orderid''redirecturl''token'


    //

        var msg = '\''+amount+'\'\''+mobile+'\'\''+comment+'\'\''+merchantName+'\'\''+merchantid+'\'\'503\'\''+orderid+'\'\''+mobitoken+'\''+'\''+type+'\'';
       // alert(msg)

        var hashs = sha256.hmac(secret, msg)



//https://walletapi.mobikwik.com/otpgenerate?checksum=abb25243ec1d608e10612c6dfa11e0e05a4591c4544acf18d604cd31ea23607d&cell=9910057241&amount=1&tokentype=1&msgcode=504&mid=MBK9006&merchantname=TestMerchant


        //https://walletapi.mobikwik.com/debitwallet?checksum=00f7c462b92e038653865f1f656ec1cea4f5074 5032e5bd9e73b7c62ec204712&amount=1&comment=comment&msgcode=503&mid=MBK900 6&merchantname=Test%20Merchant&orderid=INFO1111100003&txntype=debit&token=32032 2754e14428ea85d80d7c732d772&cell=9910057241
        var commonHtml = `https://walletapi.mobikwik.com/debitwallet?checksum=${hashs}&amount=${GLOBAL.myAmount}&comment=${comment}&msgcode=503&mid=${GLOBAL.merchantId}&merchantname=${GLOBAL.merchantName}&orderid=${orderid}&txntype=debit&token=${mobitoken}&cell=${mobile}`




        let request = {
            method: 'GET',
            headers: {
                'payloadtype': 'json',
                //'Authorization': 'Bearer ' + myToken, // won't works same error
                //'Token': myToken, // won't works same error

            },
            //credentials: 'include',
        }

        fetch(commonHtml, request)
            .then((response) => response.json())
            .then((responseJson) => {
              // alert(JSON.stringify(responseJson))
                  this.tokenregenerate()


            })
            .catch((error) => {
                console.error(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });
    }


    buttonClickListener = () =>{


        if (codes == ''){
            alert('Please Enter Otp')

            return
        }


        if (userexist == false){
            this.createwallet()
        }else {
            var mobile = GLOBAL.mobiles;
            var merchantid = GLOBAL.merchantId;
            var merchantName = GLOBAL.merchantName;
            var secret = GLOBAL.secretKey;
            var amount = GLOBAL.myAmount;
            var tokentype = '1';


            var msg = '\'' + amount + '\'\'' + mobile + '\'\'' + merchantName + '\'\'' + merchantid + '\'\'507\'\'' + codes + '\'\'1\'';


            var hashs = sha256.hmac(secret, msg)


//https://walletapi.mobikwik.com/otpgenerate?checksum=abb25243ec1d608e10612c6dfa11e0e05a4591c4544acf18d604cd31ea23607d&cell=9910057241&amount=1&tokentype=1&msgcode=504&mid=MBK9006&merchantname=TestMerchant

            var commonHtml = `https://walletapi.mobikwik.com/tokengenerate?checksum=${hashs}&cell=${GLOBAL.mobiles}&amount=${GLOBAL.myAmount}&otp=${codes}&tokentype=1&msgcode=507&mid=${GLOBAL.merchantId}&merchantname=${GLOBAL.merchantName}`


            let request = {
                method: 'GET',
                headers: {
                    'payloadtype': 'json',
                    //'Authorization': 'Bearer ' + myToken, // won't works same error
                    //'Token': myToken, // won't works same error

                },
                //credentials: 'include',
            }

            fetch(commonHtml, request)
                .then((response) => response.json())
                .then((responseJson) => {


                    if (responseJson.status == "SUCCESS") {
                        mobitoken = responseJson.token
                        AsyncStorage.setItem('mobitoken', responseJson.token)

                        this.balanceCheck()
                    } else {

                    }


                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading();
                    alert('Unable to process your request Please try again after some time')

                });
        }


    }


    tokenregenerate = () =>{



        var mobile =  GLOBAL.mobiles;
        var merchantid = GLOBAL.merchantId;
        var merchantName= GLOBAL.merchantName;
        var secret = GLOBAL.tokenRegenerate;
        var amount = GLOBAL.myAmount;
        var tokentype = '1';
        var msgcode = '507'

//'cell''merchantname''mid''msgcode''token''tokentype'
        var msg = '\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\'507\'\''+mobitoken+'\'\'1\'';


        var hashs = sha256.hmac(secret, msg)



//https://walletapi.mobikwik.com/otpgenerate?checksum=abb25243ec1d608e10612c6dfa11e0e05a4591c4544acf18d604cd31ea23607d&cell=9910057241&amount=1&tokentype=1&msgcode=504&mid=MBK9006&merchantname=TestMerchant

        var commonHtml = `https://walletapi.mobikwik.com/tokenregenerate?checksum=${hashs}&cell=${mobile}&token=${mobitoken}&tokentype=1&msgcode=507&mid=${GLOBAL.merchantId}&merchantname=${GLOBAL.merchantName}`

        console.warn(commonHtml)

        let request = {
            method: 'GET',
            headers: {
                'payloadtype': 'json',
                //'Authorization': 'Bearer ' + myToken, // won't works same error
                //'Token': myToken, // won't works same error

            },
            //credentials: 'include',
        }

        fetch(commonHtml, request)
            .then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status = "SUCCESS"){
                    AsyncStorage.setItem('mobitoken', responseJson.token);
                }else{

                }


            })
            .catch((error) => {
                console.error(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });


    }

    _YesLogout=()=>{

        this.props.navigation.replace('TabNavigator')
    }








    _onFulfill(code){
        codes =  code
      // this.createwallet()
        this.buttonClickListener()
    }

    render() {
        let { phone,password } = this.state;
        if(this.state.loading){
            return(
                <View style={{flex: 1,  backgroundColor: 'black'}}>
                    <ActivityIndicator style = {{ position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        opacity: 0.5,
                        backgroundColor: 'black',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}

                                       size="large" color="#90BA45" />
                </View>
            )
        }
        return (

            <KeyboardAwareScrollView style = {{backgroundColor:'black',width : windowW ,height :windowH,flex:1}}>

                <View style = {{flexDirection :'row', marginTop :20}}>

                    <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
                        <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./back.png')}/>
                    </TouchableOpacity>
                    <Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
                        Mobile Verification
                    </Text>

                </View>
                <View style={{margin: 0,marginTop: 40}}>

                    <Text style = {{margin : 10 ,width : windowW - 20 ,color :'white' ,fontSize :28 ,fontFamily :'TypoGraphica'}}>
                        Verify your number
                    </Text>

                    <Text style = {{margin : 10 ,width : windowW - 40 ,color :'white' ,fontSize :22 ,fontWeight :'bold'}}>
                        Otp has been sent to your mobile number.
                    </Text>


                    <CodeInput
                        ref="codeInputRef1"
                        keyboardType="numeric"
                        secureTextEntry
                        className={'border-b'}
                        space={6}
                        codeLength = {6}
                        size={30}
                        inputPosition='center'
                        activeColor = 'white'
                        inactiveColor =  'white'
                        onFulfill={(code) => this._onFulfill(code)}
                    />


                </View>



            </KeyboardAwareScrollView>

        );
    }
}
