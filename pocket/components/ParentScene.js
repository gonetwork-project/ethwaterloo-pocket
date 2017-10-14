import React, { Component } from 'react';
import { View, Text, TouchableOpacity,TextInput,Button } from 'react-native';


import TwoInputs from './common/TwoInputs';
import Header from './common/Header';
import { RedButton } from './common';



class ParentScene extends Component {

    componentDidMount() {
    }
    render() {
        const { container, bottomSpace, tosBox } = styles;
        return (
            <View style={[{ flex: 1, paddingTop: 50, flexDirection: 'column',
            justifyContent: 'space-between', }]}>

            <View style={[{ flex: 0.5, paddingTop: 0, justifyContent: 'center',
    alignItems: 'center',}]}>
                <Text style={styles.welcome}>
                    Balance: 30
                 </Text>
            </View>

            <View style={[{ flex: 1, paddingTop: 30, justifyContent: 'center',
    alignItems: 'center',}]}>
                <RedButton
                    style={[{
                        width: 260,
                        height: 70,justifyContent: 'center',
                    }]}
                    onPress={this.props.createDebitCardAction.bind(this)}
                >
                    Create Debit Card
                     </RedButton>
            </View>
            <View style={[{ flex: 1.5, paddingTop: 50, justifyContent: 'center',
    alignItems: 'center',}]}>
                 <TextInput style={{height: 50,}} placeholder="Type here to translate!"
                 
                />
                <RedButton
                    style={[{
                        width: 100,
                        height: 50, alignItems: 'center',justifyContent: 'center',
                    }]}
                    onPress={this.props.setSpendAction.bind(this)}
                >
                    Set Spend
                     </RedButton>
            </View>
            <View style={[{ flex: 1.5, paddingTop: 50, justifyContent: 'center',
    alignItems: 'center',}]}>

<TextInput  style={{height: 50,  }} placeholder="Type here to translate!"/>
                <RedButton
                    style={[{
                        width: 100,
                        height: 50, alignItems: 'center',justifyContent: 'center',
                    }]}
                    onPress={this.props.fundAction.bind(this)}
                >
                    Fund
                     </RedButton>
            </View>
            <View style={[{ flex: 1, paddingTop: 50, justifyContent: 'center',
    alignItems: 'center',}]}>

<Button
raised
title='BUTTON WITH ICON' />
            </View>

            <View style={[{ flex: 2, paddingTop: 0,}]}>

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
