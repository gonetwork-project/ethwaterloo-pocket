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

import { RedButton } from './common';


class MainScene extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            pageId: UI_PAGE_LOGIN_PAGE,
            selectedUserTypeIndex: 0,
            dataSource: ds.cloneWithRows(['']),

            //User Data
            userBalance: 0,
            nextRewardTime: 0,
            nextRewardTotal: 0,
            userAddress: 'lol3333',

            //Merchant data
            merchantBalance: 0,
            merchantTotal: 0,
            merchantItems: [''],

            //Parent Data
            parentBalance: 0,
        };
    }

    componentDidMount() {
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

    addMerchantItem() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        //this.setState({ merchantItems: ['row 1', 'row 2', 'row 3'] });
        this.state.merchantItems.push('ssd');
        this.setState({ dataSource: ds.cloneWithRows(this.state.merchantItems) });
    }
    merchantCheckout() {
        this.props.merchantCheckout(this.state.userAddress, 50);//Todo: replace 50 with checkout sum
    }
    renderPage() {
        if (this.state.selectedUserTypeIndex === 0) {
            return (
                <UserScene
                    //dataSource={this.state.dataSource}
                    state={this.state}
                    addMerchantItem={this.addMerchantItem.bind(this)}
                    merchantCheckout={this.merchantCheckout.bind(this)}

                />
            );
        } else if (this.state.selectedUserTypeIndex === 1) {
            return (
                <MerchantScene
                    state={this.state}
                    addMerchantItem={this.addMerchantItem.bind(this)}
                    merchantCheckout={this.merchantCheckout.bind(this)}

                />
            );
        } else if (this.state.selectedUserTypeIndex === 2) {
            return (
                <ParentScene
                    state={this.state}
                    createDebitCardAction={this.buttonPressTest.bind(this)}
                    setSpendAction={this.buttonPressTest.bind(this)}
                    fundAction={this.buttonPressTest.bind(this)}

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
