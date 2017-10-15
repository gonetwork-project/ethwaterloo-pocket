import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, StyleSheet, ActivityIndicator, Animated, TouchableHighlight, Easing, Image, AlertIOS } from 'react-native';


import TwoInputs from './common/TwoInputs';
import Header from './common/Header';

import { RedButton } from './common';
import { CardView } from 'react-native-credit-card-input';

import FingerprintScanner from 'react-native-fingerprint-scanner';

const PARENT = '0xf363f4cc8774191a4d9995f6dc569e004dd69b54';
const SPENDER = '0x98220a47723bdc89d322cd2003854318ef413f07';
const MERCHANT = '0x67ce8b67473bc77da1fd478ac9f1ca2d86704bf4';
const LAST_USER = '0xcae102b6a747c27d0d30464777436fcafeb7cd4f';
const DEBIT_CARD = '0x6ba581485f7f58a5d7413bd4d543e121b0655f4d';

class UserScene extends Component {

    constructor() {
        super()
        this.springValue = new Animated.Value(0.01)

        this.animatedValue1 = new Animated.Value(0)
        this.animatedValue2 = new Animated.Value(0)
        this.animatedValue3 = new Animated.Value(0)

        this.state = {
            paymentAuthenticated: false
        };

    }

    animate() {
        this.animatedValue1.setValue(0)
        this.animatedValue2.setValue(0)
        this.animatedValue3.setValue(0)
        const createAnimation = function (value, duration, easing, delay = 0) {
            return Animated.timing(
                value,
                {
                    toValue: 1,
                    duration,
                    easing,
                    delay
                }
            )
        }
        Animated.parallel([
            createAnimation(this.animatedValue1, 2000, Easing.ease),
            createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
            createAnimation(this.animatedValue3, 1000, Easing.ease, 2000)
        ]).start()
    }

    spring() {
        this.springValue.setValue(0.01)
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 3
            }
        ).start()
    }

    componentDidMount() {
        this.animate()
        var gg = this.props.onGetBalance;
        //this.props.merchantWatchPayment('0x98220a47723bdc89d322cd2003854318ef413f07');
        setTimeout(function () {
            gg(SPENDER);
        }, 1000);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.paymentStartFPScanner){
this.authenticatePayment();
nextProps.paymentStartFPScanner = false;

        }
    }

    renderLoadingView() {


        const scaleText = this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 2]
        })
        const spinText = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '720deg']
        })
        const introButton = this.animatedValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 400]
        })

        return (
            <View style={[{ flex: 1, paddingTop: 20 }]}>
                <View style={[{
                    flex: 0.05, paddingTop: 0, justifyContent: 'center',
                    alignItems: 'center',
                }]} />
                <View style={[{
                    flex: 0.4, paddingTop: 0, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Text style={[globalStyle.gloabalFontStyle_H2]}>
                        Payment Processing....
                             </Text>


                </View>
                <View style={[{
                    flex: 0.05, paddingTop: 0, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <ActivityIndicator
                        animating={true}
                        color='#bc2b78'
                        size="large"
                        style={[{ paddingTop: 20 }]}
                    />
                </View>
            </View>
        );
    }

    renderSuccessView() {
        return (
            <View style={[{ flex: 1, paddingTop: 20 }]}>
                <View style={[{
                    flex: 0.1, paddingTop: 0, justifyContent: 'center',
                    alignItems: 'center',
                }]}>

                </View>
                <View style={[{
                    flex: 0.3, paddingTop: 0, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Text style={[globalStyle.gloabalFontStyle_H2]}>
                        payment processed
              </Text>
                </View>

                <View style={[{
                    flex: 0.1, paddingTop: 10, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Animated.Image
                        style={{ width: 100, height: 100, transform: [{ scale: this.springValue }] }}
                        source={require('./checked.png')} />
                </View>

            </View>
        );
    }



    authenticatePayment() {
        //Based on results of this, take action.
        
        FingerprintScanner
            .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
            .then(() => {
                // this.props.handlePopupDismissed();
                // AlertIOS.alert('Authenticated successfully');
                this.setState({ paymentAuthenticated: true });
                this.props.onSpend( Math.abs(this.props.paymentAmount), this.props.paymentAddress);
                
            })
            .catch((error) => {
                // this.props.handlePopupDismissed();
                //  AlertIOS.alert(error.message);
                
                this.setState({ paymentAuthenticated: false });
                //TODO turn on discovery again
                
            });
    }


    renderRestView() {
        return (
            <View style={[{ flex: 1, paddingTop: 20 }]}>
                <View style={[{
                    flex: 0.1, paddingTop: 0, justifyContent: 'center',
                    alignItems: 'center',
                }]}>

                </View>
                <View style={[{
                    flex: 0.3, paddingTop: 0, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                     <RedButton
                     style={[{
                         width: 200
                     }]}
                     onPress={this.authenticatePayment.bind(this)}
                 >
                     Start Payment!
                  </RedButton>
                </View>

                <View style={[{
                    flex: 0.1, paddingTop: 10, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Animated.Image
                        style={{ width: 100, height: 100, transform: [{ scale: this.springValue }] }}
                        source={require('./checked.png')} />
                </View>

            </View>
        );
    }


  
    renderView() {
        if (this.state.paymentAuthenticated) {
            this.state.paymentAuthenticated = false;
            this.spring();
            return this.renderSuccessView();
        } else {
            return this.renderRestView();
           // return this.renderLoadingView();
        }
    }

    render() {
        const { container, bottomSpace, tosBox } = styles;
        return (
            <View style={[{ flex: 1, paddingTop: 20 }]}>
                <View style={[{ flex: 1.2, justifyContent: 'center', paddingBottom: 10 }]}>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H2]}>
                            Balance: {this.props.userBalance}
                        </Text>
                    </View>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H3]}>
                            Next Reward Time: {this.props.state.nextRewardTime}
                        </Text>
                    </View>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H3]} onPress={this.spring.bind(this)}>
                            Next Reward Total: {this.props.state.nextRewardTotal}
                        </Text>



                    </View>
                </View>
                <CardView />
                <View style={[{ flex: 8, backgroundColor: '#FFF6C2' }]}>
                    {this.renderView()}
                </View>
                <View style={[{ flex: 1, alignContent: 'flex-end', justifyContent: 'center', paddingBottom: 50, paddingTop: 5 }]}>
                    <View style={[{ flex: .5, alignSelf: 'center', justifyContent: 'center' }]}>

                    </View>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>

                    </View>
                </View>

            </View>
        );
    }
}

//https://docs.nativebase.io/Components.html#Components

const globalStyle = require('./common/GlobalStyleSheet');

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 15,
        paddingTop: 10
        //  height: 600,

    },
    bottomSpace: {
        flex: 6,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center', //--> x allign MUST USE WITH FLEX
        justifyContent: 'center',//--> y allign
        paddingTop: 20,
        paddingBottom: 20
    },
    tosBox: {
        flex: 0.5,
        paddingTop: 8,
        alignItems: 'center',//y
    }
};


var styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d35400',
    },

    spinner: {
        marginBottom: 50
    },

    btn: {
        marginTop: 20
    },

    text: {
        color: "white"
    }
});

export default UserScene;
