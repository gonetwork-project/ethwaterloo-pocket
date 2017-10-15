import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SegmentedControlIOS, ListView } from 'react-native';


import TwoInputs from './common/TwoInputs';
import Header from './common/Header';
import LoginScene from './LoginScene';
import MerchantScene from './MerchantScene';
import UserScene from './UserScene';
import ParentScene from './ParentScene';

export const UI_PAGE_LOGIN_PAGE = 'UI_PAGE_LOGIN_PAGE';
export const UI_PAGE_POCKET_PAGE = 'UI_PAGE_POCKET_PAGE';


const PARENT = '0xf363f4cc8774191a4d9995f6dc569e004dd69b54';
const SPENDER = '0x98220a47723bdc89d322cd2003854318ef413f07';
const MERCHANT = '0x67ce8b67473bc77da1fd478ac9f1ca2d86704bf4';
const LAST_USER = '0xcae102b6a747c27d0d30464777436fcafeb7cd4f';
const DEBIT_CARD = '0x6ba581485f7f58a5d7413bd4d543e121b0655f4d';


import { RedButton } from './common';

var list = [
    { item: 'Banana', price: 1 },
    { item: 'Apple', price: 2 },
    { item: 'Orange', price: 3 },
    { item: 'Sandwich', price: 4 },
    { item: 'Burger', price: 4 },
    { item: 'Coke', price: 1 },
    { item: 'Soda', price: 1 },
    { item: 'Cup Noodle', price: 3 },
    { item: 'Coffee', price: 1 },
    { item: 'Donut', price: 3 }
];


class MainScene extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            pageId: UI_PAGE_LOGIN_PAGE,
            selectedUserTypeIndex: 0,
            dataSource: ds.cloneWithRows(['']),

            //User Data
            // userBalance: 0,
            nextRewardTime: 0,
            nextRewardTotal: 0,
            userAddress: 'lol3333',

            //Merchant data
            // merchantBalance: 0,
            merchantTotal: 0,
            merchantItemsPrice: [''],
            merchantItems: [''],

            //Parent Data
            // parentBalance: 0,
        };

    }

    componentDidMount() {
        // var gg = this.props.onGetBalance;
        // //alert(this.props.onGetBalance);
        // setTimeout(function () {
        //     gg(DEBIT_CARD);
        // }, 1000);


    }

    logInUser() {
        this.props.unlockAccount('dadasdasdasdsdsssad');
        this.setState({ pageId: UI_PAGE_POCKET_PAGE });
    }
    renderLogInUI() {
        return (
            <View style={[{ flex: 1 }]}>
                <LoginScene
                    buttonAction={this.logInUser.bind(this)}
                    number={10}
                    text="Test"
                />
            </View>
        );
    }

    buttonPressTest() {

    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    addMerchantItem() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var index = this.getRandomInt(0, list.length - 1);
        this.state.merchantItems.push(list[index].item + ' $' + list[index].price);
        this.state.merchantItemsPrice.push(list[index].price);
        this.state.merchantTotal += list[index].price;
        this.setState({ dataSource: ds.cloneWithRows(this.state.merchantItems) });
    }
    merchantCheckout() {
        this.props.merchantCheckout(this.state.userAddress, this.state.merchantTotal);//Todo: replace 50 with checkout sum
    }
    renderPage() {
        // var gg = this.props.onGetBalance;
        if (this.state.selectedUserTypeIndex === 0) {


            return (
                <UserScene
                    //dataSource={this.state.dataSource}
                    state={this.state}
                    userBalance={this.props.userBalance}
                    addMerchantItem={this.addMerchantItem.bind(this)}
                    merchantCheckout={this.merchantCheckout.bind(this)}
                    onGetBalance={this.props.onGetBalance.bind(this)}

                    paymentStartFPScanner={this.props.paymentStartFPScanner}
                    paymentAddress={this.props.paymentAddress}
                    paymentAmount={this.props.paymentAmount}
                    
                    onSpend={this.props.onSpend.bind(this)}
                    
                />
            );
        } else if (this.state.selectedUserTypeIndex === 1) {

            return (
                <MerchantScene
                    state={this.state}
                    merchantBalance={this.props.merchantBalance}
                    addMerchantItem={this.addMerchantItem.bind(this)}
                    merchantCheckout={this.merchantCheckout.bind(this)}
                    onGetBalance={this.props.onGetBalance.bind(this)}
                    onWatchPaymentMining={this.props.onWatchPaymentMining.bind(this)}

                />
            );
        } else if (this.state.selectedUserTypeIndex === 2) {

            return (
                <ParentScene
                    state={this.state}
                    parentBalance={this.props.parentBalance}
                    createDebitCardAction={this.buttonPressTest.bind(this)}
                    setSpendAction={this.buttonPressTest.bind(this)}
                    fundAction={this.buttonPressTest.bind(this)}
                    onGetBalance={this.props.onGetBalance.bind(this)}
                />
            );
        }

    }
    renderPocketPage() {
        return (
            <View style={[{ flex: 1, paddingTop: 50, }]}>
                <View style={[{ paddingHorizontal: 10 }]}>
                    <SegmentedControlIOS
                        style={[{ paddingHorizontal: 10 }]}
                        values={['User', 'Merchant', 'Parent']}
                        selectedIndex={this.state.selectedUserTypeIndex}
                        onChange={(event) => {
                            this.setState({ selectedUserTypeIndex: event.nativeEvent.selectedSegmentIndex });
                        }}
                        tintColor="#555555"
                    />
                </View >

                {this.renderPage()}
            </View>
        );
    }
    render() {
        const { container, bottomSpace, tosBox } = styles;
        //if (this.state.pageId === UI_PAGE_LOGIN_PAGE) {
        //     return this.renderLogInUI();
        // } else if (this.state.pageId === UI_PAGE_POCKET_PAGE) {
        return this.renderPocketPage();

        //  }

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

export default MainScene;
