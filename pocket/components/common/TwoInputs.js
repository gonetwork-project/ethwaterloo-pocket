import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

//const TwoInputs = ({ onFirstChangeText, onSecondChangeText, firstValue, secondValue  }) => {
class TwoInputs extends Component {

    componentDidMount() {
        this.refs.FirstInput.focus();
    }
    render() {
        const { container,
            inputContainer, inputBox } = styles;
        return (
            <View style={[container]} >

                <View style={[inputContainer]} >
                    <TextInput
                        ref='FirstInput'
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholder={this.props.firstPaceholder}
                        onChangeText={this.props.onFirstChangeText}
                        value={this.props.firstValue}
                        returnKeyType={"next"}
                        onSubmitEditing={(event) => {
                            this.refs.SecondInput.focus();
                        }}
                        style={[globalStyle.gloabalFontStyle_H2, inputBox]}
                        underlineColorAndroid="transparent"

                    />
                </View>
                <View style={[inputContainer]} >
                    <TextInput
                        ref='SecondInput'
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={this.props.secondSecureTextEntry}
                        placeholder={this.props.secondPaceholder}
                        onChangeText={this.props.onSecondChangeText}
                        value={this.props.secondValue}
                        style={[globalStyle.gloabalFontStyle_H2, inputBox]}
                        onSubmitEditing={this.props.onSubmitEditing}
                        keyboardType={this.props.sencondKeyboardType}
                        underlineColorAndroid="transparent"

                    />
                </View>
            </View>
        );
    }
}

const globalStyle = require('./GlobalStyleSheet');

const styles = {
    container: {
        flex: 3,
        flexDirection: 'column',
        marginTop: 15,
    },
    inputContainer:
    {
        flex: 1,
        borderBottomWidth: 2,
        borderColor: '#BD071C',
    },
    inputBox: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        lineHeight: 23,
        flex: 1,
    }
};

export default TwoInputs;
