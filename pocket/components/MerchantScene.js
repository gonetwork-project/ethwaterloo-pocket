import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView } from 'react-native';


import TwoInputs from './common/TwoInputs';
import Header from './common/Header';

import { RedButton } from './common';
const PARENT = '0xf363f4cc8774191a4d9995f6dc569e004dd69b54';
const SPENDER = '0x98220a47723bdc89d322cd2003854318ef413f07';
const MERCHANT = '0x67ce8b67473bc77da1fd478ac9f1ca2d86704bf4';
const DEBIT_CARD = '0x6ba581485f7f58a5d7413bd4d543e121b0655f4d';


class MerchantScene extends Component {

    componentDidMount() {
          var gg = this.props.onGetBalance;
        //this.props.merchantWatchPayment('0x98220a47723bdc89d322cd2003854318ef413f07');
         setTimeout(function(){
         gg(MERCHANT);
        }, 1000);
        this.props.onWatchPaymentMining(MERCHANT);
    }
    renderRow(data) {
        return (
            <View><Text style={[globalStyle.gloabalFontStyle_H2]}>{data}</Text></View>
        );
    }
    render() {
        const { container, bottomSpace, tosBox } = styles;
        return (
            <View style={[{ flex: 1, paddingTop: 10 }]}>
                <View style={[{ flex: 1.5, alignContent: 'flex-end', justifyContent: 'center' }]}>
                    <View style={[{ flex: .5, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H2]}>
                            Balance: {this.props.merchantBalance}
                             </Text>
                    </View>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <RedButton
                            style={[{
                                width: 200
                            }]}
                            onPress={this.props.addMerchantItem.bind(this)}
                        >
                            + Add Item
                         </RedButton>
                    </View>
                </View>

                <View style={[{ flex: 8, backgroundColor: '#FFF6C2' }]}>

                    <ListView
                        style={[{ flex: 1, paddingLeft: 5 }]}
                        dataSource={this.props.state.dataSource}
                        renderRow={(data) => this.renderRow(data) }
                    />
                </View>

                <View style={[{ flex: 1.5, alignContent: 'flex-end', justifyContent: 'center', paddingBottom: 50, paddingTop: 5 }]}>
                    <View style={[{ flex: .5, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H3]}>
                            Total: ${this.props.state.merchantTotal}
                             </Text>
                    </View>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <RedButton
                            style={[{
                                width: 200
                            }]}
                            onPress={this.props.merchantCheckout.bind(this)}
                        >
                            Checkout
                         </RedButton>
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

export default MerchantScene;
