import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


import TwoInputs from './common/TwoInputs';
import Header from './common/Header';



class LoginScene extends Component {

    componentDidMount() {
    }
    render() {
        const { container, bottomSpace, tosBox } = styles;
        return (
            <View style={[container]} >
                <Header
                    title='Start'
                    desc='You know the drill 👇🏻'
                    //descLine2='can find you 👫'
                    //onPressDown={this.nextPage.bind(this)}
                    progressStyle={[{ flex: 0 }]}
                    progressEmptyStyle={[{ flex: 0 }]}
                    showBackButton
                //  onPressBack={this.back.bind(this)}
                />
                <TwoInputs
                    secondSecureTextEntry
                    firstPaceholder="ETH Address"
                    secondPaceholder="Debit Card Number"
                    // onFirstChangeText={this.onEmailChange.bind(this)}
                    //  firstValue={this.props.fullName}
                    //onSecondChangeText={this.onPasswordChange.bind(this)}
                    //   secondValue={this.props.email}
                    //sencondKeyboardType="email-address"
                    onSubmitEditing={(event) => {
                        this.props.buttonAction();
                    }}
                />

                <TouchableOpacity style={tosBox}>
                    <Text style={[globalStyle.gloabalFontStyle_H5]}>
                        By logging in you agree to the
                            </Text>
                    <Text style={[globalStyle.gloabalFontStyle_H5]}>
                        Privacy Policy and Terms & Conditions.
                            </Text>
                </TouchableOpacity>
                <View style={[bottomSpace]} />
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

export default LoginScene;
