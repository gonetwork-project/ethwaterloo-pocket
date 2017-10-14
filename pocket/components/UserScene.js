import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView } from 'react-native';


import TwoInputs from './common/TwoInputs';
import Header from './common/Header';

import { RedButton } from './common';



class UserScene extends Component {

    componentDidMount() {
    }
    render() {
        const { container, bottomSpace, tosBox } = styles;
        return (
            <View style={[{ flex: 1, paddingTop: 20}]}>
                <View style={[{ flex: 1.2, justifyContent: 'center',  paddingBottom: 10 }]}>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H2]}>
                            Balance: 40
                             </Text>
                    </View>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H3]}>
                            Next Reward Time: 40
                     </Text>
                    </View>
                    <View style={[{ flex: 1, alignSelf: 'center', justifyContent: 'center' }]}>
                        <Text style={[globalStyle.gloabalFontStyle_H3]}>
                            Next Reward Total: 40
                     </Text>
                    </View>
                </View>
                <View style={[{ flex: 8, backgroundColor: 'grey' }]}>
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

export default UserScene;
