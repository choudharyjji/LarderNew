import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,WebView,StatusBar, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');

import VideoPlayer from 'react-native-video-controls';
const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class Kyc extends Component<Props> {

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

    getMoviesFromApiAsync = () => {
        this.showLoading();

        const url = 'http://139.59.76.223/larder/webservice/order_history'

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

                if (responseJson[0].result == "success"){
                    this.setState({ moviesList: responseJson[0].orders})
                } else {
                    alert('No Order Found')
                }



            })
            .catch((error) => {
                console.error(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });


    }

    componentWillMount() {

    }
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: window.width, height: 150 }} source={{ uri: image }} />
            </View>
        );
    }


    onNavigationStateChange = (data) => {
        const { url } = data;


        if (url == GLOBAL.redirecturl){
            this.props.navigation.goBack()
        }
       // this.setState({ currentUrl: url })

        // !If you have other redirect urls when navigating you might want
        // to trigger the above setState only if the url is NOT a redirection one,
        // so you don't force a re-render for redirection urls!
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

                    </Text>

                </View>
                <WebView  style = {{width :width ,height :height}}

                    source={{ uri: GLOBAL.html}}

                          onNavigationStateChange={this.onNavigationStateChange}
                />
            </View>




            //         <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
            //  <View style={styles.content}>
            //  <View style = {{width :width , height : 60 ,backgroundColor :'black',flexDirection :'column'}}>
            //  <Text stle = {{fontSize : 20 ,fontFamily :'TypoGraphica',width : width ,height : 30 ,marginTop : 20 ,color :'white' }}>
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
