/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Author: Amit Shah
 */

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Button,
  DeviceEventEmitter
} from 'react-native';


import Discovery from 'react-native-discovery';
import WebViewBridge from 'react-native-webview-bridge';
import FingerprintPopup from './components/finger-print-popup';
import MainScene from './components/MainScene';

const PARENT = '0xf363f4cc8774191a4d9995f6dc569e004dd69b54';
const SPENDER = '0x98220a47723bdc89d322cd2003854318ef413f07';
const MERCHANT = '0x67ce8b67473bc77da1fd478ac9f1ca2d86704bf4';
const LAST_USER = '0xcae102b6a747c27d0d30464777436fcafeb7cd4f';
const DEBIT_CARD = '0x6ba581485f7f58a5d7413bd4d543e121b0655f4d';

function hex2a(hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';

  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

//return the dollar value from the E:123:efefjij format
function returnDollarValueFromData(ethInputString) {
  var theString = ethInputString.split(':')[1];//ethInputString.substr(3);
  return parseFloat(theString);
}

//return the dollar value from the ETH:123:efefjij format
function returnAddressFromData(UUIDstring, endString) {

  var mystring=UUIDstring.split('-').join('') + endString.split(':')[2];
  return mystring;
}


function address2UUID(hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';

  str += hex.substr(0, 8);
  str += '-';
  str += hex.substr(8, 4);
  str += '-';
  str += hex.substr(12, 4);
  str += '-';
  str += hex.substr(16, 4);
  str += '-';
  str += hex.substr(20, 12);

  console.log('address2UUID result: ' + str);
  return str;
}

function getLassChars(hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';

  str += hex.substr(32);

  console.log('getLass8Chars result: ' + str)
  return str;
}

function a2hex(str) {
  var arr = [];
  for (var i = 0, l = str.length; i < l; i++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex);
  }
  return arr.join('');
}



const injectScript = `
  (function () {
    //https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify


    const GET_ALL_ACCOUNTS = 0;
    const UNLOCK_ACCOUNT_SUCCESS = 1;
    const UNLOCK_ACCOUNT_FAIL = 2;
    const GET_BALANCE = 3;



    CallbackHandler=function(result){
        //marshall the data
        if(WebViewBridge){
          WebViewBridge.send(JSON.stringify(result));
        }
    }
    if (WebViewBridge) {

      WebViewBridge.onMessage = function(message){
          try{
            
            var execContext = JSON.parse(message);
            
            window[execContext["func"]].apply(null, execContext["args"]);
            //window[params[0]].apply(null,params.splice(1,params.length));
          }catch(e){
            
            CallbackHandler(e);
          }
      }
    }

  }());
`;

export const UI_PAGE_LOGIN_PAGE = 'UI_PAGE_LOGIN_PAGE';
wvb = null; //global web view bridge
const STATIC_UUID = "3E1180E5-222E-43E9-98B4-E6C0DD18E728";


export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      pageId: UI_PAGE_LOGIN_PAGE,
      userBalance: 0,
        merchantBalance:0,
              parentBalance:0,
              paymentStartFPScanner: false,
              paymentAddress: '',
              paymentAmount: 0
    };

    //onWatchPaymentMining(MERCHANT);
    //        this.setState({ textValue: this.props.connectedData.formInitialText });


    
    Discovery.initialize(STATIC_UUID, "spiffy");
    Discovery.setShouldDiscover(STATIC_UUID,true);


    // Listen for discovery changes
    DeviceEventEmitter.addListener(
      'discoveredUsers',
      (data) => {

        
        //if (data.uuid == STATIC_UUID) {

          if (!this.state.paymentStartFPScanner && data.didChange || data.usersChanged) { //slight callback discrepancy between the iOS and Android libraries
    //todo: filter username stars with E:

            for(var i=0; i < data.users.length; i++)
            {
            //   alert(JSON.stringify(data.users[i]) + 'returnDollarValueFromData result: ' + returnDollarValueFromData(data.users[i].username)
            // + 'Address result: ' + returnAddressFromData(data.users[i].peripheralId, data.users[i].username));

            //   console.log('returnDollarValueFromData result: ' + returnDollarValueFromData(data.users[i].username));

            if(data.users[i].username.match(/^E:.*/)){
                var ma = data.users[i].username.match(/^E:(\d+):(.*)/);

                if(ma && ma.length > 0){
                  debugger;
                  //alert("+ADDRESS:"+returnAddressFromData(data.users[i].peripheralId, data.users[i].username));
                  alert("-AMOUNT:"+ returnDollarValueFromData(data.users[i].username));
                  Discovery.setShouldDiscover(STATIC_UUID,false);

                //  alert("TODO: render FingerPrintScanner:" + ma[1] + "->" + a2hex(ma[2]) + "->" +JSON.stringify(data.users[i]));


                  this.setState({paymentStartFPScanner:true})
                  this.setState({paymentAddress:'0x'+returnAddressFromData(data.users[i].peripheralId, data.users[i].username)})
                   this.setState({paymentAmount:returnDollarValueFromData(data.users[i].username)})
                  break;
                }
            }
          }
        //}
      }
      }
    );

    // Listen for bluetooth state changes
    DeviceEventEmitter.addListener(
      'bleStateChanged',
      (event) => {
        console.log('BLE is On: ' + event.isOn)
      }
    );

  }


  //THIS IS THE STATE_HANDLER FOR JS CALLS
  //PUT ALL STATE UPDATES HERE
  onBridgeMessage(message) {
    try{
      if (this.refs['webviewbridge'] !== null) {
        //unmarshall the data
        alert(message);

        var data = JSON.parse(message);
        //alert(JSON.stringify(data));
        //check if the web3.html context generated an error
        //alert("IN NATIVE LAND:"+JSON.stringify(data));
        if(data.hasOwnProperty("type")){
          switch(data["type"]){
            case "GET_ACCOUNTS":
              alert(data["value"]);
              break;
            case "UNLOCK_ACCOUNT":
              alert(data["value"]);
              //{type:"UNLOCK_ACCOUNT","value":result,"func":arguments.callee.name}
              //this.setState({data["value"]});
              break;
            case "ADDRESS_BALANCE":
              //{type:"ADDRESS_BALANCE", value:{"address":address,balance:balance,"func":arguments.callee.name} }
              alert(data["value"]["balance"]);
              this.setState({userBalance:data["value"]["balance"]})
               this.setState({merchantBalance:data["value"]["balance"]})
                this.setState({parentBalance:data["value"]["balance"]})
              break;
            case "CARD_BALANCE":
              //{type:"CARD_BALANCE",value:result,"func":arguments.callee.name}
              alert(data["value"]);
              break;
            case "CREATE_CARD":
              //{type:"CREATE_CARD",value:instance.address,"func":arguments.callee.name}
              alert(data["value"]);
              break;
            case "FUND":
              //{"type":"FUND", "value":{"fund":fund, "newBalance":val},"func":arguments.callee.name}
              alert(data["value"]["fund"]);
              break;
            case "WITHDRAW":
              //{"type":"WITHRDRAW","value":{"newBalance":newBalance},"func":arguments.callee.name}
              alert(data["value"]["newBalance"]);
              break;
            case "PENDING_WITHDRAWAL":
              //{type:"PENDING_WITHDRAWAL",
              //value:{"amount":amount, "debitAddress":debitAddress},"func":arguments.callee.name}
              alert(JSON.stringify(data));
              break;
            case "SPENDER_SET":
              //{type:"SPENDER_SET","value":true,"func":arguments.callee.name}
              alert(data["value"]);
              break;
            case "SPEND":
              debugger
              this.setState({paymentStartFPScanner:false});
              Discovery.setShouldDiscover(STATIC_UUID,true);

              //TODO Cai remove checkmark from USER scene


              //{"type":"SPEND",
            //value:merchant + " has a pending withdrawl of: "+JSON.stringify(v)
          //"func":arguments.callee.name}

              alert(JSON.stringify(data));
              break;
            case "WITHRDRAW_PENDING_FILTER":
              //value bool was able to set filter
              alert("SETUP FILTER:"+data["value"]);
              break;
            case "WITHRDRAW_PENDING":
              //TODO cai show modal with withdraw button for merchantscene
              //use below params to set the onlick of the button

              // {"type":"WITHRDRAW_PENDING",
              // value:{
              //   "amount":parseInt(params[0]+params[3]),
              //   from: params[0]+params[1],
              //   debitAddress: data.address
              // },
              // "func":arguments.callee.name}
              alert(JSON.stringify(data["value"]));
              break;
            default:
              break;
          }
        }
      }
    }catch(err){
      alert("ERROR IN SWITCH"+err);
    }
  }



  onButtonPress() {
    this.onWatchPaymentMining(MERCHANT);
  }

  onUnlockAccount(address,password) {
    var args = {"func":'UnlockAccount', "args":[address,password]};
    wvb.sendToBridge(JSON.stringify(args));
  }

  onGetBalance(address) {

    var args = {"func":"GetBalance", "args":[address]};
    wvb.sendToBridge(JSON.stringify(args));
  }

  //Check the card balance
  onGetCardBalance(cardAddress){
   var args = {"func":'GetCardBalance', "args":[cardAddress]};
   wvb.sendToBridge(JSON.stringify(args));
  }

  onGetAccounts(){
      var args = JSON.stringify({"func":'GetAccounts', "args":[]});
      wvb.sendToBridge(args);
  }

  onWatchPaymentMining(address){
    var args = {"func":"WatchPaymentMining", "args":[address]};
    wvb.sendToBridge(JSON.stringify(args));
  }

  onSpend(amount,merchant){
    var args = {"func":"Spend", "args":[SPENDER,merchant,DEBIT_CARD,amount]};
    alert(JSON.stringify(args));
    wvb.sendToBridge(JSON.stringify(args));
  }

  testOnSpend(){
    this.onSpend(200,MERCHANT);
  }


  //NOTE:when rendering UIView on android
  //you may have to eff ish up
  //https://github.com/facebook/react-native/issues/505


  merchantCheckout(address, amount) {
    //TODO
    debugger
    address = MERCHANT.substr(2);
    
    
    //parseInt(amount,)
    //https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    var hex = amount.toString(16);
    //var myUUID = "3E1180E5-222E-43E9-98B4-E6C0DD18E728" + "ssdsd";
    

    ////
    var text = '';
    var possible = "0123456789";
    for (var i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));


    //Max: 3AA5FA4FBF18d19548680a5f2BbA0
    // var broadcast = "3AA5FA4FBF18d19548680a5f2BbA0 61b18Fed26b";//+ hex2a("") + ":" + Math.random().toString(16);//"ETHlllll"+ hex2a(address);

    //var addressTest = "3E1180E5-222E-43E9-98B4-E6C0DD18" + text;

    var myUUID = address2UUID(address)
    lastChars = getLassChars(address)
    var broadcast = "E:"+amount+":" + lastChars;

    //var broadcast = "E:34:"+hex2a("3AA5FA4FBF18d19548680a5f2BbA061b18Fed26b")


    Discovery.initialize(
      myUUID,
      broadcast//SpacemanSpiff"
    );
  
    Discovery.setShouldAdvertise(myUUID, true);

    // Discovery.setShouldAdvertise(myUUID,false);
    setTimeout(function () {
      Discovery.setShouldAdvertise(myUUID, false);

    }, 7000);
  }

  render() {
   if (this.state.pageId === UI_PAGE_LOGIN_PAGE) {
      return (
        <View style={[{ flex: 1 }]}>
          <View style={[{ flex: .01, height: 0 }]}>
            <WebViewBridge
              ref={(ref) => {this.webviewbridge = ref; wvb = ref;}}
              onBridgeMessage={(m) => this.onBridgeMessage(m)}
              javaScriptEnabled={true}
              injectedJavaScript={injectScript}
              source={() =>
                Platform.OS === 'ios' ? require('./web3.html') :
                  { uri: 'file:///android_asset/path-to/the-linked-file.html' }}
              source={require('./web3.html')}
              style={styles.webview} />
          </View>
          <View style={[{ flex: 1 }]}>

            <MainScene
              // buttonAction={this.test.bind(this)}
              number={10}
              text="Test"
              unlockAccount={()=>this.onUnlockAccount(PARENT,"testpass")}
              userBalance={this.state.userBalance}
              merchantCheckout={this.merchantCheckout.bind(this)}
              onGetBalance={this.onGetBalance.bind(this)}
              merchantBalance={this.state.merchantBalance}
              parentBalance={this.state.parentBalance}
              onSpend={this.onSpend.bind(this)}
              onWatchPaymentMining={this.onWatchPaymentMining.bind(this)}
             

              paymentStartFPScanner={this.state.paymentStartFPScanner}
              paymentAddress={this.state.paymentAddress}
              paymentAmount={this.state.paymentAmount}
              //onWatchPaymentMining ={this.onWatchPaymentMining(MERCHANT)};
             // onGetBalance={(p)=>this.onGetBalance.bind(this)}
            />
          </View>
          <Button
            onPress={() => this.onGetAccounts()}
            title="Get Accounts"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => this.onButtonPress()}
            title="Get Balance"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => this.testOnSpend()}
            title="Get Balance"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

        </View>

      )
    }

    return (

      <View style={styles.container}>

        <WebViewBridge
          ref={(ref) => this.webviewbridge = ref}
          onBridgeMessage={(m)=>this.onBridgeMessage(m)}
          javaScriptEnabled={true}
          injectedJavaScript={injectScript}
          source={() =>
            Platform.OS === 'ios' ? require('./web3.html') :
              { uri: 'file:///android_asset/path-to/the-linked-file.html' }}
          source={require('./web3.html')}
          style={styles.webview} />


        <FingerprintPopup

          handlePopupDismissed={() => console.log('dissmissed')} />



        <Text style={styles.welcome}>
          Welcome to ETHWaterloo!
        </Text>
        <Text style={styles.instructions}>
          Send me Yourz Money
        </Text>
        <Button
          onPress={() => this.onUnlockPress(()=>alert("done"))}
          title="Unlock Account"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  webview: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
    flex: 1
  },
  creditcard: {
    marginTop: 20
  }

});
