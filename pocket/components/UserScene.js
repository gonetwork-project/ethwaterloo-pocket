import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, StyleSheet, ActivityIndicator,Animated,TouchableHighlight,Easing,Image } from 'react-native';


import TwoInputs from './common/TwoInputs';
import Header from './common/Header';

import { RedButton } from './common';

class UserScene extends Component {

    constructor () {
        super()
        this.springValue = new Animated.Value(0.01)

        this.animatedValue1 = new Animated.Value(0)
        this.animatedValue2 = new Animated.Value(0)
        this.animatedValue3 = new Animated.Value(0)
      }

      animate () {
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

    spring () {
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
    }
    renderLoadingView(){
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
            <View style={[{ flex: 1, paddingTop: 20}]}>
            <View style={[{ flex: 0.05, paddingTop: 0, justifyContent: 'center',
    alignItems: 'center',}]}/>
            <View style={[{ flex: 0.4, paddingTop: 0, justifyContent: 'center',
    alignItems: 'center',}]}>
              <Text style={[globalStyle.gloabalFontStyle_H2]}>
                            Payment Processing.... 
                             </Text>     
                   
                                
               </View>
               <View style={[{ flex: 0.05, paddingTop: 0, justifyContent: 'center',
    alignItems: 'center',}]}>
                <ActivityIndicator
               animating = {true}
               color = '#bc2b78'
               size = "large"
               style={[{ paddingTop: 20}]}
               /> 
                </View>
            </View>
            );
    }

    renderSuccessView(){
        return (
            <View style={[{ flex: 1, paddingTop: 20}]}>
            <View style={[{ flex: 0.1, paddingTop: 0, justifyContent: 'center',
    alignItems: 'center',}]}>

    </View>
            <View style={[{ flex: 0.3, paddingTop: 0, justifyContent: 'center',
    alignItems: 'center',}]}>
              <Text style={[globalStyle.gloabalFontStyle_H2]}>
              payment processed
              </Text>  
            </View>

    <View style={[{ flex: 0.1, paddingTop: 10, justifyContent: 'center',
    alignItems: 'center',}]}>
        <Animated.Image
      style={{width: 100, height: 100, transform: [{scale: this.springValue}] }}
      source={require('./checked.png')}/>  
    </View>

            </View>
            );
    }

    
    render() {
        const { container, bottomSpace, tosBox } = styles;
        return (
            <View style={[{ flex: 1, paddingTop: 20}]}>
                <View style={[{ flex: 1.2, justifyContent: 'center',  paddingBottom: 10 }]}>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H2]}>
                            Balance: {this.props.state.userBalance}
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
                <View style={[{ flex: 8, backgroundColor: 'grey' }]}>
                {this.renderLoadingView()}
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
