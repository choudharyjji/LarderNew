import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
var sha256 = require('js-sha256');
const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
var hash = ""
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class WalletList extends Component<Props> {

    static navigationOptions = {
        title: 'BoothList',
        header: null
    };
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
            count : "0",
            link : false,
        }

    }
    _keyExtractor = (item, index) => item.organisationID;

    resPress = (resId,index) => {

        GLOBAL.orderNumber = resId;
        this.props.navigation.navigate('OrderDetail')
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

        var commonHtml = `Order Num : ${item.orderNum}`;
        var commonHtml1 = `Rs :  ${item.totalPrice} `;
        var commonHtml2 = `Order Time ${item.payTime} `;

        return (
            <TouchableOpacity onPress={() =>  this.resPress(item.orderNum,item)}>
                <View style = {{height : 110 ,width : window.width ,flex :1 ,flexDirection :'row'}} >

                    <Image style={{marginLeft : 20 ,height : 60 ,marginTop :15 , width : 60,resizeMode :'contain'}}
                           source={require('./booth.png')}/>

                    <View style = {{margin : 10 ,flexDirection :'column'}}>
                        <Text style = {{margin :10 ,color :'white',fontFamily :'TypoGraphica' ,fontSize :14}}>
                            {commonHtml}
                        </Text>

                        <Text style = {{marginLeft :10 ,marginTop :2,color :'#90BA45',fontFamily :'TypoGraphica' ,fontSize :14}}>
                            {commonHtml1}
                        </Text>
                        <Text style = {{marginLeft :10 ,marginTop :2,color :'#90BA45' ,fontSize :14}}>
                            {commonHtml2}
                        </Text>


                    </View>

                </View>

            </TouchableOpacity>





        )
    }
    mobibuttonClickListener = ()=> {



        var mobile =  GLOBAL.mobiles;
        var merchantid = GLOBAL.merchantId;
        var merchantName= GLOBAL.merchantName;
        var secret = GLOBAL.secretKey;
        var amount = GLOBAL.myAmount;
        var tokentype = '1';


        var msg = '\''+amount+'\'\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\'504\''+'\'1\'';
        alert(msg)

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

    componentWillMount() {

        var mobile =  GLOBAL.mobiles
        var merchantid = GLOBAL.merchantId
        var merchantName= GLOBAL.merchantName
        var secret = GLOBAL.secretKey



        var msg = '\'existingusercheck\'\''+mobile+'\'\''+merchantName+'\'\''+merchantid+'\'\'500\''

        hash = sha256.hmac(secret, msg)





        var commonHtml = `https://walletapi.mobikwik.com/querywallet?checksum=${hash}&cell=${GLOBAL.mobiles}&msgcode=500&mid=${GLOBAL.merchantId}&merchantname=${GLOBAL.merchantName}&action=existingusercheck`
         console.log(commonHtml)
        alert(commonHtml)

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

           alert(JSON.stringify(responseJson))

                if (responseJson.status = "FAILURE"){
                    this.setState({link :true})
                }


            })
            .catch((error) => {
                console.error(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

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
                        Choose Wallet
                    </Text>



                </View>
                {this.state.link == true && (

                    <Button
                        containerStyle={{marginLeft :50,marginRight :50,position :'absolute',bottom:30,padding:15,width:width-100, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#90BA45'}}
                        disabledContainerStyle={{backgroundColor: 'white'}}
                        style={{fontSize: 14, color: 'white',fontWeight :'bold'}}
                        onPress={this.mobibuttonClickListener}>
                        LINK ACCOUNT
                    </Button>

                )}

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
