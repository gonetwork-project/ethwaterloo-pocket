import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';


import TwoInputs from './common/TwoInputs';
import Header from './common/Header';
import { RedButton } from './common';

const PARENT = '0xf363f4cc8774191a4d9995f6dc569e004dd69b54';

class ParentScene extends Component {

    componentDidMount() {
          var gg = this.props.onGetBalance;
        //this.props.merchantWatchPayment('0x98220a47723bdc89d322cd2003854318ef413f07');
         setTimeout(function(){
         gg(PARENT);
        }, 1000);
    }


    render() {
        const { container, bottomSpace, tosBox } = styles;
        return (
            <View style={[{
                flex: 1, paddingTop: 50, flexDirection: 'column',
                justifyContent: 'space-between',
            }]}>

                <View style={[{
                    flex: 0.5, paddingTop: 0, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Text style={[globalStyle.gloabalFontStyle_H2]}>
                        Balance: {this.props.parentBalance}
                    </Text>
                </View>

                <View style={[{
                    flex: 1, paddingTop: 30, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <RedButton
                        style={[{
                            width: 260,
                            height: 70, justifyContent: 'center',
                        }]}
                        onPress={this.props.createDebitCardAction.bind(this)}
                    >
                        Create Debit Card
                     </RedButton>
                </View>
                <View style={[{
                    flex: 1.5, paddingTop: 50, justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <TextInput style={{ height: 50, }} placeholder="Set spenditure limite"

                    />
                    <RedButton
                        style={[{
                            width: 100,
                            height: 50, alignItems: 'center', justifyContent: 'center',
                        }]}
                        onPress={this.props.setSpendAction.bind(this)}
                    >
                        Set Spend
                     </RedButton>
                </View>
                <View style={[{
                    flex: 1.5, paddingTop: 50, justifyContent: 'center',
                    alignItems: 'center',
                }]}>

                    <TextInput style={{ height: 50, }} placeholder="Fund an account" />
                    <RedButton
                        style={[{
                            width: 100,
                            height: 50, alignItems: 'center', justifyContent: 'center',
                        }]}
                        onPress={this.props.fundAction.bind(this)}
                    >
                        Fund
                     </RedButton>
                </View>
                <View style={[{
                    flex: 1, paddingTop: 50, justifyContent: 'center',
                    alignItems: 'center',
                }]}>


                </View>

                <View style={[{ flex: 2, paddingTop: 0, }]}>

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

export default ParentScene;
