import React, {Component} from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    StatusBar,
    Text,
    Alert,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter, NativeModules, NativeEventEmitter
} from 'react-native';
const window = Dimensions.get('window');
var sha256 = require('js-sha256');
var restMobi="";
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
var mobitoken = "";
var currentbalanceamount = "";
var randomString = require('random-string');
import paytm from '@philly25/react-native-paytm';
const equalWidth =  (width -20 )
var checkmobiBalance ;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const paytmConfig = {
    MID: 'sNwQaA02291866118514',
    WEBSITE: 'DEFAULT',
    CHANNEL_ID: 'WAP',
    INDUSTRY_TYPE_ID: 'Retail',
    CALLBACK_URL: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID='
};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RazorpayCheckout from "react-native-razorpay";
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class Payment extends Component<Props> {


    resPress = (resId,index) => {
        GLOBAL.productid =  resId;
        this.props.navigation.navigate('Detail')
    }
    constructor(props) {
        super(props)
        this.state = {
            moviesList: [],
            eventLists :[],
            brandLists: [],
            moviesLists: [],
            beer: [],
            link :false,
            count : "0",
            isPaytm : false,
            ismobikwik :false,
            iscard : false,
            isnetbanking :false,
            mobitext :'',
            selectMobi:0
        }

    }
    _keyExtractor = (item, index) => item.organisationID;

    resPress = (resId,index) => {
        GLOBAL.productid =  resId;

    }


    componentWillUnmount() {
        if (Platform.OS === 'ios') {
            this.emitter.removeListener('PayTMResponse', this.onPayTmResponse);
        } else {
            DeviceEventEmitter.removeListener('PayTMResponse', this.onPayTmResponse);
        }
    }
    onPayTmResponse = (resp) => {
        const {STATUS, status, response} = resp;
        console.log(response)
        if (Platform.OS === 'ios') {
            this.setState({out:response})

            const jsonResponse = JSON.parse(response);
            const {STATUS} = jsonResponse;
            if (jsonResponse.STATUS == 'TXN_SUCCESS') {
                alert ('Your Transaction has been Sucessfully')
                this.props.navigation.goBack()
               // this.myPayments(jsonResponse.TXNAMOUNT,'SUCCESS',jsonResponse.TXNID)
            } else if (jsonResponse.STATUS  == 'PENDING'){
              //  this.myPayments(jsonResponse.TXNAMOUNT,'PENDING',jsonResponse.TXNID)
                alert ('Your Transaction is pending')
            }
            else if (jsonResponse.STATUS  == 'TXN_FAILURE'){
              //  this.myPayments(jsonResponse.TXNAMOUNT,'FAILURE',jsonResponse.TXNID)
                alert ('Your Transaction has failed')
            }



        } else {
            if (STATUS && STATUS === 'TXN_SUCCESS') {
                // Payment succeed!
            }
        }
    };

    runTransaction(amount, customerId, orderId, mobile, email, checkSum) {
        const callbackUrl = `${paytmConfig.CALLBACK_URL}${orderId}`;
        const details = {
            mode: 'Production', // 'Staging' or 'Production'
            MID: paytmConfig.MID,
            INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
            WEBSITE: paytmConfig.WEBSITE,
            CHANNEL_ID: paytmConfig.CHANNEL_ID,
            TXN_AMOUNT: restMobi, // String
            ORDER_ID: orderId, // String
            CUST_ID: GLOBAL.userID, // String
            CHECKSUMHASH: checkSum, //From your server using PayTM Checksum Utility
            CALLBACK_URL: callbackUrl,
        };

        paytm.startPayment(details);
    }

    blog = () =>{

        // isPaytm : false,
        //             ismobikwik :false,
        //             iscard : false,
        //             isnetbanking :false,

        if (this.state.isPaytm == false && this.state.ismobikwik == false  && this.state.iscard == false  && this.state.isnetbanking == false){
            alert('Please select any option for payment')
        }else {
            if (this.state.iscard == true || this.state.isnetbanking == true ){
                var s = parseInt(restMobi)
                if  (s == 0){
                    alert('Please add Money to Continue.')
                    return
                }
                var b = s * 100;
//  key: 'rzp_live_j6WtEd1MKTdcih',
//rzp_test_OUUAHX0igTnqWj
                var options = {
                    description: 'Larder',
                    image: require('./booth.png'),
                    currency: 'INR',
                    key: 'rzp_live_j6WtEd1MKTdcih',
                    amount: b.toString(),

                    name: GLOBAL.username,
                    prefill: {
                        email: GLOBAL.email,
                        contact: GLOBAL.mobile,
                        name: GLOBAL.username
                    },
                    theme: {color: '#000000'}
                }
                RazorpayCheckout.open(options).then((data) => {

                    //   this.myPayments(s,'SUCCESS','Rajor')
                 //   var a = data.razorpay_payment_id
                    //this.capture(a,b);
//mymy
                   // this.mymy(s,'SUCCESS','Rajor',a.toString())
                }).catch((error) => {
                    // handle failure
                   // this.myPayments(s,error.description,'')

                });
                RazorpayCheckout.onExternalWalletSelection(data => {



                });
            } else if (this.state.isPaytm  == true){
                var dd = parseInt(restMobi)
                if  (dd == 0){
                    alert('Please add Money to Continue.')
                    return
                }


                var x = randomString({
                    length: 10,
                    numeric: true,
                    letters: false,
                    special: false,

                });
                var commonHtml = `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${x}`;


                const url = 'http://139.59.76.223/larder/paytm/generateChecksum.php'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MID: "sNwQaA02291866118514",
                        ORDER_ID: x,
                        INDUSTRY_TYPE_ID: "Retail",
                        CHANNEL_ID: "WAP",
                        TXN_AMOUNT: restMobi,
                        WEBSITE: "DEFAULT",
                        CUST_ID: GLOBAL.userID,
                        CALLBACK_URL: commonHtml,


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        const callbackUrl = commonHtml;
                        // alert(JSON.stringify(responseJson))
                        this.runTransaction('199', '1', x, '9896904632', "varun.singhal78@gmail.com", responseJson.CHECKSUMHASH)


                    })
                    .catch((error) => {
                        alert(error);
                        this.hideLoading();
                        alert('Unable to process your request Please try again after some time')

                    });
            } else if (this.state.ismobikwik == true ){
                var value =  AsyncStorage.getItem('mobitoken');
                value.then((e)=>{
                    if (e == '' || e == null ){
                        this.props.navigation.navigate('WalletList')

                        // this.props.navigation.navigate('Slider')
                    }else {


                        if (checkmobiBalance == 0){
                           this.debitBalance()
                        } else {
                            this.addBalance()
                        }
                        // mobitoken = e
                        // alert(mobitoken)
                        // var x = randomString({
                        //     length: 10,
                        //     numeric: true,
                        //     letters: false,
                        //     special: false,
                        //
                        // });
                        // GLOBAL.mobiorderid = x;
                        // alert(x)
                        // this.balanceCheck()
                    }
            })
            }
        }
    }



    onbackbalanceCheck = () =>{

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


                if (responseJson.status == "SUCCESS"){
                    currentbalanceamount =  responseJson.balanceamount
                    checkmobiBalance = 0 ;
                    // GLOBAL.myAmount = currentbalanceamount
                    //
                    // var commonHtml = `Pay Rs. ${currentbalanceamount} `;
                    // this.setState({mobitext :commonHtml})

                    // alert(currentbalanceamount)



                }else{
                    alert('Invalid')
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

                    if (responseJson.status == "SUCCESS"){
                        currentbalanceamount =  responseJson.balanceamount
                       // alert(currentbalanceamount)
                        var cbalabnce = parseInt(currentbalanceamount)
                        var recbalance = parseInt(GLOBAL.myAmount)
                        if (cbalabnce >= recbalance){
                         //   this.debitBalance()
                            checkmobiBalance = 0 ;
                            var commonHtml = `Pay Rs. ${recbalance} `;
                            this.setState({mobitext :commonHtml})
                        }else {

                            var amount = recbalance - cbalabnce
                            GLOBAL.myAmount = amount.toString()

                            var commonHtml = `Add Rs. ${amount} to Mobikwik Wallet `;
                            this.setState({mobitext :commonHtml})
                            checkmobiBalance = 1 ;
                       //     this.addBalance()
                        }


                    }else{
                      //  alert('Account Not Associated With this Number and Email Not Exist')
                        this.setState({link:true})
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



                    this.showLoading();
                    const url = 'http://139.59.76.223/larder/webservice/add_wallet'

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userID: GLOBAL.userID,
                            amount :GLOBAL.myAmount,
                            txnID :responseJson.orderid,
                            transaction_status :responseJson.status,
                            payment_type :'Mobikwik'



                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            this.hideLoading();

                       this.props.navigation.goBack()




                        })
                        .catch((error) => {
                            console.error(error);
                            this.hideLoading();
                            alert('Unable to process your request Please try again after some time')

                        });

                    // alert(JSON.stringify(responseJson))
                    this.tokenregenerate()


                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading();
                    alert('Unable to process your request Please try again after some time')

                });
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
                <View style = {{margin : 10,width : width - 20 ,height : 150 ,flex :1,flexDirection :'row'}}>

                    <Image
                        style={{ width:150, height: 150}}
                        source={{ uri: item.blog_image }}
                    />

                    <View style = {{flexDirection :'column', width : width-170}}>
                        <Text style = {{margin :5 ,color :'white',fontSize:13,fontWeight :'bold'}}>
                            {item.blog_date}
                        </Text>
                        <Text style = {{margin :5 ,color :'white',fontSize:15,fontWeight :'bold'}}
                              numberOfLines = {5}>
                            {item.description}
                        </Text>
                        <Button
                            containerStyle={{marginTop :1,padding:8, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
                            disabledContainerStyle={{backgroundColor: 'grey'}}
                            style={{fontSize: 13, color: 'white',fontWeight:'bold'}}
                            onPress= {()=> this.blog(item)}>
                            CONTINUE READING
                        </Button>

                    </View>
                </View>

            </TouchableOpacity>





        )
    }

    getMoviesFromApiAsync = () => {
        this.showLoading();
        const url = 'http://139.59.76.223/larder/webservice/blogs'

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


                this.setState({ moviesList: responseJson[0].blogs})



            })
            .catch((error) => {
                console.error(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });
    }

    componentWillMount() {
        restMobi=GLOBAL.myAmount;
        checkmobiBalance = 0;

        if (Platform.OS === 'ios') {
            const { RNPayTm } = NativeModules;

            this.emitter = new NativeEventEmitter(RNPayTm);
            this.emitter.addListener('PayTMResponse', this.onPayTmResponse);
        } else {
            DeviceEventEmitter.addListener('PayTMResponse', this.onPayTmResponse);
        }
    }

    componentDidMount() {

        this.props.navigation.addListener('willFocus',this._handleStateChange);
    }
    _handleStateChange = state => {
        var commonHtml = `Pay Rs. ${GLOBAL.myAmount} `;
        this.setState({mobitext :commonHtml})
    if (this.state.ismobikwik == true) {

        var value =  AsyncStorage.getItem('mobitoken');
        value.then((e)=> {
            if (e == '' || e == null) {

            } else {
                mobitoken = e
                this.setState({link : false})
                var commonHtml = `Pay Rs. ${GLOBAL.myAmount} `;
                this.setState({mobitext :commonHtml})

                GLOBAL.myAmount = restMobi
                this.backmobikwikcheck()
            }
        })


    }
       // this.getMoviesFromApiAsync()
    };
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: window.width, height: 150 }} source={{ uri: image }} />
            </View>
        );
    }
    mobibuttonClickListener = ()=> {



        var mobile =  GLOBAL.mobiles;
        var merchantid = GLOBAL.merchantId;
        var merchantName= GLOBAL.merchantName;
        var secret = GLOBAL.secretKey;
        var amount = GLOBAL.myAmount;
        var tokentype = '1';


        var msg = '\''+amount+'\'\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\'504\''+'\'1\'';


        var hashs = sha256.hmac(secret, msg)



//https://walletapi.mobikwik.com/otpgenerate?checksum=abb25243ec1d608e10612c6dfa11e0e05a4591c4544acf18d604cd31ea23607d&cell=9910057241&amount=1&tokentype=1&msgcode=504&mid=MBK9006&merchantname=TestMerchant

        var commonHtml = `https://walletapi.mobikwik.com/otpgenerate?checksum=${hashs}&cell=${GLOBAL.mobiles}&amount=${GLOBAL.myAmount}&tokentype=1&msgcode=504&mid=${GLOBAL.merchantId}&merchantname=${GLOBAL.merchantName}`



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
                    this.props.navigation.navigate('MobikwikOtp')

                }else{

                }


            })
            .catch((error) => {
                console.error(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });





        //
    }



    backmobikwikcheck = () => {
        this.setState({ismobikwik :true})
        this.setState({iscard :false})
        this.setState({isnetbanking :false})
        this.setState({isPaytm :false})
        var value =  AsyncStorage.getItem('mobitoken');
        value.then((e)=> {
            if (e == '' || e == null) {


                var mobile =  GLOBAL.mobiles
                var merchantid = GLOBAL.merchantId
                var merchantName= GLOBAL.merchantName
                var secret = GLOBAL.secretKey



                var msg = '\'existingusercheck\'\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\'500\''

                var  hash = sha256.hmac(secret, msg)





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
                            this.setState({link :true})
                        }else {
                            //  this.mobibuttonClickListener()
                            this.setState({link :true})
                        }


                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading();
                        alert('Unable to process your request Please try again after some time')

                    });


                // this.props.navigation.navigate('WalletList')

                // this.props.navigation.navigate('Slider')
            } else {
                mobitoken = e


            }
            var x = randomString({
                length: 10,
                numeric: true,
                letters: false,
                special: false,

            });
            GLOBAL.mobiorderid = x;
            // alert(mobitoken)
            this.balanceCheck()
        })
    }


    mobikwikcheck = () => {
        this.setState({ismobikwik :!this.state.ismobikwik})
        this.setState({iscard :false})
        this.setState({isnetbanking :false})
        this.setState({isPaytm :false})
        var value =  AsyncStorage.getItem('mobitoken');
        value.then((e)=> {
            if (e == '' || e == null) {


                var mobile =  GLOBAL.mobiles
                var merchantid = GLOBAL.merchantId
                var merchantName= GLOBAL.merchantName
                var secret = GLOBAL.secretKey



                var msg = '\'existingusercheck\'\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\'500\''

              var  hash = sha256.hmac(secret, msg)





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
                            this.setState({link :true})
                        }else {
                          //  this.mobibuttonClickListener()
                            this.setState({link :true})
                        }


                    })
                    .catch((error) => {
                        console.error(error);
                        this.hideLoading();
                        alert('Unable to process your request Please try again after some time')

                    });


               // this.props.navigation.navigate('WalletList')

                // this.props.navigation.navigate('Slider')
            } else {
                mobitoken = e


            }
            var x = randomString({
                length: 10,
                numeric: true,
                letters: false,
                special: false,

            });
            GLOBAL.mobiorderid = x;
           // alert(mobitoken)
            this.balanceCheck()
        })
    }


    netbankingcheck = () => {
        var s = parseInt(restMobi)
        var commonHtml = `Pay Rs. ${restMobi} `;
        this.setState({mobitext :commonHtml})
        this.setState({ismobikwik :false})
        this.setState({iscard :false})
        this.setState({isnetbanking :!this.state.isnetbanking})
        this.setState({isPaytm :false})
        this.setState({link :false})
    }


    cardCheck = () => {
        var s = parseInt(restMobi)
        var commonHtml = `Pay Rs. ${restMobi} `;
        this.setState({mobitext :commonHtml})
        this.setState({ismobikwik :false})
        this.setState({iscard :!this.state.iscard})
        this.setState({isnetbanking :false})
        this.setState({isPaytm :false})
        this.setState({link :false})
    }
    paytmCheck = () =>{

        var s = parseInt(restMobi)
        var commonHtml = `Pay Rs. ${restMobi} `;

        this.setState({mobitext :commonHtml})
        // ismobikwik :false,
        //     iscard : false,
        //     isnetbanking :false,
        this.setState({link :false})
        this.setState({ismobikwik :false})
        this.setState({iscard :false})
        this.setState({isnetbanking :false})
        this.setState({isPaytm :!this.state.isPaytm})
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
                       Payment Options
                    </Text>




                </View>
                <Text style = {{width :width - 20 ,height :40 ,color :'white',fontSize : 16,alignSelf :'center',padding :10,marginLeft : 10, marginTop :19 ,backgroundColor :"#90ba45" }}>
                  Choose Wallet
                </Text>
                <TouchableOpacity onPress={() =>  this.paytmCheck()}>
                <View style = {{flexDirection :'row',width :width - 20,marginLeft : 10, marginTop :10}}>

                    {this.state.isPaytm == false && (
                        <Image style={{marginLeft : 0 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./white.png')}/>
                    )}

                    {this.state.isPaytm == true && (
                        <Image style={{marginLeft : 0 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./green.png')}/>
                    )}
                    <Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
                        Pay Via Paytm
                    </Text>
                    <Image style={{marginLeft : 10 ,height : 20 ,marginTop :18 , width : 60,resizeMode :'contain'}}
                           source={require('./paytm.png')}/>

                </View>
                <View style = {{flexDirection :'row',width :width - 20,marginLeft : 10, marginTop :10 ,backgroundColor :'white',height:1}}>
                </View>

                </TouchableOpacity>




                <TouchableOpacity onPress={() =>  this.mobikwikcheck()}>
                <View style = {{flexDirection :'row',width :width - 20,marginLeft : 10, marginTop :10}}>
                    {this.state.ismobikwik == false && (
                        <Image style={{marginLeft : 0 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./white.png')}/>
                    )}

                    {this.state.ismobikwik == true && (
                        <Image style={{marginLeft : 0 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./green.png')}/>
                    )}
                    <Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
                        Pay Via MobikWik
                    </Text>
                    <Image style={{marginLeft : 10 ,height : 20 ,marginTop :18 , width : 60,resizeMode :'contain'}}
                           source={require('./mobi.png')}/>
                </View>
                </TouchableOpacity>

                <Text style = {{width :width - 20 ,height :40 ,color :'white',fontSize : 16,alignSelf :'center',padding :10,marginLeft : 10, marginTop :19 ,backgroundColor :"#90ba45" }}>
                   Other
                </Text>
                <TouchableOpacity onPress={() =>  this.cardCheck()}>
                <View style = {{flexDirection :'row',width :width - 20,marginLeft : 10, marginTop :10}}>
                    {this.state.iscard == false && (
                        <Image style={{marginLeft : 0 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./white.png')}/>
                    )}

                    {this.state.iscard == true && (
                        <Image style={{marginLeft : 0 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./green.png')}/>
                    )}

                    <Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
                        Pay Via Credit/Debit Card
                    </Text>
                    <Image style={{marginLeft : 10 ,height : 20 ,marginTop :18 , width : 60,resizeMode :'contain'}}
                           source={require('./card.png')}/>
                </View>
                <View style = {{flexDirection :'row',width :width - 20,marginLeft : 10, marginTop :10 ,backgroundColor :'white',height:1}}>
                </View>
                </TouchableOpacity>



                <TouchableOpacity onPress={() =>  this.netbankingcheck()}>
                <View style = {{flexDirection :'row',width :width - 20,marginLeft : 10, marginTop :10}}>
                    {this.state.isnetbanking == false && (
                        <Image style={{marginLeft : 0 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./white.png')}/>
                    )}

                    {this.state.isnetbanking == true && (
                        <Image style={{marginLeft : 0 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
                               source={require('./green.png')}/>
                    )}

                    <Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
                        Pay Via NetBanking
                    </Text>
                    <Image style={{marginLeft : 10 ,height : 25 ,marginTop :18 , width : 25,resizeMode :'contain'}}
                           source={require('./net.png')}/>
                </View>


                </TouchableOpacity>




                {this.state.link == true && (
                    <Button
                        containerStyle={{marginLeft :0,width :width,marginRight :0,position :'absolute',bottom :0,padding:15, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#90BA45'}}
                        disabledContainerStyle={{backgroundColor: 'white'}}
                        style={{fontSize: 14, color: 'white',fontWeight :'bold'}}

                        onPress= {()=> this.mobibuttonClickListener()}>

                        LINK ACCOUNT
                    </Button>
                )}
                {this.state.link == false && (
                    <Button
                        containerStyle={{marginLeft :0,width :width,marginRight :0,position :'absolute',bottom :0,padding:15, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#90BA45'}}
                        disabledContainerStyle={{backgroundColor: 'white'}}
                        style={{fontSize: 14, color: 'white',fontWeight :'bold'}}

                        onPress= {()=> this.blog()}>


                        {this.state.mobitext}
                    </Button>
                )}

            </View>






            //         <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
            //  <View style={styles.content}>
            //  <View style = {{width :width , height : 60 ,backgroundColor :'black',flexDirection :'column'}}>
            //  <Text stle = {{fontSize : 20 ,fontFamily :'graphica',width : width ,height : 30 ,marginTop : 20 ,color :'white' }}>
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
